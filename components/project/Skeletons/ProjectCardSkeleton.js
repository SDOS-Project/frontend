import { Skeleton } from '@mui/material';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export default function ProjectCardSkeleton() {
  return (
    <div className="w-full h-full shadow-md rounded-sm cursor-pointer bg-paper hover:shadow-lg duration-500 relative rounded-lg">
      <div className="z-50 absolute bg-primary-main text-white px-2 py-1 rounded-br-lg body-xsmall w-1/4 h-6"></div>
      <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
      <div className="z-50 py-6 px-4">
        <div className="w-full flex flex-col justify-center items-center px-5 py-4 gap-3">
          <div className="flex justify-center">
            <Skeleton variant="circular" className="w-16 h-16" />
            <Skeleton variant="circular" className="w-16 h-16 -ml-3" />
          </div>
          <Skeleton className="w-1/3" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          {[1, 2].map((org) => (
            <div className="flex items-center justify-start gap-2">
              {org === 1 ? (
                <SchoolIcon className="body-large" />
              ) : (
                <CorporateFareIcon className="body-large" />
              )}
              <Skeleton className="w-2/3" />
            </div>
          ))}
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
        </div>
      </div>
    </div>
  );
}
