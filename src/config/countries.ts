import { CountryTypes } from '../redux/types/translation.type';

const countries: CountryTypes[] = [
  {
    name: 'Azerbaijan',
    id: 'AZ',
    capital: 'Baku',
    region: 'AS',
    currency: {
      id: 'AZN',
      name: 'Azerbaijani manat',
      symbol: null,
    },
    language: {
      id: 'az',
      name: 'Azerbaijani',
    },
    flag: 'https://restcountries.eu/data/aze.svg',
  },
  {
    name: 'United Kingdom',
    id: 'EN',
    capital: 'London',
    region: 'EU',
    currency: {
      id: 'USD',
      name: 'United States dollar',
      symbol: '$',
    },
    language: {
      id: 'en',
      name: 'English',
    },
    flag: 'https://restcountries.eu/data/gbr.svg',
  },
  {
    name: 'Russia',
    id: 'RU',
    capital: 'Moscow',
    region: 'EU',
    currency: {
      id: 'RUB',
      name: 'Russian ruble',
      symbol: '₽',
    },
    language: {
      id: 'ru',
      name: 'Russian',
    },
    flag: 'https://restcountries.eu/data/rus.svg',
  },
  {
    name: 'Turkey',
    id: 'TR',
    capital: 'Ankara',
    region: 'AS',
    currency: {
      id: 'TRY',
      name: 'Turkish lira',
      symbol: null,
    },
    language: {
      id: 'tr',
      name: 'Turkish',
    },
    flag: 'https://restcountries.eu/data/tur.svg',
  },
  {
    name: 'France',
    id: 'FR',
    capital: 'Paris',
    region: 'EU',
    currency: {
      id: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
    language: {
      id: 'fr',
      name: 'French',
    },
    flag: 'https://restcountries.eu/data/fra.svg',
  },
  {
    name: 'Spain',
    id: 'SP',
    capital: 'Madrid',
    region: 'EU',
    currency: {
      id: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
    language: {
      id: 'sp',
      name: 'Spanish',
    },
    flag: 'https://restcountries.eu/data/esp.svg',
  },
  {
    name: 'Germany',
    id: 'DE',
    capital: 'Berlin',
    region: 'EU',
    currency: {
      id: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
    language: {
      id: 'de',
      name: 'German',
    },
    flag: 'https://restcountries.eu/data/deu.svg',
  },
];

export default countries;
