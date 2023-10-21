import { Avatar, Skeleton } from '@mui/material';

export default function ProjectSkeleton() {
  return (
    <div className="width-layout-1 padding-layout-2">
      <div className="bg-paper shadow-md relative">
        <div className="absolute top-0 left-0 bg-gg h-24 sm:h-36 w-full rounded-t-lg z-0"></div>
        <div className="z-50 absolute right-8 top-8 bg-primary-main text-white h-12 w-12 rounded-full"></div>
        <div className="w-full h-[60vh] pt-14 sm:pt-24 z-50">
          <div className="flex justify-start mx-6">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
          <div className="flex justify-between gap-2 items-center mx-6 mt-4">
            <Skeleton className="w-1/3 h-10" />
            <Skeleton className="w-1/3 h-10" />
          </div>
          <div className="border-t flex justify-start gap-2 items-center mx-6 mt-4">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
          <div className="mx-6 mt-4 border-b">
            <Skeleton className="w-1/3 h-10" />
          </div>
          <Skeleton className="w-1/3 h-10 m-6" />
        </div>
      </div>
    </div>
  );
}
