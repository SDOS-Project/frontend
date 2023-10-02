import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from 'react';
import UpdateComponent from './UpdateComponent';

function UpdatesTab() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center py-4 px-6 border-b">
        <p className="body-normal">Updates (23)</p>
        <div className="flex justify-end gap-2 items-center text-primary-grey cursor-pointer">
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
