import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'
import { POSTAL_CODE } from '../constants'

const countryData = {
  'محافظة الأنبار': [
    'قضاء الرمادي',
    'قضاء هيت',
    'قضاء الفلوجة',
    'قضاء عانة',
    'قضاء حديثة',
    'قضاء الرطبة',
    'قضاء القائم',
    'قضاء راوة',
    'قضاء الخالدية',
    'قضاء العامرية',
    'قضاء الكرمة',
  ],
  'محافظة بابل': [
    'قضاء الحلة',
    'قضاء المحاويل',
    'قضاء الهاشمية',
    'قضاء المسيب',
    'قضاء الحمزة الغربي',
    'قضاء القاسم',
    'قضاء كوثى',
    'قضاء الإسكندرية',
    'قضاء الكفل',
  ],
  'محافظة بغداد': [
    'قضاء الرصافة',
    'قضاء الأعظمية',
    'قضاء الشعب',
    'قضاء الصدر الأول',
    'قضاء الصدر الثاني',
    'قضاء المدائن',
    'قضاء الحسينية',
    'قضاء المعامل ',
    'قضاء الكرخ',
    'قضاء الكاظمية',
    'قضاء المحمودية',
    'قضاء أبي غريب',
    'قضاء الطارمية',
    'قضاء الشعلة',
  ],
  'محافظة البصرة': [
    'قضاء البصرة',
    'قضاء أبي الخصيب',
    'قضاء الزبير',
    'قضاء القرنة',
    'قضاء الفاو',
    'قضاء شط العرب',
    'قضاء المدينة',
    'قضاء الدير',
  ],
  'محافظة ديالى': [
    'قضاء بعقوبة',
    'قضاء المقدادية',
    'قضاء الخالص',
    'قضاء خانقين',
    'قضاء بلدروز',
    'قضاء كفري',
    'قضاء خان بني سعد',
  ],
  'محافظة كربلاء': [
    'قضاء كربلاء',
    'قضاء عين تمر',
    'قضاء الهندية',
    'قضاء الحر',
  ],
  'محافظة دهوك': [
    'قضاء دهوك',
    'قضاء سميل',
    'قضاء زاخو',
    'قضاء العمادية',
    'قضاء بردرش',
    'قضاء عقرة',
  ],
  'محافظة كركوك': [
    'قضاء كركوك',
    'قضاء الحويجة',
    'قضاء داقوق',
    'قضاء دبس',
  ],
  'محافظة ميسان': [
    'قضاء العمارة',
    'قضاء علي الغربي',
    'قضاء الميمونة',
    'قضاء قلعة صالح',
    'قضاء المجر الكبير',
    'قضاء الكحلاء',
  ],
  'محافظة المثنى': [
    'قضاء السماوة',
    'قضاء الرميثة',
    'قضاء الخضر',
    'قضاء الوركاء',
    'قضاء السلمان',
  ],
  'محافظة أربيل': [
    'قضاء أربيل',
    'قضاء بنصلاوة ',
    'قضاء سوران',
    'قضاء شقلاوة',
    'قضاء جومان',
    'قضاء كويسنجق',
    'قضاء ميركسور',
    'قضاء خبات',
  ],
  'محافظة النجف': [
    'قضاء النجف',
    'قضاء الكوفة',
    'قضاء المناذرة',
    'قضاء المشخاب',
    'قضاء الحيدرية',
  ],
  'محافظة نينوى': [
    'قضاء الموصل',
    'قضاء الحمدانية',
    'قضاء تلكيف',
    'قضاء سنجار',
    'قضاء تلعفر',
    'قضاء الشيخان',
    'قضاء الحضر',
    'قضاء البعاج',
    'قضاء مخمور',
  ],
  'محافظة الديوانية': [
    'قضاء عفك',
    'قضاء الشامية',
    'قضاء الحمزة',
    'قضاء البدير',
    'قضاء سومر',
    'قضاء الدغارة',
    'قضاء نفر',
    'قضاء السنية',
    'قضاء الشافعية',
  ],
  'محافظة صلاح الدين': [
    'قضاء تكريت',
    'قضاء طوز خورماتو',
    'قضاء سامراء',
    'قضاء بلد',
    'قضاء بيجي',
    'قضاء الدور',
    'قضاء الشرقاط',
    'قضاء الدجيل',
    'قضاء آمرلي',
  ],
  'محافظة السليمانية': [
    'قضاء السليمانية',
    'قضاء قره داغ',
    'قضاء شارباريز',
    'قضاء ماوت',
    'قضاء بشدر',
    'قضاء رانية',
    'قضاء دوكان',
    'قضاء دربندخان',
    'قضاء كلار',
    'قضاء جمجمال',
  ],
  'محافظة حلبجة': [
    'قضاء حلبجة',
    'قضاء شاره زور',
    'قضاء سيد صادق',
    'قضاء بنجوين',
  ],
  'محافظة ذي قار': [
    'قضاء الناصرية',
    'قضاء الرفاعي',
    'قضاء سوق الشيوخ',
    'قضاء الجبايش',
    'قضاء الشطرة',
    'قضاء الدواية',
    'قضاء الفهود',
    'قضاء الفجر',
    'قضاء النصر',
    'قضاء الغراف',
    'قضاء قلعة سكر',
  ],
  'محافظة واسط': [
    'قضاء الكوت',
    'قضاء النعمانية',
    'قضاء الحي',
    'قضاء بدرة',
    'قضاء الصويرة',
    'قضاء العزيزية',
  ],
}

export default {
  country: 'IRQ',
  abbr: 'IQ',
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
      fixedLabel: 'ص. ب.',
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      size: 'small',
      autoComplete: 'nope',
      postalCodeAPI: false,
    },
    {
      name: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
      size: 'large',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'small',
      autoComplete: 'nope',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
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
      name: 'state',
      maxLength: 100,
      label: 'region',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
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
  summary: [
    [
      { name: 'street' },
      { delimiter: '+', name: 'number' },
      { delimiter: ', ', name: 'complement' },
    ],
    [{ name: 'city' }, { delimiter: ' , ', name: 'state' }],
    [{ name: 'postalCode' }],
  ],
}
