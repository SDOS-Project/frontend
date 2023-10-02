import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import React from 'react';
import TeamMember from '@/components/common/TeamMember';

function TeamTabOrg({ handle }) {
  const { data: users, isLoading } = useGetOrganisationUsersQuery(handle);

  console.log('users', users);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full p-4 flex flex-col gap-2">
      {users?.map((user) => (
        <TeamMember key={user.handle} {...user} />
      ))}
    </div>
  );
}

export default TeamTabOrg;
