import { RootState } from '../index';

export const selectActiveAddress = (state: RootState): string =>
  state.auth.activeAddress;
export const selectAddresses = (state: RootState): string[] =>
  state.auth.addresses;
