'use client';
import OrganisationCardsLayout from '@/components/common/OrganisationCardsLayout';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';

export default function Organisations() {
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  console.log('organisations', organisations);

  return (
    <main className="cards-grid-layout  padding-layout-1">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4">
        <OrganisationCardsLayout
          organisations={organisations}
          isOrganisationsLoading={isOrganisationsLoading}
        />
      </div>
    </main>
  );
}
