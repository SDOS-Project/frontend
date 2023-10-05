import { formatDate } from '@/utils/convertDate';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function UpdateComponent({ user, content, createdAt }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <Avatar className="w-10 h-10" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-3 items-center mb-2">
          <Link href={`/user/${user?.handle}`}>
            <p className="body-small text-primary-light ">
              {user?.firstName} {user?.lastName}
            </p>
          </Link>
          <p className="body-small text-primary-light">
            {formatDate(createdAt)}
          </p>
        </div>
        <p className="body-small">{content}</p>
      </div>
    </div>
  );
}

export default UpdateComponent;
