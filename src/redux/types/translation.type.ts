export type TranslationType = {
  id?: string;
  keyword: string;
  translation: LangCodeTypes;
};

export type LangCodeTypes = {
  AZ: string | null;
  RU: string | null;
  TR: string | null;
  SP: string | null;
  EN: string | null;
  DE: string | null;
  FR: string | null;
};

export type CountryTypes = {
  name: string;
  id: keyof LangCodeTypes;
  capital: string;
  region: string;
  currency: {
    id: string;
    name: string;
    symbol: string | null;
  };
  language: {
    id: string;
    name: string;
  };
  flag: string;
};
