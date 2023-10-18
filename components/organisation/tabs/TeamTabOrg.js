import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import { useMemo } from 'react';
import TeamMember from '@/components/common/TeamMember';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/authSlice';

export default function TeamTabOrg({ handle }) {
  const userState = useSelector(selectUser);
  const canRemove = useMemo(
    () => userState?.handle === handle,
    [userState, handle]
  );

  const { data: users, isLoading } = useGetOrganisationUsersQuery(handle);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {users?.map((user) => (
        <TeamMember key={user.handle} canRemove={canRemove} {...user} />
      ))}
    </>
  );
}
