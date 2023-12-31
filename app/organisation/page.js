'use client';
import OrganisationCardsLayout from '@/components/common/OrganisationCardsLayout';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';
import { LinearProgress } from '@mui/material';

export default function Organisations() {
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  return (
    <>
      {isOrganisationsLoading && <LinearProgress />}
      <OrganisationCardsLayout
        organisations={organisations}
        isOrganisationsLoading={isOrganisationsLoading}
        grid="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8"
      />
    </>
  );
}
