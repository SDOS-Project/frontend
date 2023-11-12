import TeamMember from '@/components/common/TeamMember';
import NullView from '@/components/null-views/NullView';
import { selectUser } from '@/features/auth/authSlice';
import { useGetOrganisationUsersQuery } from '@/features/organisation/apiSlice';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import RemoveUser from '../forms/RemoveUser';
import CoordinatorSkeleton from '../skeletons/CoordinatorSkeleton';

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

  if (isLoading) return <CoordinatorSkeleton />;

  return (
    <>
      {users.length > 0 ? users?.map((user) => (
        <TeamMember
          key={user.handle}
          canRemove={canRemove}
          handleRemoveUser={handleRemoveUser}
          {...user}
        />
      )) : <NullView
        imgSrc={'/assets/images/organisation/empty.svg'}
        heading={'No Coordinators Found'}
        desc={'There are no coordinators with this organisation yet.'}
      />}
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
