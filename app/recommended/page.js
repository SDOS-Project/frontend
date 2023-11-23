'use client';
import NullView from '@/components/null-views/NullView';
import UserCard from '@/components/user/UserCard';
import UserCardSkeleton from '@/components/user/skeletons/UserCardSkeleton';
import { selectUser } from '@/features/auth/authSlice';
import { useGetRecommendedQuery } from '@/features/user/apiSlice';
import { UserRole } from '@/types/UserRole';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Recommended() {
  const router = useRouter();
  const userState = useSelector(selectUser);
  const { data: recommeded, isLoading } = useGetRecommendedQuery();

  useEffect(() => {
    if (userState?.role.toLowerCase() === UserRole.STUDENT.toLowerCase()) {
      router.push('/');
    }
  }, [userState, router]);

  if (isLoading)
    return (
      <>
        <LinearProgress />
        <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8">
          {Array.from({ length: 15 }).map((user, i) => (
            <UserCardSkeleton key={`${user}-${i}`} />
          ))}
        </main>
      </>
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
      <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8">
        {recommeded?.map((user) => (
          <UserCard key={user.handle} {...user} />
        ))}
      </main>
    </>
  );
}
