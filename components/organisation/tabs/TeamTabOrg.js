import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import { Avatar } from '@mui/material';
import React from 'react';
import { Email } from '@mui/icons-material';
import Link from 'next/link';

function TeamTabOrg({ handle }) {
  const { data: users, isLoading } = useGetOrganisationUsersQuery(handle);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <Link href="/">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar />
            <p>Avi Vashishta</p>
          </div>
          <Link
            href={`mailto:${users?.[0].email}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2 items-center">
              <Email className="body-normal" />
              <p className="body-small">{users?.[0].email}</p>
            </div>
          </Link>
        </div>
      </Link>
    </div>
  );
}

export default TeamTabOrg;
