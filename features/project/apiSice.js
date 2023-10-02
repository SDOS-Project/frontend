import { apiSlice } from '../api/apiSlice';

const PROJECT_BASE_URL = '/project';

const enhancedApiSlice = apiSlice.enhanceEndpoints({
  addTagTypes: ['Projects'],
});

export const projectApiSlice = enhancedApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `${PROJECT_BASE_URL}`,
        method: 'GET',
      }),
      providesTags: ['Projects'],
    }),
    getProject: builder.query({
      query: (handle) => ({
        url: `${PROJECT_BASE_URL}/${handle}`,
        method: 'GET',
      }),
    }),
    getUpdates: builder.query({
      query: (handle) => ({
        url: `${PROJECT_BASE_URL}/${handle}/updates`,
        method: 'GET',
      }),
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: `${PROJECT_BASE_URL}`,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    addUpdate: builder.mutation({
      query: ({ handle, update }) => ({
        url: `${PROJECT_BASE_URL}/${handle}/updates`,
        method: 'POST',
        body: update,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetUpdatesQuery,
  useCreateProjectMutation,
  useAddUpdateMutation,
} = projectApiSlice;
