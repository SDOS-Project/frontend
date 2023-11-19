import {
  useGetProjectConfigQuery,
  useGetUpdatesQuery,
} from '@/features/project/apiSice';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import UpdatesSkeleton from '../Skeletons/UpdatesSkeleton';
import UpdateComponent from '../UpdateComponent';
const AddUpdate = dynamic(() => import('../forms/AddUpdate'), {
  ssr: false,
});

export default function UpdatesTab({ handle }) {
  const { data: projectConfig, isLoading: isProjectConfigLoading } =
    useGetProjectConfigQuery(handle);

  const { data: updates, isLoading } = useGetUpdatesQuery(handle);

  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);

  const handleAddCallback = useCallback(() => {
    setIsAddUpdateOpen(true);
  }, []);

  if (isLoading || isProjectConfigLoading) return <UpdatesSkeleton />;

  return (
    <>
      {(projectConfig?.isAdmin || projectConfig?.isStudent) && (
        <AddUpdate
          handle={handle}
          isDialogOpen={isAddUpdateOpen}
          handleCloseDialog={() => setIsAddUpdateOpen(false)}
        />
      )}
      <div className="w-full flex justify-between items-center py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">
          Updates ({updates.length})
        </p>
        {(projectConfig?.isAdmin || projectConfig?.isStudent) && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleAddCallback()}>
            Add Update
          </Button>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        {updates.length > 0 &&
          updates?.map((update) => (
            <div key={update.createdAt} className="my-2">
              <UpdateComponent key={update.createdAt} {...update} />
            </div>
          ))}
      </div>
    </>
  );
}
