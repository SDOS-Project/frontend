import TeamMember from '@/components/common/TeamMember';
import NullView from '@/components/null-views/NullView';
import { selectUser } from '@/features/auth/authSlice';
import { useGetOrganisationStudentsQuery } from '@/features/organisation/apiSlice';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import RemoveUser from '../forms/RemoveUser';
import CoordinatorSkeleton from '../skeletons/CoordinatorSkeleton';

export default function StudentsTab({ handle }) {
  const userState = useSelector(selectUser);
  const canRemove = useMemo(
    () => userState?.handle === handle,
    [userState, handle]
  );

  const { data: students, isLoading } = useGetOrganisationStudentsQuery(handle);

  const [isRemoveUserOpen, setIsRemoveUserOpen] = useState(false);
  const [userHandle, setUserHandle] = useState(null);
  const handleRemoveUser = useCallback((userHandle) => {
    setIsRemoveUserOpen(true);
    setUserHandle(userHandle);
  }, []);

  if (isLoading) return <CoordinatorSkeleton />;

  return (
    <>
      {students.length > 0 ? (
        students?.map((student) => (
          <TeamMember
            key={`${student.email}-${student.name}`}
            canRemove={canRemove}
            handleRemoveUser={handleRemoveUser}
            {...student}
          />
        ))
      ) : (
        <NullView
          imgSrc={'/assets/images/organisation/empty.svg'}
          heading={'No Students Found'}
          desc={'There are no students with this organisation yet.'}
        />
      )}
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
