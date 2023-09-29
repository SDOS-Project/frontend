'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { UserRole } from '@/types/UserRole';

export default function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading } = useGetUserQuery(slug);

  console.log('user', user);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='width-layout-1 body-large text-center mt-20'>
      Hi {user?.firstName + ' ' + user?.lastName} Role: {UserRole[user?.role]}
    </div>
  );
}
