import { apiSlice } from '../api/apiSlice';

const USER_BASE_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (handle) => `${USER_BASE_URL}/${handle}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
