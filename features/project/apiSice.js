import { apiSlice } from '../api/apiSlice';
import { produce } from 'immer';

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
    getProjectConfig: builder.query({
      query: (handle) => ({
        url: `${PROJECT_BASE_URL}/${handle}/config`,
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
    updateProject: builder.mutation({
      query: ({ handle, project }) => ({
        url: `${PROJECT_BASE_URL}/${handle}`,
        method: 'PATCH',
        body: project,
      }),
      async onQueryStarted({ handle, _ }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            projectApiSlice.util.updateQueryData(
              'getProject',
              handle,
              (draft) => {
                return produce(draft, (draftState) => {
                  Object.assign(draftState, data);
                });
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addUpdate: builder.mutation({
      query: ({ handle, update }) => ({
        url: `${PROJECT_BASE_URL}/${handle}/updates`,
        method: 'POST',
        body: update,
      }),
      async onQueryStarted({ handle, _ }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            projectApiSlice.util.updateQueryData(
              'getUpdates',
              handle,
              (draft) => {
                return produce(draft, (draftState) => {
                  draftState?.push(data);
                });
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetUpdatesQuery,
  useGetProjectConfigQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useAddUpdateMutation,
} = projectApiSlice;
