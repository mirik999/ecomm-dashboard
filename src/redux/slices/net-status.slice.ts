import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  isOpen: false,
};

const netStatusSlice = createSlice({
  name: 'net-status',
  initialState,
  reducers: {
    saveNetStatus(state, action: PayloadAction<any>) {
      return {
        isOpen: true,
        ...action.payload[0],
      };
    },
    removeNetStatus() {
      return initialState;
    },
  },
});

export const { saveNetStatus, removeNetStatus } = netStatusSlice.actions;
export default netStatusSlice.reducer;
