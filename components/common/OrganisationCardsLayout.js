import NullViewComponent from '../nullViews/NullViewComponent';
import OrganisationCard from '../organisation/OrganisationCard';
import OrganisationCardSkeleton from '../organisation/skeletons/OrganisationCardSkeleton';

export default function OrganisationCardsLayout({
  organisations,
  isOrganisationsLoading,
  grid
}) {
  return (
    <>
      {isOrganisationsLoading ? (
        <main className={grid ?? "cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8"}>
          {Array.from({ length: 15 }).map((_, id) => (
            <OrganisationCardSkeleton key={id} />
          ))}
        </main>
      ) : organisations.length > 0 ? (
        <main className={grid ?? "cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8"}>
          {organisations?.map((organisation) => (
            <OrganisationCard key={organisation.handle} {...organisation} />
          ))}
        </main>
      ) :
        (<NullViewComponent
          imgSrc={"/assets/images/orgNotFound.svg"}
          heading={"No Organisations Found"} />
        )}
    </>
  );
}
