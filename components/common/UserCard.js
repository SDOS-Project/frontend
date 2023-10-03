import { Mail } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Link from 'next/link';
import { OrganisationType } from '@/types/OrganisationType';

function UserCard() {
  return (
    <div className="w-64 bg-paper shadow-md">
      <Link href={`/user/${user.handle}`}>
        <div className="p-4 flex flex-col justify-center items-center border-b gap-3">
          <Avatar sx={{ width: '72px', height: '72px' }} />
          <p className="body-large text-center">{user.name}</p>
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-4">
        <Link href={`mailto:${user.email}`}>
          <div className="flex gap-2 items-center">
            <Mail className="body-normal" />
            <p className="body-normal">{user.email}</p>
          </div>
        </Link>
        <Link href={`/organisation/${user.organisation.handle}`}>
          <div className="flex gap-2 items-center">
            {user.organisation.type.toLowerCase() ===
            OrganisationType.ACADEMIC.toLowerCase() ? (
              <SchoolIcon className="body-normal" />
            ) : (
              <CorporateFareIcon className="body-normal" />
            )}
            <p className="body-normal">{user.organisation.name}</p>
          </div>
        </Link>
        <div className="flex gap-2 items-center flex-wrap">
          {user.areasOfInterest.map((item, i) => (
            <Chip label={item} color="primary" key={`${item}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
