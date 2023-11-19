const { apiSlice } = require('../api/apiSlice');

const AUTH_BASE_URL = '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/signup`,
        method: 'POST',
        body: credentials,
      }),
    }),
    organisationSignup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/signup/organisation`,
        method: 'POST',
        body: credentials,
      }),
    }),
    studentSignup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_BASE_URL}/signup/student`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useOrganisationSignupMutation,
  useStudentSignupMutation,
} = authApiSlice;
