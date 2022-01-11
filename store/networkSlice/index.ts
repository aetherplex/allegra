import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INetwork, INetworkState, Network } from '../../types';

const initialState: INetworkState = {
  name: Network.MainNet,
  algodNetwork: {
    port: '',
    server: 'https://mainnet-algorand.api.purestake.io/ps2',
    token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
  },
  indexerNetwork: {
    port: '',
    server: 'https://mainnet-algorand.api.purestake.io/idx2',
    token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
  },
};

export const networkSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNetwork: (state: INetworkState, action: PayloadAction<Network>) => {
      console.log('New network', action.payload);
      switch (action.payload) {
        case Network.MainNet:
          state.name = Network.MainNet;
          state.algodNetwork = {
            port: '',
            server: 'https://mainnet-algorand.api.purestake.io/ps2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          state.indexerNetwork = {
            port: '',
            server: 'https://mainnet-algorand.api.purestake.io/idx2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          break;
        case Network.TestNet:
          state.name = Network.TestNet;
          state.algodNetwork = {
            port: '',
            server: 'https://testnet-algorand.api.purestake.io/ps2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          state.indexerNetwork = {
            port: '',
            server: 'https://testnet-algorand.api.purestake.io/idx2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          break;
        case Network.BetaNet:
          state.name = Network.BetaNet;
          state.algodNetwork = {
            port: '',
            server: 'https://betanet-algorand.api.purestake.io/ps2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          state.indexerNetwork = {
            port: '',
            server: 'https://betanet-algorand.api.purestake.io/idx2',
            token: { 'x-api-key': '4kzNFCdbS52NrnN9c28664H7Lba21vQq5HvJC53W' },
          };
          break;
        case Network.Sandbox:
          state.name = Network.Sandbox;
          state.algodNetwork = {
            port: 4000,
            fullServer: 'http://localhost:4000/sandbox/algod',
            server: 'http://localhost/sandbox/algod',
            token: { 'x-key': '709a4b2e-bcbc-40a0-9432-683e6a683842' },
          };
          state.indexerNetwork = {
            port: 4000,
            fullServer: 'http://localhost:4000/sandbox/indexer',
            server: 'http://localhost/sandbox/indexer',
            token: { 'x-key': '709a4b2e-bcbc-40a0-9432-683e6a683842' },
          };
          break;
      }
    },
  },
});

export const { setNetwork } = networkSlice.actions;

export default networkSlice.reducer;
