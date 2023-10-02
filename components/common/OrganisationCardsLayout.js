import OrganisationCard from '../organisation/OrganisationCard';
import OrganisationCardSkeleton from '../organisation/skeletons/OrganisationCardSkeleton';

export default function OrganisationCardsLayout({
  organisations,
  isOrganisationsLoading,
}) {
  return (
    <>
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
    </>
  );
}
