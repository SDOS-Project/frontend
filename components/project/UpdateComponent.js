import { formatDate } from '@/utils/convertDate';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function UpdateComponent({ user, content, createdAt }) {
  return (
    <div className="flex justify-between items-start gap-3 mb-4">
      <Avatar className="h-8 w-8 body-xsmall">
        {user?.firstName[0] + user?.lastName[0] ?? ''}
      </Avatar>
      <div className="flex flex-col w-full gap-1">
        <Link href={`/user/${user?.handle}`}>
          <p className="body-normal text-primary-dark">
            {user?.firstName + ' ' + user?.lastName ?? ''}
          </p>
        </Link>
        <p className="body-xsmall">{content}</p>
        <p className="body-xsmall text-primary-darkgrey">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default UpdateComponent;
