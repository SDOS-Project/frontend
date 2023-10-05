import { Mail } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Link from 'next/link';
import { OrganisationType } from '@/types/OrganisationType';

function UserCard({
  handle,
  firstName,
  lastName,
  email,
  organisation,
  areasOfInterest,
}) {
  return (
    <Link href={`/user/${handle}`}>
      <div className="w-full h-full bg-paper shadow-md">
        <div className="p-4 flex flex-col justify-center items-center border-b gap-3">
          <Avatar className="w-20 h-20" />
          <p className="body-large text-center">
            {firstName} {lastName}
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4 py-2">
          <div className="flex gap-2 items-center">
            <Mail color="primary" className="body-small" />
            <p className="body-small">{email}</p>
          </div>
          <div className="flex gap-2 items-center">
            {organisation.type.toLowerCase() ===
            OrganisationType.ACADEMIC.toLowerCase() ? (
              <SchoolIcon color="primary" className="body-small" />
            ) : (
              <CorporateFareIcon color="primary" className="body-small" />
            )}
            <p className="body-small">{organisation.name}</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {areasOfInterest.map((item, i) => {
              if (i > 5) return;
              return <Chip label={item} key={`${item}-${i}`} />;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
