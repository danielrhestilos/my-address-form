import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import DefaultInput from '../inputs/DefaultInput'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'
import { injectRules } from '../addressRulesContext'
import { injectAddressContext } from '../addressContainerContext'
import { injectIntl } from '../intl/utils'
import Modal from './../Modal'

import DeliveryForm from './DeliveryForm'
import GeoSelector from './GeoSelector'
// @ts-ignore
import styles from './GeolocationInput.module.css'
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from '@react-google-maps/api'
class GeolocationInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      deliveryChannel: this.getLocalStorageValue('activeDeliveryChannel', 'delivery'),
      addNew: false,
      isLoaded: false,
      formData: {},
      readyData: false,
      isModalOpen: false,
      selectedLocation: {
        departamento: '',
        provincia: '',
        distrito: '',
        codigoPostal: '',
      },
      // address: this.props.address,
      coordinates: null, // Para almacenar la geolocalización
      address: this.props.address,
    }

    this.handleMountInput = this.handleMountInput.bind(this)
  }


  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address,
    })
  }

  handleMountInput = (input) => {
    const { useSearchBox, rules, googleMaps } = this.props

    if (this.autocompleteListener) {
      this.autocompleteListener.remove()
      this.autocompleteListener = null
    }

    if (!input) {
      this.input = null
      this.autocomplete = null

      return
    }

    this.input = input

    const options = rules.abbr
      ? {
        types: ['address'],
        componentRestrictions: {
          country: rules.abbr,
        },
      }
      : { types: ['address'] }

    if (useSearchBox) {
      this.autocomplete = new googleMaps.places.SearchBox(this.input)
      this.geocoder = new googleMaps.Geocoder()
    } else {
      this.autocomplete = new googleMaps.places.Autocomplete(
        this.input,
        options
      )
    }

    this.autocompleteListener = useSearchBox
      ? this.addSearchBoxListener()
      : this.addAutocompleteListener()
  }

  addAutocompleteListener = () => {
    const { autocomplete } = this
    return this.props.googleMaps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => {
        const googleAddress = autocomplete.getPlace()

        if (googleAddress.geometry) {
          this.handleAddress(googleAddress)
        }
      }
    )
  }

  addSearchBoxListener = () => {
    return this.props.googleMaps.event.addListener(
      this.autocomplete,
      'places_changed',
      () => {
        const googleAddresses = this.autocomplete.getPlaces()
        let firstPlaceFound = googleAddresses && googleAddresses[0]

        if (!firstPlaceFound) return

        if (!firstPlaceFound.address_components) {
          this.geocoder.geocode(
            { address: firstPlaceFound.formatted_address },
            (address) => (firstPlaceFound = address)
          )
        }

        if (firstPlaceFound.geometry) {
          this.handleAddress(firstPlaceFound)
        }
      }
    )
  }

  handleAddress = (googleAddress) => {
    this.handleChangeInput(googleAddress.formatted_address)
    this.handlePlaceChanged(googleAddress)
  }

  handlePlaceChanged = (googleAddress) => {
    const address = geolocationAutoCompleteAddress(
      this.state.address,
      googleAddress,
      this.props.rules
    )

    this.props.onChangeAddress(address)
  }

  handleChangeInput = (value) => {
    this.setState((prevState) => ({
      address: {
        ...prevState.address,
        addressQuery: {
          ...prevState.addressQuery,
          value,
        },
      },
    }))
  }



  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleFormChange = (updatedData) => {
    this.setState({ formData: updatedData });
  };


  handleGeoChange = (location) => {
    this.setState({ selectedLocation: location });
  };
  geocodeAddress = async (calle, numero, distrito, provincia, departamento) => {
    // Construye la dirección con más detalles
    const fullAddress = `${calle} ${numero}, ${distrito}, ${provincia}, ${departamento}`;
    console.log("Buscando dirección:", fullAddress);
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        console.log('results: ', results);
        if (status === "OK" && results.length > 0) {
          resolve(results[0]?.geometry?.location);
        } else {
          console.warn("No se encontró la dirección completa. Probando con la ciudad...");
          // Si la dirección completa falla, intenta con solo el distrito y provincia
          const cityAddress = `${distrito}, ${provincia}, ${departamento}, Perú`;
          geocoder.geocode({ address: cityAddress }, (cityResults, cityStatus) => {
            console.log("cityResults: ", cityResults);
            if (cityStatus === "OK" && cityResults.length > 0) {
              resolve(cityResults[0].geometry.location);
            } else {
              console.error("No se pudo geolocalizar ni la dirección ni la ciudad.");
              resolve(null);
            }
          });
        }
      });
    });
  }
  handleFormSubmit = (formData) => {
    console.log("Datos del formulario:", formData)


    if (this.state?.formData?.street !== undefined
      &&
      this.state?.formData?.street !== ''
      &&
      this.state?.formData?.number !== ''
      &&
      this.state?.formData?.number !== undefined
      &&
      this.state.formData?.complement !== ''
      &&
      this.state.formData?.complement !== undefined
      &&
      this.state.formData?.reference !== ''
      &&
      this.state.formData?.reference !== undefined
      &&
      this.state.formData?.receiver !== ''
      &&
      this.state.formData?.receiver !== undefined
    ) {
      this.setState({
        readyData: true
      })
    }

    // Geocodificar dirección
    // this.getGeocode("pasaje san jose 105 cerro colorado arequipa");

  };
  componentDidMount() {
    console.log("this.state.deliveryChannel: ", this.state.deliveryChannel);

    window.addEventListener('storage', this.handleStorageChange)
    this.localStorageCheckInterval = setInterval(() => {
      const currentValue = this.getLocalStorageValue('activeDeliveryChannel', 'delivery')
      if (currentValue !== this.state.deliveryChannel) {
        console.log('----');

        this.setState({ deliveryChannel: currentValue })
      }
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
    if (this.localStorageCheckInterval !== undefined) {
      clearInterval(this.localStorageCheckInterval)
    }
  }

  getLocalStorageValue = (key, defaultValue) => {
    try {
      return JSON.parse(window?.localStorage?.getItem(key) || '""') || defaultValue
    } catch (error) {
      return defaultValue
    }
  }

  handleStorageChange = (event) => {
    console.log('----------');

    if (event.key === 'activeDeliveryChannel') {
      this.setState({ deliveryChannel: event.newValue })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { formData } = this.state;
    const { street, number, complement, reference, receiver } = formData || {};

    if (
      street && number && complement && reference && receiver
    ) {
      // Verificar si los valores han cambiado
      if (
        prevState.formData?.street !== street ||
        prevState.formData?.number !== number ||
        prevState.formData?.complement !== complement ||
        prevState.formData?.reference !== reference ||
        prevState.formData?.receiver !== receiver
      ) {
        this.updateGeolocation();
      }
    }
  }

  async updateGeolocation() {
    const { formData } = this.state;
    const { street, number } = formData;
    const selectedDistrito = this.state.selectedLocation?.distrito;
    const selectedProvincia = this.state.selectedLocation?.provincia;
    const selectedDepartamento = this.state.selectedLocation?.departamento;

    try {
      const geocode = await this.geocodeAddress(street, number, selectedDistrito, selectedProvincia, selectedDepartamento);
      console.log('geocode', geocode);

      // this.setGoogleMapsAddress(`${street} ${number}, ${selectedDistrito}, ${selectedProvincia}, ${selectedDepartamento}`);
      this.setState({
        coordinates: {
          lat: geocode.lat(),
          lng: geocode.lng(),
        }
      });
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
    }
  }

  render() {
    const { coordinates } = this.state;
    const {
      Input,
      rules,
      loadingGoogle,
      inputProps,
      placeholder,
      autoFocus,
    } = this.props

    const { address, isValidGoogleAddress } = this.state

    const fields = [
      { name: "street", label: "Calle/Av./Jirón/Urb.", type: "text" },
      { name: "number", label: "Número", type: "text" },
      { name: "complement", label: "Departamento/piso/Mz,Lote", type: "text" },
      { name: "reference", label: "Referencia", type: "text" },
      { name: "receiver", label: "Autorizado a recibir el pedido", type: "text" },
    ];


    const newAddress = {
      ...address,
      addressQuery: {
        ...(address.addressQuery ? address.addressQuery : { value: '' }),
        ...(isValidGoogleAddress === false
          ? { valid: false, reason: EGOOGLEADDRESS }
          : {}),
        loading: loadingGoogle,
      },
    }
    console.log('address: ', address.addressType);

    if (address.addressType?.value !== 'residential') {
      return null
    }
    const formatAddress = (address) => {
      if (!address) return "Agrega tu dirección";
    
      const { street, number, complement, neighborhood, city, state, postalCode, country } = address;
    
      return `${street} ${number || ""}${complement ? ", " + complement : ""}, ${neighborhood ? neighborhood + ", " : ""}${city}, ${state}, ${postalCode}, ${country}`;
    };
    return (
      <>
        <div className={styles.container}>
          {/* {JSON.stringify(this.state)} */}
          <div className={styles.text}>
            <span>
              <img style={{ height: "1rem", marginRight: ".5rem" }} src="https://estilospe.vtexassets.com/arquivos/Set-Location-ICON-V0325-grey-30.svg" />
            </span>
            {/* {vtexjs.checkout.orderForm.shippingData.address && vtexjs.checkout.orderForm.shippingData.address?.number?.value && vtexjs.checkout.orderForm.shippingData.address.city
              ?  */}
              {formatAddress(vtexjs.checkout.orderForm.shippingData.address)}
              {/* `${vtexjs.checkout.orderForm.shippingData.address.street}, ${vtexjs.checkout.orderForm.shippingData.address.number}, ${vtexjs.checkout.orderForm.shippingData.address.city}` */}
              {/* : "Nueva dirección"} */}

            {/* {address?.street?.value && address?.number?.value && address?.city?.value
              ? `${address.street.value}, ${address.number.value}, ${address.city.value}`
              : "Nueva dirección"} */}
          </div>
          <div>
            <span className={styles.changeButton} onClick={this.openModal}>
              Cambiar
            </span>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Añade una nueva dirección"}>
          {
            this.state.addNew ?
              <>
                {
                  this.state.readyData
                    ?
                    <div style={{ width: '320px', height: "260px" }}>
                      {coordinates ? (
                        <>
                          <GoogleMap
                            center={coordinates}
                            zoom={15}
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                          >
                            <MarkerF position={coordinates}
                              draggable={true} // Permite arrastrar el marcador
                              onDragEnd={(event) => {
                                const newCoordinates = {
                                  lat: event?.latLng?.lat(),
                                  lng: event?.latLng?.lng(),
                                };
                                this.setState({ coordinates: newCoordinates });
                              }} />
                          </GoogleMap>
                          <button
                            onClick={() => {
                              this.props.onChangeAddress(
                                {
                                  "addressId": {
                                    "value": Date.now()
                                  },
                                  "country": {
                                    "value": "PER"
                                  },
                                  "addressType": {
                                    "value": "residential"
                                  },
                                  "city": {
                                    "value": this.state.selectedLocation.distrito
                                  },
                                  "complement": {
                                    "value": this.state.formData.complement
                                  },
                                  "geoCoordinates": {
                                    "value": [this?.state?.coordinates?.lng, this?.state?.coordinates?.lat]
                                  },
                                  "neighborhood": {
                                    "value": this.state.selectedLocation.provincia
                                  },
                                  "number": {
                                    "value": this.state.formData.number
                                  },
                                  "postalCode": {
                                    "value": this.state.selectedLocation.codigoPostal
                                  },
                                  "receiverName": {
                                    "value": this.state.formData.receiver
                                  },
                                  "reference": {
                                    "value": this.state.formData.reference
                                  },
                                  "state": {
                                    "value": this.state.selectedLocation.departamento
                                  },
                                  "street": {
                                    "value": this.state.formData.street
                                  },
                                  "addressQuery": {
                                    "value": ""
                                  },
                                  "isDisposable": {}
                                }
                              )
                            }
                            }
                            style={{
                              width: "100%",
                              padding: "10px",
                              backgroundColor: "#e91111",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontFamily: "Outfit",
                              marginTop: ".5rem"
                            }}
                          >Confirmar ubicación</button>
                        </>

                      ) : (
                        <p>Cargando mapa...</p>
                      )}
                    </div>
                    :
                    <>
                      <GeoSelector onChange={this.handleGeoChange} />
                      <DeliveryForm fields={fields} onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} />
                    </>
                }
              </> : 
              <div>
                <div className={styles.titleAndButton}>
                  <h5>Tusdirecciones pro</h5>&nbsp;<button onClick={()=>{
                    this.setState({
                      addNew:true
                    })
                  }}>Agregar nueva dirección</button>
                </div>
                <div className={styles.addressContainer}>
                  {vtexjs.checkout.orderForm.shippingData.availableAddresses
                    // .slice(-3)
                    .map((item) => (
                      <div key={item.addressId} className={styles.addressCard}>
                        <p>
                          <strong>Dirección: </strong> {item?.street}, {item?.number}, {item?.complement},{item?.city}, {item?.neighborhood}, {item?.state} / tiene geoCoordinates: {JSON.stringify(item?.geoCoordinates)}
                        </p>
                        <button
                          className={styles.selectButton}
                          onClick={() =>
                            this.props.onChangeAddress({
                              addressId: { value: item.addressId },
                              country: { value: "PER" },
                              addressType: { value: "residential" },
                              city: { value: item.city },
                              complement: { value: item.complement },
                              geoCoordinates: {
                                value: [item?.geoCoordinates[0], item?.geoCoordinates[1]],
                              },
                              neighborhood: { value: item?.neighborhood },
                              number: { value: item?.number },
                              postalCode: { value: item?.postalCode },
                              receiverName: { value: item?.receiverName },
                              reference: { value: item?.reference },
                              state: { value: item?.state },
                              street: { value: item?.street },
                              addressQuery: { value: "" },
                              isDisposable: {},
                            })
                          }
                        >
                          Seleccionar
                        </button>
                      </div>
                    ))}
                </div>
                <div className={styles.titleAndButton}>
               
                </div>
              </div>
          }
        </Modal>





      </>

    )
  }
}

GeolocationInput.defaultProps = {
  Input: DefaultInput,
  inputProps: {},
  autofocus: false,
  useSearchBox: false,
}

GeolocationInput.propTypes = {
  Input: PropTypes.func,
  inputProps: PropTypes.object,
  placeholder: PropTypes.string,
  useSearchBox: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  autoFocus: PropTypes.bool,
  googleMaps: PropTypes.object,
}

const enhance = compose(injectAddressContext, injectRules, injectIntl)

export default enhance(GeolocationInput)
