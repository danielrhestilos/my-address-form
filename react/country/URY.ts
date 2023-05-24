import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'
import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const countryData = {
  Artigas: [
    'Artigas',
    'Baltasar Brum',
    'Bella Unión',
    'Bernabe Rivera',
    'Calpica Itacumbú',
    'Colonia Palma',
    'Cuaró',
    'Javier De Viana',
    'Paso Campamento',
    'Sequeira',
    'Tomas Gomensoro',
  ],
  Canelones: [
    'Aeropuerto',
    'Aguas Corrientes',
    'Araminda',
    'Argentino',
    'Atlántida',
    'Barra De Carrasco',
    'Barros Blancos',
    'Bello Horizonte',
    'Biarritz',
    'Bolívar',
    'Campo Militar',
    'Canelón Grande Represa',
    'Canelones',
    'Castellanos',
    'Chamizo',
    'Colonia Nicolich',
    'Colonia Treinta Y Tres Orientales',
    'Costa Azul',
    'Cuchilla Alta',
    'El Bosque',
    'El Dorado',
    'El Fortín De Santa Rosa',
    'El Pinar',
    'Empalme Olmos',
    'Estación Migues',
    'Estación Pedrera',
    'Estación Tapia',
    'Fray Marcos',
    'Guazuvirá',
    'Guazuvirá Nuevo',
    'Jaureguiberry',
    'Joanicó',
    'Joaquín Suárez',
    'La Escobilla',
    'La Floresta',
    'La Paz',
    'La Tuna',
    'Lagomar',
    'Las Piedras',
    'Las Toscas',
    'Las Vegas',
    'Lomas De Solymar',
    'Los Cerrillos',
    'Los Titanes',
    'Marindia',
    'Médanos De Solymar',
    'Migues',
    'Montes',
    'Neptunia',
    'Pando',
    'Paraje San Juan',
    'Parque Carrasco',
    'Parque Del Plata',
    'Paso De Carrasco',
    'Paso De Pache',
    'Paso Del Bote',
    'Piedras De Afilar',
    'Pinamar',
    'Pine Park',
    'Progreso',
    'Salinas',
    'San Antonio',
    'San Bautista',
    'San Jacinto',
    'San José De Carrasco',
    'San Luis',
    'San Ramón',
    'Santa Ana',
    'Santa Lucía',
    'Santa Lucía Del Este',
    'Santa Rosa',
    'Sauce',
    'Shangrila',
    'Soca',
    'Solymar',
    'Tala',
    'Toledo',
    'Villa Argentina',
    'Villa Del Mar',
  ],
  'Cerro Largo': [
    'Aceguá',
    'Bañado De Medina',
    'Cerro De Las Cuentas',
    'Fraile Muerto',
    'Isidoro Noblía',
    'Melo',
    'Plácido Rosas',
    'Río Branco',
    'Tupambaé',
  ],
  Colonia: [
    'Agraciada',
    'Artilleros',
    'Barker',
    'Campana',
    'Carmelo',
    'Colonia',
    'Colonia Valdense',
    'Conchillas',
    'Cufré',
    'Florencio Sánchez',
    'Juan Lacaze',
    'La Estanzuela',
    'La Paz',
    'Los Pinos',
    'Miguelete',
    'Minuano',
    'Nueva Helvecia',
    'Nueva Palmira',
    'Ombúes De Lavalle',
    'Playa Fomento',
    'Riachuelo',
    'Rosario',
    'Santa Ana',
    'Tarariras',
  ],
  Durazno: [
    'Blanquillo',
    'Carlos Reyles',
    'Centenario',
    'Durazno',
    'Feliciano',
    'La Paloma',
    'Santa Bernardina',
    'Sarandí Del Yí',
  ],
  Flores: ['Andresito', 'Ismael Cortinas', 'Trinidad'],
  Florida: [
    '25 De Agosto',
    '25 De Mayo',
    'Capilla Del Sauce',
    'Cardal',
    'Casupá',
    'Cerro Colorado',
    'Chamizo',
    'Florida',
    'Fray Marcos',
    'Goñi',
    'Independencia',
    'La Cruz',
    'Mendoza Chico',
    'Mendoza Grande',
    'Monte Coral',
    'Pintado',
    'Polanco Del Yí',
    'Puntas De Maciel',
    'Reboledo',
    'Sarandí Grande',
  ],
  Lavalleja: [
    'Colón',
    'Estación Solís',
    'Illescas',
    'José Batlle Y Ordóñez',
    'José Pedro Varela',
    'Mariscala',
    'Minas',
    'Nico Pérez',
    'Pirarajá',
    'Polanco Norte',
    'Solís De Mataojo',
    'Valentines',
    'Zapicán',
  ],
  Maldonado: [
    'Aiguá',
    'Garzón',
    'José Ignacio',
    'La Barra',
    'Las Flores',
    'Maldonado',
    'Manantiales',
    'Pan De Azúcar',
    'Pinares - Las Delicias',
    'Piriápolis',
    'Playa Verde',
    'Punta Ballena',
    'Punta Del Este',
    'San Carlos',
    'San Rafael - El Placer',
    'Sauce De Portezuelo',
    'Solís',
  ],
  Montevideo: ['Montevideo'],
  Paysandú: [
    'Algorta',
    'Beisso',
    'Cerro Chato',
    'Chapicuy',
    'Eucaliptus',
    'Gallinal',
    'Guichón',
    'Lorenzo Geyres',
    'Merinos',
    'P. Pandule',
    'Paysandú',
    'Piedras Coloradas',
    'Piñera',
    'Porvenir',
    'Quebracho',
    'San Javier',
  ],
  'Rio Negro': [
    'Algorta',
    'Bellaco',
    'Fray Bentos',
    'Menafra',
    'Nuevo Berlín',
    'Paso De Los Mellizos',
    'San Javier',
    'Sarandí De Navarro',
    'Young',
  ],
  Rivera: [
    'Lapuente',
    'Masoller',
    'Minas De Corrales',
    'Rivera',
    'Tranqueras',
    'Vichadero',
  ],
  Rocha: [
    '18 De Julio',
    '19 De Abril',
    'Aguas Dulces',
    'Arachania',
    'Barra Del Chuy',
    'Castillos',
    'Cebollatí',
    'Chuy',
    'La Aguada - Costa Azul',
    'La Coronilla',
    'La Paloma',
    'La Pedrera',
    'Lascano',
    'Punta Del Diablo',
    'Rocha',
    'San Luis Al Medio',
    'Velázquez',
  ],
  Salto: [
    'Belén',
    'Biassini',
    'Cerro De Vera',
    'Colonia Itapebí',
    'Constitución',
    'Palomas',
    'Puntas De Alentín',
    'Salto',
    'San Antonio',
    'Sarandí Del Arapey',
    'Saucedo',
    'Termas Del Arapey',
  ],
  'San Jose': [
    'Capurro',
    'Delta Del Tigre',
    'Ecilda Paullier',
    'Ituzaingó',
    'Juan Soler',
    'Kiyú - Ordeig',
    'Libertad',
    'Mal Abrigo',
    'Playa Pascual',
    'Puntas De Valdez',
    'Rafael Perazza',
    'Rincón De La Bolsa',
    'San José De Mayo',
    'Villa María',
    'Villa Rodriguez',
  ],
  Soriano: [
    'Cañada Nieto',
    'Cardona',
    'Cuchilla Del Perdido',
    'Dolores',
    'Egaña',
    'José Enrique Rodó',
    'Mercedes',
    'Palmar',
    'Palmitas',
    'Palo Solo',
    'Risso',
    'Santa Catalina',
    'Villa Darwin',
    'Villa De Soriano',
  ],
  Tacuarembó: [
    'Achar',
    'Ansina',
    'Cardoso',
    'Chamberlain',
    'Cuchilla De Peralta',
    'Curtina',
    'La Pedrera',
    'Las Toscas',
    'Laureles',
    'Paso Bonilla',
    'Paso De Los Toros',
    'Paso Del Cerro',
    'Piedra Sola',
    'San Gregorio De Polanco',
    'Tacuarembó',
    'Tambores',
    'Valle Edén',
  ],
  'Treinta Y Tres': [
    'Cerro Chato',
    'Isla Patrulla',
    'María Albina',
    'Santa Clara De Olimar',
    'Treinta Y Tres',
    'Valentines',
    'Vergara',
  ],
}

const rules: PostalCodeRules = {
  country: 'URY',
  abbr: 'UY',
  postalCodeFrom: POSTAL_CODE,
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
      regex: '^([\\d]{5})$',
      postalCodeAPI: false,
      forgottenURL:
        'http://geo.correo.com.uy/IsisBusquedaDireccionPlugin/cp.jsp',
      size: 'small',
      autoComplete: 'nope',
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
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
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
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'locality',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'receiverName',
      elementName: 'receiver',
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

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    neighborhood: {
      valueIn: 'long_name',
      types: [
        'neighborhood',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
      ],
    },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['locality', 'administrative_area_level_2'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ' ', name: 'complement' },
    ],
    [{ name: 'neighborhood' }],
    [
      { name: 'postalCode' },
      { delimiter: ' - ', name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}

export default rules
