import { WalletType } from '../../types';
import { RootState } from '../index';

export const selectActiveAddress = (state: RootState): string =>
  state.auth.activeAddress;
export const selectAddresses = (state: RootState): string[] =>
  state.auth.addresses;
export const selectWalletType = (state: RootState): WalletType =>
  state.auth.walletType;
