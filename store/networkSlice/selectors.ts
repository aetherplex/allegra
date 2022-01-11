import { INetwork, INetworkState } from '../../types';
import { RootState } from '../index';

export const selectNetwork = (state: RootState): INetworkState => ({
  ...state.network,
});
