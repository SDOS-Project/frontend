import { updateUser } from './authSlice';

const { apiSlice } = require('../api/apiSlice');

const AUTH_BASE_URL = '/auth';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    // async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //   try {
    //     const { user } = await queryFulfilled;
    //     dispatch(updateUser(user));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    signup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/signup`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
