import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { Email } from '@mui/icons-material';
import RoomIcon from '@mui/icons-material/Room';
import LinkIcon from '@mui/icons-material/Link';
import Link from 'next/link';

export default function AboutTab({ handle }) {
  const { data: organisation } = useGetOrganisationQuery(handle);
  return (
    <>
      <div className="w-full flex flex-col gap-2 border-b pb-4">
        <p className="body-large font-medium text-primary-dark">Contact</p>
        <Link href={`mailto:${organisation?.email}`}>
          <div className="flex items-center gap-2">
            <Email className="text-primary-main" />
            <p className="body-small">{organisation?.email}</p>
          </div>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 border-b pb-4">
        <p className="body-large font-medium text-primary-dark">Address</p>
        <div className="flex items-center gap-2">
          <RoomIcon className="text-primary-main" />
          <p className="body-small">{organisation.address}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 border-b pb-4">
        <p className="body-large font-medium text-primary-dark">IP Policy</p>
        <Link href={organisation.ipPolicy} target="_blank">
          <div className="flex items-center gap-2">
            <LinkIcon className="text-primary-main" />
            <p className="body-small">{organisation.ipPolicy}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
