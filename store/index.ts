import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import networkReducer from './networkSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  network: networkReducer,
});

export const rootReducer: Reducer = (
  // @ts-expect-error
  state: typeof store.state,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
