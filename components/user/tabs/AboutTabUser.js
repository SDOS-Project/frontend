import { useGetUserQuery } from '@/features/user/apiSlice';
import { Email } from '@mui/icons-material';
import { Chip } from '@mui/material';
import Link from 'next/link';

export default function AboutTabUser({ handle }) {
  const { data: user } = useGetUserQuery(handle);
  return (
    <>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">
          Areas Of Interest
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          {user?.areasOfInterest?.map((item, i) => (
            <Chip label={item} key={`${item}-${i}`} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">Contact</p>
        <div className="flex items-center gap-2">
          <Email className="text-primary-main" />
          <Link href={`mailto:${user?.email}`}>
            <p className="body-small">{user?.email}</p>
          </Link>
        </div>
      </div>
    </>
  );
}
