import { createContext } from 'react';

export const initialState = {
  account: {
    address: '',
  },
  setAccount: () => {},
};

export const Context = createContext(initialState);
