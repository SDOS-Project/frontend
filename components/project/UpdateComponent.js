import { Edit } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react';

function UpdateComponent() {
  return (
    <div className="my-4">
      <div className="flex justify-between items-start gap-3">
        <Avatar
          sx={{ height: '1.75rem', width: '1.75rem', margin: '8px 0px' }}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="body-small">Mr. Mark Zuckerberg</p>
            <div className="flex justify-end items-center gap-2">
              <p className="body-small">22nd September 2023 at 5:03PM</p>
              <IconButton>
                <Edit className="body-small" />
              </IconButton>
            </div>
          </div>
          <p className="body-xsmall text-primary-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdateComponent;
