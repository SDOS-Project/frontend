import { apiSlice } from '../api/apiSlice';

const PROJECT_BASE_URL = '/project';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `${PROJECT_BASE_URL}`,
        method: 'GET',
      }),
    }),
    getProject: builder.query({
      query: (handle) => ({
        url: `${PROJECT_BASE_URL}/${handle}`,
        method: 'GET',
      }),
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: `${PROJECT_BASE_URL}`,
        method: 'POST',
        body: project,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectApiSlice;
