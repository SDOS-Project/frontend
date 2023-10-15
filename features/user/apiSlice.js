import { apiSlice } from '../api/apiSlice';
import { produce } from 'immer';
import { updateUser } from '../auth/authSlice';

const USER_BASE_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecommended: builder.query({
      query: () => `${USER_BASE_URL}/recommended`,
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
    updateProfile: builder.mutation({
      query: ({ user }) => ({
        url: `${USER_BASE_URL}`,
        method: 'PATCH',
        body: user,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userApiSlice.util.updateQueryData(
              'getUser',
              data.handle,
              (draft) => {
                return produce(draft, (draftState) => {
                  Object.assign(draftState, data);
                });
              }
            )
          );
          dispatch(updateUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetRecommendedQuery,
  useGetFacultyQuery,
  useGetEmployeesQuery,
  useGetUserQuery,
  useGetUserProjectsQuery,
  useUpdateProfileMutation,
} = userApiSlice;
