import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
//types
import { UserType } from '../types/user.types';
//utils
import {getFromCookies} from "../../utils/storage.utils";

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
      const token = getFromCookies("token");
      if (token) {
        const { id, email, roles }: UserType = jwt_decode(token);
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
