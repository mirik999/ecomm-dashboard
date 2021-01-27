import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = ['guest', 'admin', 'sudo'];

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
});

export default rolesSlice.reducer;
