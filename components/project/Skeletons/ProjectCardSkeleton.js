import { Avatar, Skeleton } from '@mui/material';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export default function ProjectCardSkeleton() {
  return (
    <div className="w-full shadow-lg rounded-sm">
      <div className="w-full flex justify-between items-center px-5 py-4 border-b">
        <Skeleton className="w-1/3" />
        <div className="flex justify-end">
          <Avatar />
          <Avatar />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full px-5 py-4">
        <div className="flex items-center justify-start gap-2">
          <SchoolIcon className="body-xsmall" />
          <Skeleton className="w-1/4" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <CorporateFareIcon className="body-xsmall" />
          <Skeleton className="w-1/4" />
        </div>
        <Skeleton />
      </div>
    </div>
  );
}
