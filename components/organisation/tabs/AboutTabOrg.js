import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { Email } from '@mui/icons-material';
import RoomIcon from '@mui/icons-material/Room';
import LinkIcon from '@mui/icons-material/Link';
import Link from 'next/link';

export default function AboutTab({ handle }) {
  const { data: organisation } = useGetOrganisationQuery(handle);
  return (
    <>
      <Link
        href={`mailto:${organisation.email}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 items-center">
          <Email className="body-normal" />
          <p className="body-small">{organisation.email}</p>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <RoomIcon className="body-normal" />
        <p className="body-small">{organisation.address}</p>
      </div>
      <Link href={organisation.ipPolicy} target="_blank">
        <div className="flex gap-2 items-center">
          <LinkIcon className="body-normal" />
          <p className="body-small link line-clamp-1">
            {organisation.ipPolicy}
          </p>
        </div>
      </Link>
    </>
  );
}
