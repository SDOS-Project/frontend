import { apiSlice } from '../api/apiSlice';

const USER_BASE_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (handle) => `${USER_BASE_URL}/${handle}`,
    }),
    getFaculty: builder.query({
      query: () => `${USER_BASE_URL}/faculty`,
    }),
    getEmployees: builder.query({
      query: () => `${USER_BASE_URL}/employees`,
    }),
  }),
});

export const { useGetUserQuery, useGetFacultyQuery, useGetEmployeesQuery } =
  userApiSlice;
