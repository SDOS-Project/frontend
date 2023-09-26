'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import React from 'react';

function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading, error } = useGetUserQuery(slug);

  console.log(user, isLoading, error);
  return <div>User {slug}</div>;
}

export default User;
