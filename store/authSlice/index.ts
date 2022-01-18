import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletType } from '../../types';

interface IAuthState {
  activeAddress: string;
  addresses: string[];
  walletType: WalletType;
}

const initialState: IAuthState = {
  activeAddress: '',
  addresses: [],
  walletType: WalletType.NONE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initWallet: (
      state,
      action: PayloadAction<{ addresses: string[]; walletType: WalletType }>
    ) => {
      state.addresses = action.payload.addresses;
      state.walletType = action.payload.walletType;
      state.activeAddress = action.payload.addresses[0];
    },
    setAddresses: (state: IAuthState, action: PayloadAction<string[]>) => {
      state.addresses = action.payload;
      state.activeAddress = action.payload[0];
    },
    setActiveAddress: (state: IAuthState, action: PayloadAction<string>) => {
      state.activeAddress = action.payload;
    },
  },
});

export const { setAddresses, setActiveAddress, initWallet } = authSlice.actions;

export default authSlice.reducer;
