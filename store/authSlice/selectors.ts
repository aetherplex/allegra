import { RootState } from '../index';

export const selectAddress = (state: RootState): string => state.auth.address;
