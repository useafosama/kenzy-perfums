import { Category, Price } from './types';

// Pricing Schemes
const standardPrices: Price[] = [
  { size: '20ml', price: 80 },
  { size: '30ml', price: 100 },
  { size: '40ml', price: 150 },
  { size: '50ml', price: 250 },
  { size: '100ml', price: 350 },
];

const highQualityPrices: Price[] = [
  { size: '20ml', price: 100 },
  { size: '30ml', price: 150 },
  { size: '40ml', price: 200 },
  { size: '50ml', price: 300 },
  { size: '100ml', price: 400 },
];

const oudPrices: Price[] = [
  { size: '20ml', price: 110 },
  { size: '30ml', price: 180 },
  { size: '40ml', price: 230 },
  { size: '50ml', price: 260 },
  { size: '100ml', price: 450 },
  { size: '100ml', price: 600, label: 'بريميوم' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'best-sellers',
    name: 'الأكثر طلباً',
    prices: standardPrices, // Using standard as reference
    items: [
      'سوفاج ديور',
      'كيركي',
      'خمره',
      'بلاك افغانو',
      'فيرزاتشى ايروس',
      'اربابورا',
      'لاڤي بيل',
      'وان مليون'
    ]
  },
  {
    id: 'men-standard',
    name: 'العطور الرجالي',
    prices: standardPrices,
    items: [
      'BMW', 'بلاك ليكسيز', 'بوص ذا سنت', 'تشامبيون', 'هاج سينت', 'سكلبشر', 'انفكتوس', 
      'خمره', 'سترونج ويز يو', 'تومى هيل', 'دانهيل ديزاير بلو', 'بلاك اكس اس', 'التراميل', 
      'سوفاج ديور', 'فوياج', 'لاكوست وايت', 'لاكوست بلاك', 'لاكوست استنشال', 'سيلفر سينت', 
      'اوبن', 'دركار', 'لابيدوس', 'رومبا', 'عمرو دياب', 'روشاز', '3G', 'باد بوى', 
      'هدسون ڤالى', 'جاكوار جرين', 'ازارو ونتد', 'فيرزاتشى ايروس', 'مونت بلاك ليجند', 
      'بوما جام', 'اقوى ديجو', 'شروتى', 'وان مان شو', 'وان مليون', 'مارلبت مان', 
      'بلاتنيوم', 'انترنتى', 'VIP', 'Kenzy Man', 'زارا جولد', 'جوتشى جيلتى بلاك', 
      'ايس شوكلت', 'الثائر'
    ]
  },
  {
    id: 'men-hq',
    name: 'الرجالي هاي كواليتي',
    prices: highQualityPrices,
    items: [
      'اربابورا', 'اربابورا جولد', 'جيمى شو', 'بلاك اوركيد', 'بكرات روج'
    ]
  },
  {
    id: 'women-standard',
    name: 'العطور الحريمي',
    prices: standardPrices,
    items: [
      'كيركي', 'جوتشى فلورا', 'فانتازيا برتنى', 'بينك شوجر', 'كاتى بيرى', 'فيرى سيكسى ناو', 
      'ميد نايت', 'اوليمبيا', 'كريستال نوار', 'كريزى لاف', 'سيكرت شارم', 'تاج', 
      'بربري هير', 'جوتشى راش', 'رالف لورين', 'وصال', 'لاڤ ذا هفلى', 'ايدل لانكوم', 
      '212 سيكسى', 'تشيلز', 'لڤي بيل', 'سيكسى جرافيتى', 'مون باريس', 'اورجانزا', 
      'بونبون', 'ويك اند', 'كوكونت', 'وايلد مدغشقر', 'مارشميلو', 'باريس هيلتون', 
      'مون سباركل', 'سكيب', 'فانيليا بودر'
    ]
  },
  {
    id: 'women-hq',
    name: 'الحريمي هاي كواليتي',
    prices: highQualityPrices,
    items: [
      'مانسيرا روز فانيليا', 'ايلى صعب', 'نساء العالم', 'بيانكو لاتيه', 'بلاك ابيوم', 
      'هوت كنزى', 'ليبر انتنس', 'جود جيرل', 'سى احمر', 'بكرات روج', 'باى نايت', 
      'كوكو شانيل', 'يارا كندى', 'روبرتو كافالى', 'چورچينا', 'رش فيكتور'
    ]
  },
  {
    id: 'oud',
    name: 'الأعواد الرجالي',
    prices: oudPrices,
    items: [
      'مضاوى', 'بوكيه', 'كلمات', 'القصر', 'امبريال فالى', 'فورجرتنس', 'عود ابيض', 
      'اكسنتو سوسبيرو', 'سلطان العطور', 'الف ليله وليله', 'بلاك افغانو', 
      'بيجاسوس ديمارلى', 'بلاك اوركيد'
    ]
  }
];

