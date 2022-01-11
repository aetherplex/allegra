import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  activeAddress: string;
  addresses: string[];
}

const initialState: IAuthState = {
  activeAddress: '',
  addresses: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddresses: (state: IAuthState, action: PayloadAction<string[]>) => {
      state.addresses = action.payload;
      state.activeAddress = action.payload[0];
    },
    setActiveAddress: (state: IAuthState, action: PayloadAction<string>) => {
      state.activeAddress = action.payload;
    },
  },
});

export const { setAddresses, setActiveAddress } = authSlice.actions;

export default authSlice.reducer;
