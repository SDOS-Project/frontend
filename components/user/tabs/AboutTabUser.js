import { useGetUserQuery } from '@/features/user/apiSlice';
import { Avatar, Chip } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function AboutTabUser({ handle }) {
  const { data: user, isLoading } = useGetUserQuery(handle);
  console.log('user', user);
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Organisation</p>
        <Link href={`/organisation/${user.organisation.handle}`}>
          <div className="flex gap-2 items-center">
            <Avatar src={'org.url'}></Avatar>
            <p className="body-small">{user.organisation.name}</p>
          </div>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Areas Of Interest</p>
        <div className="flex gap-2 items-center">
          {user.areasOfInterest?.map((item, i) => (
            <Chip label={item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutTabUser;
