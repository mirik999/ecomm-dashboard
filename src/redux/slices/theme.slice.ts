import { createSlice } from '@reduxjs/toolkit';
//type
import { Theme } from '../types/theme.type';
//utils
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storage.utils";

const light: Theme = {
  fontSize: {
    small: { xs: 10, sm: 10, md: 12, lg: 14, xl: 18 },
    medium: { xs: 10, sm: 11, md: 13, lg: 16, xl: 20 },
    hd: { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 },
    fhd: { xs: 12, sm: 14, md: 16, lg: 18, xl: 26 },
  },
  colors: {
    color: '#474A5A',
    background: '#FFFFFF',
    secondBackground: '#F1F2F3',
    thirdBackground: '#E1E1E4',
    border: '#d4d4d4',
    main: '#294987',
    success: '#75A42F',
    warning: '#FA8528',
    error: '#C50000',
  },
};

/*
*
*   colors: {
    white: '#fff',
    black: '#000',
    color: '#333',
    secondColor: '#90a4ae',
    background: '#eaeaea',
    secondBackground: '#c2c2c2',
    shadow: 'rgba(0,0,0,0.1)',
    border: '#B9B9B9',
    main: '#2c3e50',
    success: '#16a085',
    successLight: '#1abc9c',
    warning: '#f39c12',
    warningLight: '#f1c40f',
    error: '#c0392b',
    errorLight: '#e74c3c',
  },
* */

const dark: Theme = {
  fontSize: {
    small: { xs: 10, sm: 10, md: 12, lg: 14, xl: 18 },
    medium: { xs: 10, sm: 11, md: 13, lg: 16, xl: 20 },
    hd: { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 },
    fhd: { xs: 12, sm: 14, md: 16, lg: 18, xl: 26 },
  },
  colors: {
    color: '#C0C1C7',
    background: '#121417',
    secondBackground: '#1B1E25',
    thirdBackground: '#3C3F4C',
    border: '#393939',
    main: '#7FADE6',
    success: '#89C791',
    warning: '#FFD095',
    error: '#E88E8F',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: light,
  reducers: {
    loadTheme() {
      const theme = getFromLocalStorage('theme');
      if (theme === "dark") return dark;
      return light;
    },
    themeToDark() {
      saveToLocalStorage('theme', 'dark');
      return dark;
    },
    themeToLight() {
      saveToLocalStorage('theme', 'light');
      return light;
    },
  },
});

export const { themeToDark, themeToLight, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
