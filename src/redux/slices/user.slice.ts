import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
//types
import { UserType } from '../types/user.types';
//utils
import { getFromCookies } from "../../utils/storage.utils";

const initialState: UserType = {
  id: '',
  email: '',
  roles: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser() {
      const authCredentials = getFromCookies("authCredentials");
      if (authCredentials.accessToken) {
        const { id, email, roles }: UserType = jwt_decode(authCredentials.accessToken);
        return { id, email, roles };
      } else {
        return initialState;
      }
    },
    removeUser() {
      return initialState;
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
