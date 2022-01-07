import { createContext } from 'react';

export const initialState = {
  account: {
    address: '',
  },
};

export const Context = createContext(initialState);
