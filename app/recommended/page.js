'use client';
import NullView from '@/components/null-views/NullView';
import UserCard from '@/components/user/UserCard';
import UserCardSkeleton from '@/components/user/skeletons/UserCardSkeleton';
import { useGetRecommendedQuery } from '@/features/user/apiSlice';

export default function Recommended() {
  const { data: recommeded, isLoading } = useGetRecommendedQuery();

  if (isLoading)
    return (
      <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-8">
        {Array.from({ length: 15 }).map((user, i) => (
          <UserCardSkeleton key={`${user}-${i}`} />
        ))}
      </main>
    );

  if (recommeded.length === 0) {
    return (
      <main className="flex w-full h-[90vh] items-center justify-center">
        <NullView
          imgSrc={'/assets/images/user/empty.svg'}
          heading={'No Recommended Users Found'}
          desc={'There are no recommended users for you yet.'}
        />
      </main>
    );
  }
  return (
    <>
      <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-8">
        {recommeded?.map((user) => (
          <UserCard key={user.handle} {...user} />
        ))}
      </main>
    </>
  );
}
