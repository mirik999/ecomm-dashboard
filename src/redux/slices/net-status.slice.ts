import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

const netStatusSlice = createSlice({
  name: 'net-status',
  initialState,
  reducers: {
    saveNetStatus(state, action: PayloadAction<any>) {
      return action.payload[0];
    },
    removeNetStatus() {
      return initialState;
    },
  },
});

export const { saveNetStatus, removeNetStatus } = netStatusSlice.actions;
export default netStatusSlice.reducer;
