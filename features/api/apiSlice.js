import { auth } from '@/firebase-config';
import { BASE_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getFirebaseIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    return `Bearer ${idToken}`;
  }
  return '';
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await getFirebaseIdToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({}),
});
