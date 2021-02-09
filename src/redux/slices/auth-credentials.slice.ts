import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//utils
import { getFromCookies, removeFromCookies, saveToCookies } from "../../utils/storage.utils";
//types
import { AuthCredentialsType } from "../types/auth.types";

const initialState: AuthCredentialsType = {
  accessToken: '',
  refreshToken: '',
  clientId: '',
  createdAt: ''
};

const authCredentialsSlice = createSlice({
  name: 'authCredentials',
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<AuthCredentialsType>) {
      saveToCookies("authCredentials", action.payload);
      return action.payload;
    },
    removeToken() {
      removeFromCookies("authCredentials")
      return initialState;
    },
    loadFromCookies() {
      return getFromCookies("authCredentials");
    }
  },
});

export const { saveToken, removeToken, loadFromCookies } = authCredentialsSlice.actions;
export default authCredentialsSlice.reducer;
