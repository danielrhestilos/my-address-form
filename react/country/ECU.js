import { ONE_LEVEL } from '../constants'
import { firstLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'

const countryData = {
  Azuay: {
    Baños: '0000',
    'Camilo Ponce Enriquez': '0000',
    Chordeleg: '0000',
    Cuenca: '0000',
    Cumbe: '0000',
    'El Pan': '0000',
    Giron: '0000',
    Guachapala: '0000',
    Gualaceo: '0000',
    'La union': '0000',
    Nabon: '0000',
    Oña: '0000',
    Paute: '0000',
    'Ponce Enriquez': '0000',
    Pucara: '0000',
    Ricaurte: '0000',
    'San Fernando': '0000',
    'Santa Isabel': '0000',
    'Sevilla De Oro': '0000',
    Sigsig: '0000',
    Tarqui: '0000',
  },
  Bolivar: {
    '1° de Mayo': '0001',
    '4 esquinas': '0001',
    Asunción: '0001',
    Balzapamba: '0001',
    Caluma: '0001',
    Chillanes: '0001',
    Chimbo: '0001',
    Echeandia: '0001',
    Guaranda: '0001',
    'Las Naves': '0001',
    'La Magdalena': '0001',
    'Pisagua Alto': '0001',
    'Pisagua Bajo': '0001',
    'Recinto 24 de Mayo': '0001',
    'Recinto El Palmar': '0001',
    'Recinto La Maritza': '0001',
    Salinas: '0001',
    'San Jose de Chimbo': '0001',
    'San Lorenzo': '0001',
    'San Miguel de Bolivar': '0001',
    'San Pablo de Atenas': '0001',
    'San Pedro de Guanujo': '0001',
    'San Simon': '0001',
    'Santa Fe': '0001',
    Vinchoa: '0001',
  },
  Canar: {
    Azogues: '0002',
    Biblian: '0002',
    Cañar: '0002',
    Cochancay: '0002',
    Deleg: '0002',
    Ducur: '0002',
    'El Tambo': '0002',
    Guapan: '0002',
    Ingapirca: '0002',
    'Javier Loyola': '0002',
    'La Troncal': '0002',
    'La Puntilla - El Triunfo': '0002',
    Suscal: '0002',
    'Voluntad De Dios': '0002',
  },
  Carchi: {
    Bolivar: '0003',
    'Chitan De Navarretes': '0003',
    'Cristobal Colon': '0003',
    Cuesaca: '0003',
    'El Angel': '0003',
    Espejo: '0003',
    'Garcia Moreno': '0003',
    Huaca: '0003',
    'Julio Andrade': '0003',
    'La Paz': '0003',
    Mira: '0003',
    Montufar: '0003',
    'San Pedro De Huaca': '0003',
    'San Gabriel': '0003',
    'San Isidro': '0003',
    Tulcan: '0003',
  },
  Chimborazo: {
    Alausi: '0004',
    Cajabamba: '0004',
    Chambo: '0004',
    Chunchi: '0004',
    Colta: '0004',
    Cumanda: '0004',
    'El Guano': '0004',
    Guamote: '0004',
    Lican: '0004',
    Pallatanga: '0004',
    Penipe: '0004',
    Riobamba: '0004',
    'San Andres': '0004',
    'San Luis': '0004',
    Yaruquies: '0004',
  },
  Cotopaxi: {
    Anchilivi: '0005',
    'Belisario Quevedo': '0005',
    Chipualo: '0005',
    'El corazon': '0005',
    Guaytacama: '0005',
    'La Mana': '0005',
    'La Victoria': '0005',
    Lasso: '0005',
    Latacunga: '0005',
    Moraspungo: '0005',
    Mulalao: '0005',
    Mulalillo: '0005',
    Pangua: '0005',
    Panzaleo: '0005',
    Pastocalle: '0005',
    Patain: '0005',
    Poalo: '0005',
    Pujili: '0005',
    Rumipamba: '0005',
    Salcedo: '0005',
    'San Marcos': '0005',
    'Santa Ana': '0005',
    Saquisili: '0005',
    Sigchos: '0005',
    Tanicuchi: '0005',
    Toacaso: '0005',
    Yanayacu: '0005',
  },
  'El Oro': {
    '3 Cerritos': '0006',
    Arenillas: '0006',
    Atahualpa: '0006',
    'Bajo Alto': '0006',
    Barbones: '0006',
    Balsas: '0006',
    Bellamaria: '0006',
    'Buena Vista': '0006',
    'Caña Quemada': '0006',
    Chilla: '0006',
    'El Cambio': '0006',
    'El Guabo': '0006',
    'El Pache': '0006',
    'El Porton': '0006',
    Huaquillas: '0006',
    'La Avanzada': '0006',
    'La Iberia': '0006',
    'Las Lajas': '0006',
    'La Peaña': '0006',
    'Loma De Franco': '0006',
    Lourdes: '0006',
    Machala: '0006',
    Marcabeli: '0006',
    'Nuevo Puente Internacional Cebef': '0006',
    Pasaje: '0006',
    Piñas: '0006',
    Portovelo: '0006',
    'Puerto Bolivar': '0006',
    'Puerto Hualtaco': '0006',
    'Puerto Jeli': '0006',
    'Rio Bonito': '0006',
    'San Vicente Del Jobo': '0006',
    'Santa Rosa': '0006',
    Shumiral: '0006',
    Zaruma: '0006',
  },
  Esmeraldas: {
    Atacames: '0007',
    Borbon: '0007',
    'Eloy Alfaro': '0007',
    Esmeraldas: '0007',
    'La Concordia': '0007',
    'La Independencia': '0007',
    'La Union (Quininde)': '0007',
    'La Y De Calderon': '0007',
    Lagarto: '0007',
    'Las Peñas ': '0007',
    Muisne: '0007',
    Quininde: '0007',
    'Rio Verde': '0007',
    Same: '0007',
    Sua: '0007',
    Tachina: '0007',
    Tonchigue: '0007',
    Tonsupa: '0007',
    Viche: '0007',
    'San Lorenzo': '0007',
  },
  Galapagos: {
    Isabela: '0008',
    'San Cristobal': '0008',
    'Santa Cruz': '0008',
  },
  Guayas: {
    '3 Postes': '0009',
    'A. Baquerizo Moreno - Jujan': '0009',
    Balao: '0009',
    'Balao Chico': '0009',
    Balzar: '0009',
    'Base Taura': '0009',
    'Boca De Caña': '0009',
    Boliche: '0009',
    Bucay: '0009',
    Cerecita: '0009',
    Chiveria: '0009',
    Chongon: '0009',
    'Cien Familia': '0009',
    Colimes: '0009',
    Coloradal: '0009',
    Cumanda: '0009',
    Daule: '0009',
    'Data De Playas': '0009',
    Duran: '0009',
    'El Deseo': '0009',
    'El Empalme': '0009',
    'El Morro': '0009',
    'El Nato': '0009',
    'El Triunfo': '0009',
    'Eloy Alfaro - Duran': '0009',
    Engabao: '0009',
    'General Vernaza': '0009',
    Guayaquil: '0009',
    'Ingenio San Carlos': '0009',
    'Isidro Ayora': '0009',
    Jujan: '0009',
    'Km 26 - Virgen De Fatima': '0009',
    'La Maravilla': '0009',
    'La Puntilla': '0009',
    'La T De Salitre': '0009',
    'La Toma': '0009',
    'Las Animas': '0009',
    'Las Mercedes (Naranjal)': '0009',
    Laurel: '0009',
    'Lomas De Sargentillo': '0009',
    'Lorenzo De Garaicoa': '0009',
    'Los Tintos': '0009',
    'Manuel J Calle': '0009',
    'Marcelino Mariduena': '0009',
    'Mariscal Sucre': '0009',
    'Matilde Esther': '0009',
    'Nueva Union': '0009',
    Milagro: '0009',
    Naranjal: '0009',
    Naranjito: '0009',
    Nobol: '0009',
    Palestina: '0009',
    'Pedro Carbo': '0009',
    Petrillo: '0009',
    Playas: '0009',
    Posorja: '0009',
    Progreso: '0009',
    'Puente Lucia': '0009',
    'Puerto Del Engabao': '0009',
    'Puerto Inca': '0009',
    'Roberto Astudillo': '0009',
    Sabanilla: '0009',
    'Salitre - Urbina Jado': '0009',
    Samborondon: '0009',
    'San Antonio (Playas)': '0009',
    'San Carlos (Balao)': '0009',
    'San Isidro': '0009',
    'San Jacinto De Yaguachi': '0009',
    'Santa Lucia': '0009',
    'Santa Rita (Balao)': '0009',
    'Simon Bolivar': '0009',
    Tarifa: '0009',
    Tenguel: '0009',
    'Urbina Jado - Salitre': '0009',
    'Villa Nueva': '0009',
    'Virgen De Fatima Km 26': '0009',
    Yaguachi: '0009',
  },
  Imbabura: {
    Aduana: '0010',
    Alpachaca: '0010',
    'Andrade Marin': '0010',
    'Antonio Ante': '0010',
    Atuntaqui: '0010',
    Caranqui: '0010',
    Chaltura: '0010',
    Chorlavi: '0010',
    Cotacachi: '0010',
    'El Olivo': '0010',
    'El Retorno': '0010',
    Ibarra: '0010',
    Natabuela: '0010',
    Otavalo: '0010',
    Pimampiro: '0010',
    Pinsaqui: '0010',
    'Puerto Lago': '0010',
    Quiroga: '0010',
    'San Antonio De Ibarra': '0010',
    'San Jose': '0010',
    'San Luis (Imbabura)': '0010',
    'San Miguel De Urcuqui': '0010',
    'San Pablo Del Lago': '0010',
    'San Roque': '0010',
    'Santo Domingo Imbabura': '0010',
    Urcuqui: '0010',
    Yachai: '0010',
    Yaguarcocha: '0010',
  },
  Loja: {
    Alamor: '0011',
    Calvas: '0011',
    Cariamanga: '0011',
    Catacocha: '0011',
    Catamayo: '0011',
    Celica: '0011',
    Chaguarpamba: '0011',
    Espindola: '0011',
    Gonzanama: '0011',
    Loja: '0011',
    Macara: '0011',
    Malacatos: '0011',
    Olmedo: '0011',
    Paltas: '0011',
    Pindal: '0011',
    Pozul: '0011',
    Puyango: '0011',
    Quilanga: '0011',
    'San Lucas': '0011',
    Santiago: '0011',
    Saraguro: '0011',
    Sozoranga: '0011',
    Vilcabamba: '0011',
    Zapotillo: '0011',
  },
  'Los Rios': {
    Baba: '0012',
    Babahoyo: '0012',
    'Buena Fe': '0012',
    Caracol: '0012',
    Catarama: '0012',
    Echeandia: '0012',
    'Entrada De San Juan': '0012',
    Fumisa: '0012',
    Hidrolitoral: '0012',
    'Isla De Bejucal': '0012',
    'La 14 Via El Paraiso': '0012',
    'La Esperanza': '0012',
    'La Julia': '0012',
    'La Union (Babahoyo)': '0012',
    'La Union (Valencia)': '0012',
    'Las Naves': '0012',
    'Los Angeles - Recinto': '0012',
    'Mata De Cacao': '0012',
    Mocache: '0012',
    Montalvo: '0012',
    'Nueva Union (Los Rios)': '0012',
    Palenque: '0012',
    Palmisa: '0012',
    'Patricia Pilar': '0012',
    'Pueblo Nuevo (Los Rios)': '0012',
    Puebloviejo: '0012',
    Quevedo: '0012',
    Quinsaloma: '0012',
    Ricaurte: '0012',
    'San Camilo': '0012',
    'San Carlos': '0012',
    'San Juan': '0012',
    'San Luis De Pambil': '0012',
    Urdaneta: '0012',
    Valencia: '0012',
    Ventanas: '0012',
    Vinces: '0012',
    Zapotal: '0012',
    Zulema: '0012',
  },
  Manabi: {
    '10 De Agosto': '0013',
    '24 De Mayo': '0013',
    Arenales: '0013',
    'Atahualpa Manabi': '0013',
    Bachillero: '0013',
    'Bahia De Caraquez': '0013',
    Bellavista: '0013',
    Bolivar: '0013',
    Calceta: '0013',
    Calderon: '0013',
    Canoa: '0013',
    Canuto: '0013',
    Cañitas: '0013',
    Cascol: '0013',
    Charapoto: '0013',
    Cheven: '0013',
    Chone: '0013',
    'Ciudad Alfaro': '0013',
    Coaque: '0013',
    Cojimies: '0013',
    Colon: '0013',
    Colorado: '0013',
    Crucita: '0013',
    'Don Juan': '0013',
    'El Carmen': '0013',
    'El Matal': '0013',
    'El Rodeo': '0013',
    'Flavio Alfaro': '0013',
    Jama: '0013',
    Jaramijo: '0013',
    Jipijapa: '0013',
    Junin: '0013',
    'La Chorrera': '0013',
    'La Estancilla': '0013',
    'Leonidas Plaza': '0013',
    Lodana: '0013',
    'Los Bajos': '0013',
    Machalilla: '0013',
    Mache: '0013',
    Manta: '0013',
    Montecristi: '0013',
    'Nuevo Briceño': '0013',
    Olmedo: '0013',
    Pajan: '0013',
    Pedernales: '0013',
    Pichincha: '0013',
    'Playa Prieta': '0013',
    Portoviejo: '0013',
    'Pueblo Nuevos': '0013',
    'Puerto Lopez': '0013',
    Ricaurte: '0013',
    'Rio Chico': '0013',
    Rocafuerte: '0013',
    'San Antonio': '0013',
    'San Clemente': '0013',
    'San Isidro': '0013',
    'San Jacinto': '0013',
    'San Placido': '0013',
    'San Vicente': '0013',
    Sancan: '0013',
    'Santa Ana': '0013',
    Sosote: '0013',
    Sucre: '0013',
    Tosagua: '0013',
  },
  'Morona Santiago': {
    Gualaquiza: '0014',
    Huamboya: '0014',
    'Limon - Indanza': '0014',
    Logroño: '0014',
    Macas: '0014',
    Mendez: '0014',
    Morona: '0014',
    'Pablo Sexto': '0014',
    Palora: '0014',
    'San Juan Bosco': '0014',
    Santiago: '0014',
    Sucua: '0014',
    Taisha: '0014',
    Tiwintza: '0014',
  },
  Napo: {
    'Arosemena Tola': '0015',
    Archidona: '0015',
    Baeza: '0015',
    Borja: '0015',
    Cotundo: '0015',
    'Carlos Julio Arosemena Tola': '0015',
    'El Chaco': '0015',
    'Gonzalo Pizarro': '0015',
    'Nueva Esperanza': '0015',
    'Puerto Napo': '0015',
    Quijos: '0015',
    Tazayacu: '0015',
    Tena: '0015',
  },
  Orellana: {
    Aguarico: '0016',
    'El Coca - Francisco De Orellana': '0016',
    'La Joya De Los Sachas': '0016',
    Loreto: '0016',
    Orellana: '0016',
  },
  Pastaza: {
    Arajuno: '0017',
    Mera: '0017',
    Puyo: '0017',
    'Santa Clara': '0017',
    'Shell (El Puyo)': '0017',
  },
  Pichincha: {
    Alangasí: '0018',
    Aloag: '0018',
    Aloasi: '0018',
    Amaguaña: '0018',
    Ayora: '0018',
    Cayambe: '0018',
    Conocoto: '0018',
    Cumbayá: '0018',
    'El Quinche': '0018',
    Guachala: '0018',
    'Juan Montalvo': '0018',
    'La Merced': '0018',
    Machachi: '0018',
    Mejia: '0018',
    Nanegalito: '0018',
    'Mitad del Mundo': '0018',
    'Pedro Moncayo': '0018',
    'Pedro Vicente Maldonado': '0018',
    'Puerto Quito': '0018',
    Pifo: '0018',
    Pintag: '0018',
    Puembo: '0018',
    Quito: '0018',
    Ruminahui: '0018',
    'San Miguel De Los Bancos': '0018',
    Sangolqui: '0018',
    Tababela: '0018',
    Tabacundo: '0018',
    Tambillo: '0018',
    Tumbaco: '0018',
    Yaruquí: '0018',
  },
  'Santa Elena': {
    Ancon: '0019',
    Anconcito: '0019',
    Ballenita: '0019',
    Cadeate: '0019',
    Capaes: '0019',
    'El Tambo': '0019',
    'Jambeli Monteverde': '0019',
    'La Libertad': '0019',
    'Libertador Bolivar': '0019',
    Manglaralto: '0019',
    Montañita: '0019',
    'Monteverde - Jambeli': '0019',
    Muey: '0019',
    Olon: '0019',
    Palmar: '0019',
    Prosperidad: '0019',
    'Punta Barandua': '0019',
    'Punta Blanca': '0019',
    'Punta Carnero': '0019',
    'Punta Centinela': '0019',
    Salinas: '0019',
    'San Pablo': '0019',
    'San Pedro': '0019',
    'Santa Elena': '0019',
    'Santa Rosa': '0019',
    Valdivia: '0019',
  },
  'Santo Domingo De Los Tsachilas': {
    Alluriquin: '0020',
    'Km 14-Quevedo': '0020',
    'Km 24-Quevedo': '0020',
    'Km 38.5 Via Quevedo': '0020',
    'Km 41 Via Quevedo': '0020',
    'Las Delicias': '0020',
    'Luz De America': '0020',
    'Nuevo Israel': '0020',
    'Puerto Limon': '0020',
    'San Jacinto Del Bua': '0020',
    'Santo Domingo': '0020',
    'Valle Hermoso': '0020',
  },
  Sucumbios: {
    '7 De Julio': '0021',
    Cascales: '0021',
    Cuyabeno: '0021',
    'Gonzalo Pizarro': '0021',
    'Jivino Verde': '0021',
    'Lago Agrio': '0021',
    'Los Rios': '0021',
    Lumbaqui: '0021',
    Putumayo: '0021',
    Reventador: '0021',
    'Santa Cecilia': '0021',
    Shushufindi: '0021',
    Sucumbios: '0021',
  },
  Tungurahua: {
    Ambato: '0022',
    'Banos De Agua Santa': '0022',
    Cevallos: '0022',
    Huambalo: '0022',
    Mocha: '0022',
    Patate: '0022',
    Pelileo: '0022',
    Pillaro: '0022',
    Quero: '0022',
    'San Pedro De Pelileo': '0022',
    'Santa Rosa (Ambato)': '0022',
    'Santiago De Pillaro': '0022',
    Tisaleo: '0022',
  },
  'Zamora Chinchipe': {
    'Centinela Del Condor': '0023',
    Chinchipe: '0023',
    'El Pangui': '0023',
    Nagaritza: '0023',
    Palanda: '0023',
    Paquisha: '0023',
    Yacuambi: '0023',
    Yantzaza: '0023',
    Zamora: '0023',
    Zumba: '0023',
  },
}

export default {
  country: 'ECU',
  abbr: 'EC',
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevels: ['state'],
  firstLevelPostalCodes: firstLevelPostalCodes(countryData),
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      autoComplete: 'nope',
      hidden: true,
      label: 'postalCode',
      maxLength: 50,
      name: 'postalCode',
      postalCodeAPI: false,
      regex: /^([\d]{4})$/,
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
      label: 'province',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
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
      required: false,
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
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
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
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
      { delimiter: ' ', name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}
