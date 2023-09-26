'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { auth } from '@/firebase-config';
import React from 'react';

function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading } = useGetUserQuery(slug);

  console.log('user', user);
  console.log('AUTH', auth.currentUser);
  if (isLoading) return <div>Loading...</div>;
  return <div>Hi {user?.firstName + ' ' + user?.lastName}</div>;
}

export default User;
