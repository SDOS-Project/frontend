import { auth } from '@/firebase';
import { BASE_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const jwtToken = auth.currentUser.getIdToken();
      headers.set('Authorization', `Bearer ${jwtToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
