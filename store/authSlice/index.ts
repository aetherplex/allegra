import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  address: string;
}

const initialState: IAuthState = {
  address: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddress: (state: IAuthState, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = authSlice.actions;

export default authSlice.reducer;
