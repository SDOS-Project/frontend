'use client';
import OrganisationCardsLayout from '@/components/common/OrganisationCardsLayout';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';

export default function Organisations() {
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  console.log('organisations', organisations);

  return (
    <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-8">
      <OrganisationCardsLayout
        organisations={organisations}
        isOrganisationsLoading={isOrganisationsLoading}
      />
    </main>
  );
}
