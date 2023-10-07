import { Avatar, Skeleton } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import LinkIcon from '@mui/icons-material/Link';
import { Email } from '@mui/icons-material';

export default function OrganisationCardSkeleton() {
  return (
    <div className="w-full bg-white shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative rounded-lg">
      <div className="z-50 absolute bg-primary-main text-white px-4 py-2 rounded-br-lg body-xsmall h-8 w-12"></div>
      <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
      <div className="w-full z-50">
        <div className="w-full pt-10 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Avatar className="h-16 w-16"></Avatar>
            <Skeleton className="w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-4 px-6">
          <div className="flex gap-2 items-center">
            <Email className="body-large " />
            <Skeleton className="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <RoomIcon className="body-large " />
            <Skeleton className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
