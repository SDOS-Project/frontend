import { apiSlice } from '@/features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from './storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { rtkQueryErrorLogger } from '@/features/middleware/error';

const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: 'sdos-auth-encrypted',
        storage,
        transforms: [
          encryptTransform({
            secretKey: process.env.NEXT_PUBLIC_PERSIST_FORM_SECRET,
            onError: (error) => {
              console.log('Encryption error:', error);
            },
          }),
        ],
      },
      authReducer
    ),
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { persistor, store };

setupListeners(store.dispatch);
