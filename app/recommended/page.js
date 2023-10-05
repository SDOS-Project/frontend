'use client';
import UserCard from '@/components/user/UserCard';
import { useGetRecommededQuery } from '@/features/user/apiSlice';

export default function Recommended() {
  const { data: recommeded, isLoading } = useGetRecommededQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {recommeded.map((user) => (
        <UserCard key={user.handle} {...user} />
      ))}
    </>
  );
}
