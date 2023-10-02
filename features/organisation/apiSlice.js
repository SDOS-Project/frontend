import { apiSlice } from '../api/apiSlice';

const ORGANISATION_BASE_URL = '/organisation';

export const organisationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganisations: builder.query({
      query: () => ({
        url: `${ORGANISATION_BASE_URL}`,
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
  }),
});

export const {
  useGetOrganisationsQuery,
  useGetOrganisationQuery,
  useGetOrganisationUsersQuery,
} = organisationApiSlice;
