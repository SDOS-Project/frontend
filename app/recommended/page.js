'use client';
import UserCard from '@/components/user/UserCard';
import { useGetRecommendedQuery } from '@/features/user/apiSlice';

export default function Recommended() {
  const { data: recommeded, isLoading } = useGetRecommendedQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8">
        {recommeded?.map((user) => (
          <UserCard key={user.handle} {...user} />
        ))}
      </main>
    </>
  );
}
