'use client';
import NullViewComponent from '@/components/nullViews/NullViewComponent';
import UserCard from '@/components/user/UserCard';
import UserCardSkeleton from '@/components/user/UserCardSkeleton';
import { useGetRecommendedQuery } from '@/features/user/apiSlice';

export default function Recommended() {
  const { data: recommeded, isLoading } = useGetRecommendedQuery();
  if (isLoading)
    return (
      <>
        <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-8">
          {Array.from({ length: 15 }).map((item) => (
            <UserCardSkeleton key={item} />
          ))}
        </main>
      </>
    );
  else if (recommeded.length > 0)
    return (
      <>
        <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-8">
          {recommeded?.map((user) => (
            <UserCard key={user.handle} {...user} />
          ))}
        </main>
      </>
    );
  else {
    return (
      <NullViewComponent
        imgSrc={"/assets/images/peopleNotFound.svg"}
        heading={"No Recommended Users."}
        desc={"Try Changing your Areas Of Interests, to find more people"}
      />
    );

  }
}
