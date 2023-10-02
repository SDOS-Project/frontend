import React from 'react';
import ProjectCardSkeleton from '../project/Skeletons/ProjectCardSkeleton';
import OrganisationCard from '../organisation/OrganisationCard';

export default function OrganisationCardsLayout({
  organisations,
  isOrganisationsLoading,
}) {
  return (
    <>
      {isOrganisationsLoading ? (
        <>
          {Array.from({ length: 15 }).map((_, id) => (
            <ProjectCardSkeleton key={id} />
          ))}
        </>
      ) : (
        <>
          {organisations?.map((organisation) => (
            <OrganisationCard key={organisation.handle} {...organisation} />
          ))}
        </>
      )}
    </>
  );
}
