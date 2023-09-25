import { apiSlice } from '@/features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
