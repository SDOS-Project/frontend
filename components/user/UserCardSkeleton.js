import { Mail } from '@mui/icons-material';
import { Avatar, Chip, Skeleton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function UserCardSkeleton() {
  return (
    <div className="w-full h-full shadow-md cursor-pointer bg-paper hover:shadow-lg duration-500 relative rounded-lg">
      <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
      <div className="p-4 pt-6 flex flex-col justify-center items-center gap-3">
        <Avatar className="w-24 h-24" />
        <Skeleton className="w-1/2 h-10" />
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <div className="flex gap-2 items-center">
          <Mail color="primary" className="body-large" />
          <Skeleton className="w-3/4 h-8" />
        </div>
        <div className="flex gap-2 items-center">
          <SchoolIcon color="primary" className="body-large" />
          <Skeleton className="w-3/4 h-8" />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {[1, 2, 3, 4, 5].map((item, i) => {
            return (
              <Chip
                label={''}
                key={`${item}-${i}`}
                size="small"
                className="w-3/4"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
