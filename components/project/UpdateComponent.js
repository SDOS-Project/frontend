import { Edit } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react';

function UpdateComponent({ user, content, createdAt }) {
  return (
    <div className="my-4">
      <div className="flex justify-between items-start gap-3">
        <Avatar
          sx={{ height: '1.75rem', width: '1.75rem', margin: '8px 0px' }}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="body-small">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex justify-end items-center gap-2">
              <p className="body-small">{createdAt}</p>
              <IconButton>
                <Edit className="body-small" />
              </IconButton>
            </div>
          </div>
          <p className="body-small text-primary-grey">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default UpdateComponent;