// Correct International WhatsApp Number (No spaces, no +)
export const WHATSAPP_NUMBER = "201124512664";

// --- Enhanced Database Types & Data ---

export interface PerfumeDetails {
  gender: string[];
  intensity: string[];
  season: string[];
  price: string[];
  reason: string;
  // New Fields
  scentType: 'fresh' | 'sweet' | 'woody' | 'oriental' | 'floral' | 'fruity';
  suitableFor: string[]; // work, dates, outings, night
  longevity: 'weak' | 'medium' | 'long' | 'eternal'; // 1-4 scale
  projection: 'intimate' | 'moderate' | 'strong'; // 1-3 scale
  description?: string;
}

// Expanded Database
export const PERFUME_DB: Record<string, PerfumeDetails> = {
  'سوفاج ديور': { 
    gender: ['men'], intensity: ['medium', 'strong'], season: ['all', 'summer'], price: ['economic', 'medium'], 
    reason: 'عطر الجاذبية الأول، مناسب لكل الأوقات وفوحانه ممتاز.',
    scentType: 'fresh', suitableFor: ['work', 'outings', 'dates'], longevity: 'long', projection: 'strong',
    description: 'مزيج منعش من البرغموت والفلفل مع لمسات خشبية من العنبر.'
  },
  'بلاك افغانو': { 
    gender: ['men'], intensity: ['strong'], season: ['winter'], price: ['medium', 'luxury'], 
    reason: 'عطر فخم وثقيل، لمحبي العطور العودية والمدخنة.',
    scentType: 'woody', suitableFor: ['night', 'dates'], longevity: 'eternal', projection: 'strong',
    description: 'عطر داكن وغامض يجمع بين العود والبخور والقهوة.'
  },
  'فيرزاتشى ايروس': { 
    gender: ['men'], intensity: ['medium', 'strong'], season: ['summer', 'all'], price: ['economic', 'medium'], 
    reason: 'عطر منعش وفواح، مثالي للصيف والحفلات.',
    scentType: 'fresh', suitableFor: ['outings', 'dates', 'night'], longevity: 'long', projection: 'strong'
  },
  'بكرات روج': { 
    gender: ['men', 'women'], intensity: ['strong'], season: ['all', 'winter'], price: ['medium', 'luxury'], 
    reason: 'العطر التريند، سكري وفخم جداً وثباته عالي.',
    scentType: 'sweet', suitableFor: ['dates', 'night', 'work'], longevity: 'eternal', projection: 'strong'
  },
  'اربابورا': { 
    gender: ['men', 'women'], intensity: ['strong'], season: ['summer', 'all'], price: ['medium', 'luxury'], 
    reason: 'قنبلة الفواكه، فوحان ملفت جداً ومنعش.',
    scentType: 'fruity', suitableFor: ['outings', 'summer'], longevity: 'eternal', projection: 'strong'
  },
  'وان مليون': { 
    gender: ['men'], intensity: ['strong'], season: ['winter'], price: ['economic', 'medium'], 
    reason: 'عطر سكري دافئ، مشهور بجاذبيته في الشتاء.',
    scentType: 'sweet', suitableFor: ['night', 'dates'], longevity: 'long', projection: 'strong'
  },
  'كيركي': { 
    gender: ['men', 'women'], intensity: ['strong'], season: ['summer', 'all'], price: ['economic', 'medium'], 
    reason: 'مزيج فواكه استوائية، ثبات وفوحان لا يقاوم.',
    scentType: 'fruity', suitableFor: ['outings', 'summer'], longevity: 'long', projection: 'strong'
  },
  'لاڤي بيل': { 
    gender: ['women'], intensity: ['strong'], season: ['winter', 'all'], price: ['economic', 'medium'], 
    reason: 'عطر السعادة، زهري وسكري وأنثوي جداً.',
    scentType: 'floral', suitableFor: ['dates', 'work', 'outings'], longevity: 'long', projection: 'strong'
  },
  'جوتشى فلورا': { 
    gender: ['women'], intensity: ['light', 'medium'], season: ['summer', 'all'], price: ['economic'], 
    reason: 'زهري ناعم، يعطي إحساس بالنظافة والانتعاش.',
    scentType: 'floral', suitableFor: ['work', 'outings'], longevity: 'medium', projection: 'moderate'
  },
  'سي احمر': { 
    gender: ['women'], intensity: ['strong'], season: ['winter', 'all'], price: ['medium', 'luxury'], 
    reason: 'عطر الجرأة والثقة، فواح ومغري.',
    scentType: 'sweet', suitableFor: ['night', 'dates'], longevity: 'long', projection: 'strong'
  },
  'عود ابيض': { 
    gender: ['men'], intensity: ['medium', 'strong'], season: ['all', 'winter'], price: ['luxury'], 
    reason: 'عود نقي وهادئ، مناسب للمناسبات الرسمية.',
    scentType: 'oriental', suitableFor: ['work', 'dates'], longevity: 'long', projection: 'moderate'
  },
  'بلاك اوركيد': { 
    gender: ['men', 'women'], intensity: ['strong'], season: ['winter'], price: ['luxury'], 
    reason: 'عطر غامض وتقيل، للأجواء الباردة والمناسبات.',
    scentType: 'oriental', suitableFor: ['night', 'dates'], longevity: 'eternal', projection: 'strong'
  },
};

