import { Skeleton } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import LinkIcon from '@mui/icons-material/Link';
import { Email } from '@mui/icons-material';

export default function OrganisationCardSkeleton() {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex justify-start items-center gap-2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton className="w-64" />
        </div>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      <div className="flex flex-col gap-2 py-4 px-6">
        <div className="flex gap-2 items-center">
          <Email className="body-small" />
          <Skeleton className="w-4/5" />
        </div>
        <div className="flex gap-2 items-center">
          <RoomIcon className="body-small" />
          <Skeleton className="w-4/5" />
        </div>
        <div className="flex gap-2 items-center">
          <LinkIcon className="body-small" />
          <Skeleton className="w-4/5" />
        </div>
      </div>
    </div>
  );
}
