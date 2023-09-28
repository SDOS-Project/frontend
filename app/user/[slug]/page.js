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
    <div className='body-large text-center'>
      Hi {user?.firstName + ' ' + user?.lastName} Role: {UserRole[user?.role]}
      <Button variant='contained' />
    </div>
  );
}

export default User;
