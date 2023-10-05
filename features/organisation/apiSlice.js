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
  }),
});

export const {
  useGetOrganisationsQuery,
  useGetOrganisationsDropdownQuery,
  useGetOrganisationQuery,
  useGetOrganisationUsersQuery,
  useGetOrganisationProjectsQuery,
} = organisationApiSlice;
