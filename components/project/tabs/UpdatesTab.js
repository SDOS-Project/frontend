import { useCallback, useState } from 'react';
import UpdateComponent from '../UpdateComponent';
import AddUpdate from '../forms/AddUpdate';
import { useGetUpdatesQuery } from '@/features/project/apiSice';
import { Button } from '@mui/material';

export default function UpdatesTab({ handle }) {
  const { data: updates, isLoading } = useGetUpdatesQuery(handle);

  console.log('updates', updates);

  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);

  const handleAddCallback = useCallback(() => {
    setIsAddUpdateOpen(true);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <AddUpdate
        handle={handle}
        isDialogOpen={isAddUpdateOpen}
        handleCloseDialog={() => setIsAddUpdateOpen(false)}
      />
      <div className="w-full flex justify-between items-center py-4 px-6 border-b">
        <p className="body-normal">Updates ({updates.length})</p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAddCallback()}>
          Add Update
        </Button>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          updates.length > 0 &&
          updates?.map((update) => (
            <UpdateComponent key={update.createdAt} {...update} />
          ))
        )}
      </div>
    </>
  );
}