// Helper to get or generate details
export const getPerfumeDetails = (name: string): PerfumeDetails => {
  if (PERFUME_DB[name]) {
    return PERFUME_DB[name];
  }

  // Consistent Random Generation based on name string
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const scentTypes: PerfumeDetails['scentType'][] = ['fresh', 'sweet', 'woody', 'oriental', 'floral', 'fruity'];
  const suitableOptions = ['work', 'dates', 'outings', 'night'];
  const longevityOptions: PerfumeDetails['longevity'][] = ['medium', 'long', 'eternal'];
  const projectionOptions: PerfumeDetails['projection'][] = ['moderate', 'strong'];
  const seasonOptions = ['summer', 'winter', 'all'];

  // Determine gender hint from categories (passed implicitly or guessed)
  // For simplicity, we default to mixed/men unless specific keywords found
  const isWomen = /فلورا|حريمي|نسائي|ليدي|جيرل|بنك|روز|فانيليا/.test(name);
  
  return {
    gender: isWomen ? ['women'] : ['men'],
    intensity: ['medium'],
    season: [seasonOptions[hash % seasonOptions.length]],
    price: ['medium'],
    reason: 'عطر مميز بجودة عالية.',
    scentType: scentTypes[hash % scentTypes.length],
    suitableFor: [suitableOptions[hash % suitableOptions.length], suitableOptions[(hash + 1) % suitableOptions.length]],
    longevity: longevityOptions[hash % longevityOptions.length],
    projection: projectionOptions[hash % projectionOptions.length],
  };
};