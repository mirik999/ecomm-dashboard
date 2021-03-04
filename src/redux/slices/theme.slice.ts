import { createSlice } from '@reduxjs/toolkit';
//type
import { Theme } from "../types/theme.type";

const light: Theme = {
  white: '#fff',
  black: '#000',
  color: '#333',
  secondColor: '#90a4ae',
  background: '#eaeaea',
  shadow: 'rgba(0,0,0,0.3)',
  border: '#e2e2e2',
  main: '#3b82f6',
  secondary: '#21b634',
};

const dark: Theme = {
  white: '#fff',
  black: '',
  color: '#dee4e7',
  secondColor: '#90a4ae',
  background: '#37474f',
  shadow: 'rgba(0,0,0,0.7)',
  border: '#222222',
  main: '#3b82f6',
  secondary: '#21b634',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: light,
  reducers: {
    themeToDark() {
      return dark;
    },
    themeToLight() {
      return light;
    }
  },
});

export const { themeToDark, themeToLight } = themeSlice.actions;
export default themeSlice.reducer;
