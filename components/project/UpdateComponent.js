import { Avatar } from '@mui/material';
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
            <p className="body-small">{createdAt}</p>
          </div>
          <p className="body-small">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default UpdateComponent;
