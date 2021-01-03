import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//utils
import {getFromCookies, removeFromCookies, saveToCookies} from "../../utils/storage.utils";

const initialState: string = "";

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      saveToCookies("token", action.payload);
      return action.payload;
    },
    removeToken() {
      removeFromCookies("token")
      return initialState;
    },
    loadFromCookies() {
      return getFromCookies("token");
    }
  },
});

export const { saveToken, removeToken, loadFromCookies } = tokenSlice.actions;
export default tokenSlice.reducer;
