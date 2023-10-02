import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import React from 'react';
import TeamMember from '@/components/common/TeamMember';

function TeamTabOrg({ handle }) {
  const { data: users, isLoading } = useGetOrganisationUsersQuery(handle);

  console.log('users', users);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {users?.map((user) => (
        <TeamMember key={user.handle} {...user} />
      ))}
    </>
  );
}

export default TeamTabOrg;
