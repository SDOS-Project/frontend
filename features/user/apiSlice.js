import { apiSlice } from '../api/apiSlice';

const USER_BASE_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecommeded: builder.query({
      query: () => `${USER_BASE_URL}/recommeded`,
    }),
    getFaculty: builder.query({
      query: () => `${USER_BASE_URL}/faculty`,
    }),
    getEmployees: builder.query({
      query: () => `${USER_BASE_URL}/employees`,
    }),
    getUser: builder.query({
      query: (handle) => `${USER_BASE_URL}/${handle}`,
    }),
    getUserProjects: builder.query({
      query: (handle) => `${USER_BASE_URL}/${handle}/projects`,
    }),
  }),
});

export const {
  useGetRecommededQuery,
  useGetFacultyQuery,
  useGetEmployeesQuery,
  useGetUserQuery,
  useGetUserProjectsQuery,
} = userApiSlice;
