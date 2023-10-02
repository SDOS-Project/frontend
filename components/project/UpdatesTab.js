import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from 'react';
import UpdateComponent from './UpdateComponent';
import UpdatesModal from './UpdatesModal';
import { IconButton } from '@mui/material';

function UpdatesTab() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full">
      <UpdatesModal open={open} handleClose={handleClose} />
      <div className="w-full flex justify-between items-center py-4 px-6 border-b">
        <p className="body-normal">Updates (23)</p>

        <div
          onClick={handleOpen}
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
