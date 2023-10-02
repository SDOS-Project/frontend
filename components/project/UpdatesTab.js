import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useCallback, useState } from 'react';
import UpdateComponent from './UpdateComponent';
import AddUpdate from './forms/AddUpdate';

function UpdatesTab({ handle }) {
  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);

  const handleAddCallback = useCallback(() => {
    setIsAddUpdateOpen(true);
  }, []);

  return (
    <div className="w-full">
      <AddUpdate
        handle={handle}
        isDialogOpen={isAddUpdateOpen}
        handleCloseDialog={() => setIsAddUpdateOpen(false)}
      />
      <div className="w-full flex justify-between items-center py-4 px-6 border-b">
        <p className="body-normal">Updates (23)</p>
        <div
          onClick={() => handleAddCallback()}
          className="flex justify-end gap-2 items-center text-primary-grey cursor-pointer">
          <p className="body-small">Add Updates</p>
          <AddBoxIcon />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <UpdateComponent />
        <UpdateComponent />
      </div>
    </div>
  );
}

export default UpdatesTab;
