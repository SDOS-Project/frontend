import { apiSlice } from '../api/apiSlice';
import { produce } from 'immer';
import { updateUser } from '../auth/authSlice';
import { USER_BASE_URL } from '../user/apiSlice';

const ORGANISATION_BASE_URL = '/organisation';

export const organisationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganisations: builder.query({
      query: () => ({
        url: `${ORGANISATION_BASE_URL}`,
        method: 'GET',
      }),
    }),
    getOrganisationsDropdown: builder.query({
      query: () => ({
        url: `${ORGANISATION_BASE_URL}/dropdown`,
        method: 'GET',
      }),
    }),
    getOrganisation: builder.query({
      query: (handle) => ({
        url: `${ORGANISATION_BASE_URL}/${handle}`,
        method: 'GET',
      }),
    }),
    getOrganisationUsers: builder.query({
      query: (handle) => ({
        url: `${ORGANISATION_BASE_URL}/${handle}/users`,
        method: 'GET',
      }),
    }),
    getOrganisationProjects: builder.query({
      query: (handle) => ({
        url: `${ORGANISATION_BASE_URL}/${handle}/projects`,
        method: 'GET',
      }),
    }),
    updateOrganisation: builder.mutation({
      query: ({ organisation }) => ({
        url: `${ORGANISATION_BASE_URL}`,
        method: 'PATCH',
        body: organisation,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            organisationApiSlice.util.updateQueryData(
              'getOrganisation',
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
    deleteUser: builder.mutation({
      query: ({ userHandle }) => ({
        url: `${USER_BASE_URL}/${userHandle}`,
        method: 'DELETE',
      }),
      async onQueryStarted(
        { orgHandle, userHandle },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            organisationApiSlice.util.updateQueryData(
              'getOrganisationUsers',
              orgHandle,
              (draft) => {
                return produce(draft, (draftState) => {
                  console.log(JSON.stringify(draftState));
                  Object.assign(
                    draftState,
                    draftState.forEach((user, index) => {
                      if (user.handle === userHandle) {
                        draftState.splice(index, 1);
                      }
                    })
                  );
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
  useGetOrganisationsQuery,
  useGetOrganisationsDropdownQuery,
  useGetOrganisationQuery,
  useGetOrganisationUsersQuery,
  useGetOrganisationProjectsQuery,
  useUpdateOrganisationMutation,
  useDeleteUserMutation,
} = organisationApiSlice;
