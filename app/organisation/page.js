'use client';
import OrganisationCard from '@/components/organisation/OrganisationCard';
import OrganisationCardSkeleton from '@/components/organisation/skeletons/OrganisationCardSkeleton';
import ProjectCardSkeleton from '@/components/project/Skeletons/ProjectCardSkeleton';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';

export default function Organisations() {
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  console.log('organisations', organisations);

  return (
    <main className="cards-grid-layout padding-layout-1">
      <p className="body-2xlarge text-center font-semibold">
        <span className="text-primary-main">Organisations</span> With Us
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4 my-4">
        {isOrganisationsLoading ? (
          <>
            {Array.from({ length: 15 }).map((_, id) => (
              <OrganisationCardSkeleton key={id} />
            ))}
          </>
        ) : (
          <>
            {organisations?.map((organisation) => (
              <OrganisationCard key={organisation.handle} {...organisation} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
