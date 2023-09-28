'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { UserRole } from '@/types/UserRole';
import { Button } from '@mui/material';

import React from 'react';

function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading } = useGetUserQuery(slug);

  console.log('user', user);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='body-large text-center mt-20'>
      Hi {user?.firstName + ' ' + user?.lastName} Role: {UserRole[user?.role]}
    </div>
  );
}

export default User;
