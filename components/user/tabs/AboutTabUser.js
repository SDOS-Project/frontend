import { useGetUserQuery } from '@/features/user/apiSlice';
import { Email } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function AboutTabUser({ handle }) {
  const { data: user, isLoading } = useGetUserQuery(handle);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">
          Areas Of Interest
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          {user?.areasOfInterest?.map((item, i) => (
            <Chip label={item} key={`${item}-${i}`} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">Contact</p>
        <Link href={`mailto:${user?.email}`}>
          <div className="flex items-center gap-2">
            <Email className="text-primary-main" />
            <p className="body-small">{user?.email}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AboutTabUser;
