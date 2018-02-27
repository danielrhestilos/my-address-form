import { POSTAL_CODE } from '../constants'

export default {
  country: 'MEX',
  abbr: 'MX',
  postalCodeFrom: POSTAL_CODE,
  postalCodeProtectedFields: ['state', 'city'],
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      name: 'postalCode',
      maxLength: 50,
      label: 'postalCode',
      required: true,
      mask: '99999',
      regex: '^\\d{5}$',
      postalCodeAPI: true,
      forgottenURL:
        'http://www.sepomex.gob.mx/servicioslinea/paginas/ccpostales.aspx',
      size: 'small',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'exteriorNumber',
      required: true,
      size: 'mini',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'interiorNumber',
      size: 'large',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'colony',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'municipalityDelegation',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'state',
      required: true,
      size: 'xlarge',
      options: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de México',
        'Coahuila De Zaragoza',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'México',
        'Michoacán de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      name: 'receiverName',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: true,
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: true,
    },
    number: { valueIn: 'long_name', types: ['street_number'], required: false },
    street: { valueIn: 'long_name', types: ['route'], required: false },
    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
      required: false,
    },
    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
      required: false,
    },
    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
      required: false,
    },
  },
}
