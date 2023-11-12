import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import { useCallback, useMemo, useState } from 'react';
import TeamMember from '@/components/common/TeamMember';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/authSlice';
import RemoveUser from '../forms/RemoveUser';

export default function TeamTabOrg({ handle }) {
  const userState = useSelector(selectUser);
  const canRemove = useMemo(
    () => userState?.handle === handle,
    [userState, handle]
  );

  const { data: users, isLoading } = useGetOrganisationUsersQuery(handle);

  const [isRemoveUserOpen, setIsRemoveUserOpen] = useState(false);
  const [userHandle, setUserHandle] = useState(null);
  const handleRemoveUser = useCallback((userHandle) => {
    setIsRemoveUserOpen(true);
    setUserHandle(userHandle);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {users?.map((user) => (
        <TeamMember
          key={user.handle}
          canRemove={canRemove}
          handleRemoveUser={handleRemoveUser}
          {...user}
        />
      ))}
      {canRemove && (
        <RemoveUser
          userHandle={userHandle}
          isDialogOpen={isRemoveUserOpen}
          handleCloseDialog={() => setIsRemoveUserOpen(false)}
        />
      )}
    </>
  );
}
