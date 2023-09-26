'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { UserRole } from '@/types/UserRole';

import React from 'react';

function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading } = useGetUserQuery(slug);

  console.log('user', user);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      Hi {user?.firstName + ' ' + user?.lastName} Role: {UserRole[user?.role]}
    </div>
  );
}

export default User;
