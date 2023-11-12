import NullView from '../null-views/NullView';
import OrganisationCard from '../organisation/OrganisationCard';
import OrganisationCardSkeleton from '../organisation/skeletons/OrganisationCardSkeleton';

export default function OrganisationCardsLayout({
  organisations,
  isOrganisationsLoading,
  grid = 'cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8',
}) {
  if (!isOrganisationsLoading && organisations.length === 0) {
    return (
      <NullView
        imgSrc={'/assets/images/organisation/empty.svg'}
        heading={'No Organisations Found'}
        desc={'There are no organisations on the platform yet.'}
      />
    );
  }

  return (
    <main className={grid}>
      {isOrganisationsLoading
        ? Array.from({ length: 15 }).map((organisation, i) => (
            <OrganisationCardSkeleton key={`${organisation}-${i}`} />
          ))
        : organisations?.map((organisation) => (
            <OrganisationCard key={organisation.handle} {...organisation} />
          ))}
    </main>
  );
}
