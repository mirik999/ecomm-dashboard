import { UserType } from '../types/user.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserType = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      return action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
