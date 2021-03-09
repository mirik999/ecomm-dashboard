import { createSlice } from '@reduxjs/toolkit';
//type
import { Theme } from '../types/theme.type';

const light: Theme = {
  fontSize: {
    small: { xs: 10, sm: 10, md: 12, lg: 14, xl: 18 },
    medium: { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 },
    hd: { xs: 10, sm: 14, md: 16, lg: 20, xl: 26 },
    fhd: { xs: 12, sm: 16, md: 18, lg: 22, xl: 32 },
  },
  colors: {
    white: '#fff',
    black: '#000',
    color: '#333',
    secondColor: '#90a4ae',
    background: '#eaeaea',
    shadow: 'rgba(0,0,0,0.1)',
    border: '#e2e2e2',
    main: '#2c3e50',
    success: '#16a085',
    successLight: '#1abc9c',
    warning: '#f39c12',
    warningLight: '#f1c40f',
    error: '#c0392b',
    errorLight: '#e74c3c',
  },
};

const dark: Theme = {
  fontSize: {
    small: { xs: 10, sm: 10, md: 12, lg: 14, xl: 18 },
    medium: { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 },
    hd: { xs: 10, sm: 14, md: 16, lg: 20, xl: 26 },
    fhd: { xs: 12, sm: 16, md: 18, lg: 22, xl: 32 },
  },
  colors: {
    white: '#fff',
    black: '#000',
    color: '#dee4e7',
    secondColor: '#90a4ae',
    background: '#37474f',
    shadow: 'rgba(0,0,0,0.7)',
    border: '#222222',
    main: '#2c3e50',
    success: '#16a085',
    successLight: '#1abc9c',
    warning: '#f39c12',
    warningLight: '#f1c40f',
    error: '#c0392b',
    errorLight: '#e74c3c',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: light,
  reducers: {
    themeToDark() {
      return dark;
    },
    themeToLight() {
      return light;
    },
  },
});

export const { themeToDark, themeToLight } = themeSlice.actions;
export default themeSlice.reducer;
