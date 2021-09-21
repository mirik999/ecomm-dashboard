import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//utils
import {
  getFromCookies,
  removeFromCookies,
  saveToCookies,
  saveToLocalStorage,
} from '../../utils/storage.utils';
//types
import { TranslationReduxType } from '../types/translation.type';

const initialState: TranslationReduxType = {
  lang: 'en',
  i18: [],
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    changeLanguage(state, action) {
      saveToLocalStorage('lang', action.payload);
      return {
        ...state,
        lang: action.payload,
      };
    },
    saveTranslation(state, action) {
      return {
        ...state,
        i18: action.payload,
      };
    },
  },
});

export const { changeLanguage, saveTranslation } = translationSlice.actions;
export default translationSlice.reducer;
