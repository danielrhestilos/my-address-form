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
      isLoaded: false,
      formData: {},
      readyData: false,
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
      { name: "street", label: "Calle/Avenida/Jirón", type: "text" },
      { name: "number", label: "Número", type: "text" },
      { name: "complement", label: "Departamento,piso", type: "text" },
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



    return (
      <>
        <Modal isOpen={true} onClose={this.closeModal} title={"Añade una nueva dirección"}>
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
                    {/* {JSON.stringify(this.state)} */}
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
                              "value": "Daniel rh"
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
        </Modal>
        {/* <Input
        {...inputProps}
        key={rules.country}
        field={{
          label: 'addressQuery',
          name: 'addressQuery',
        }}
        options={null}
        address={newAddress}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={!loadingGoogle ? this.handleChangeInput : () => {}}
        inputRef={!loadingGoogle ? this.handleMountInput : undefined}
      /> */}
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
