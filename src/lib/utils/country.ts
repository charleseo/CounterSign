export type CountryForm = 'name' | 'withArticle' | 'short';

export interface CountryMeta {
  code: string;
  name: string;
  withArticle: string;
  short: string;
  flag: string;
  region: 'popular' | 'north_america' | 'africa' | 'asia' | 'global';
  priority: 1 | 2;
  idNumberName: string;
  taxNote: string;
}

export const COUNTRIES: Record<string, CountryMeta> = {
  US: {
    code: 'US',
    name: 'United States',
    withArticle: 'the US',
    short: 'US',
    flag: '🇺🇸',
    region: 'popular',
    priority: 1,
    idNumberName: 'Social Security number (SSN)',
    taxNote: '1099 independent contractor reporting with IRS',
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    withArticle: 'the UK',
    short: 'UK',
    flag: '🇬🇧',
    region: 'popular',
    priority: 1,
    idNumberName: 'National Insurance (NI) number',
    taxNote: 'HMRC Self Assessment for sole traders',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    withArticle: 'Canada',
    short: 'CA',
    flag: '🇨🇦',
    region: 'popular',
    priority: 1,
    idNumberName: 'Social Insurance Number (SIN)',
    taxNote: 'CRA T2125 self-employed business income',
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    withArticle: 'Nigeria',
    short: 'NG',
    flag: '🇳🇬',
    region: 'africa',
    priority: 2,
    idNumberName: 'NIN or BVN',
    taxNote: 'Personal Income Tax (PIT) self-assessment with state IRS',
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    withArticle: 'Ghana',
    short: 'GH',
    flag: '🇬🇭',
    region: 'africa',
    priority: 2,
    idNumberName: 'Ghana Card PIN',
    taxNote: 'GRA self-employed quarterly income tax',
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    withArticle: 'Kenya',
    short: 'KE',
    flag: '🇰🇪',
    region: 'africa',
    priority: 2,
    idNumberName: 'KRA PIN',
    taxNote: 'KRA iTax resident individual returns',
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    withArticle: 'South Africa',
    short: 'ZA',
    flag: '🇿🇦',
    region: 'africa',
    priority: 2,
    idNumberName: 'ID number or Tax Reference Number',
    taxNote: 'SARS provisional tax for freelancers',
  },
  IN: {
    code: 'IN',
    name: 'India',
    withArticle: 'India',
    short: 'IN',
    flag: '🇮🇳',
    region: 'asia',
    priority: 2,
    idNumberName: 'PAN or Aadhaar number',
    taxNote: 'Income Tax e-Filing under Section 44ADA',
  },
  PH: {
    code: 'PH',
    name: 'Philippines',
    withArticle: 'the Philippines',
    short: 'PH',
    flag: '🇵🇭',
    region: 'asia',
    priority: 2,
    idNumberName: 'TIN or National ID',
    taxNote: 'BIR 8% optional gross income tax for freelancers',
  },
  PK: {
    code: 'PK',
    name: 'Pakistan',
    withArticle: 'Pakistan',
    short: 'PK',
    flag: '🇵🇰',
    region: 'asia',
    priority: 2,
    idNumberName: 'CNIC or NTN',
    taxNote: 'FBR active taxpayer list and freelance software/IT export incentives',
  },
  BD: {
    code: 'BD',
    name: 'Bangladesh',
    withArticle: 'Bangladesh',
    short: 'BD',
    flag: '🇧🇩',
    region: 'asia',
    priority: 2,
    idNumberName: 'National ID (NID) or e-TIN',
    taxNote: 'NBR freelancer certification and tax-exempt IT services',
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    withArticle: 'Indonesia',
    short: 'ID',
    flag: '🇮🇩',
    region: 'asia',
    priority: 2,
    idNumberName: 'NIK or NPWP',
    taxNote: 'DJP annual SPT Tahunan for individual freelancers',
  },
  WW: {
    code: 'WW',
    name: 'Worldwide',
    withArticle: 'Worldwide',
    short: 'WW',
    flag: '🌐',
    region: 'global',
    priority: 1,
    idNumberName: 'national ID, tax number or password',
    taxNote: 'Local cross-border contractor tax regulations',
  },
};

// Aliases for UK and GLOBAL
COUNTRIES['UK'] = COUNTRIES['GB'];
COUNTRIES['GLOBAL'] = COUNTRIES['WW'];

export function countryLabel(code?: string | null, form: CountryForm = 'name'): string {
  if (!code) {
    if (form === 'short') return 'WW';
    return 'Worldwide';
  }
  const upper = code.toUpperCase();
  const meta = COUNTRIES[upper];
  if (!meta) {
    return upper;
  }
  return meta[form];
}

export function getCountryMeta(code?: string | null): CountryMeta {
  if (!code) return COUNTRIES['WW'];
  const upper = code.toUpperCase();
  return COUNTRIES[upper] || COUNTRIES['WW'];
}

export const POPULAR_COUNTRIES: CountryMeta[] = [
  COUNTRIES['US'],
  COUNTRIES['GB'],
  COUNTRIES['CA'],
];

export const AFRICA_COUNTRIES: CountryMeta[] = [
  COUNTRIES['NG'],
  COUNTRIES['GH'],
  COUNTRIES['KE'],
  COUNTRIES['ZA'],
];

export const ASIA_COUNTRIES: CountryMeta[] = [
  COUNTRIES['IN'],
  COUNTRIES['PH'],
  COUNTRIES['PK'],
  COUNTRIES['BD'],
  COUNTRIES['ID'],
];

export const ALL_SUPPORTED_COUNTRIES: CountryMeta[] = [
  COUNTRIES['US'],
  COUNTRIES['GB'],
  COUNTRIES['CA'],
  COUNTRIES['NG'],
  COUNTRIES['GH'],
  COUNTRIES['KE'],
  COUNTRIES['ZA'],
  COUNTRIES['IN'],
  COUNTRIES['PH'],
  COUNTRIES['PK'],
  COUNTRIES['BD'],
  COUNTRIES['ID'],
  COUNTRIES['WW'],
];
