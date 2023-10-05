import { Email } from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import SchoolIcon from '@mui/icons-material/School';
import { OrganisationType } from '@/types/OrganisationType';
import Link from 'next/link';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

function OrganisationCard({ address, email, handle, logoUrl, name, type }) {
  return (
    <Link href={`/organisation/${handle}`}>
      <div className="w-full bg-white shadow-md cursor-pointer hover:shadow-lg overflow-hidden">
        <div className="w-full py-4 px-6 flex justify-between items-center border-b">
          <div className="flex justify-start items-center gap-2">
            <Avatar className="body-xsmall" src={logoUrl ?? ''}>
              {name[0]}
            </Avatar>
            <Tooltip title={name}>
              <p className="body-normal line-clamp-1">{name}</p>
            </Tooltip>
          </div>
          {type.toLowerCase() === OrganisationType.ACADEMIC.toLowerCase() ? (
            <SchoolIcon className="body-xlarge" />
          ) : (
            <CorporateFareIcon className="body-xlarge" />
          )}
        </div>
        <div className="flex flex-col gap-2 py-4 px-6">
          <div className="flex gap-2 items-center">
            <Email className="body-small" />
            <p className="body-xsmall">{email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <RoomIcon className="body-small" />
            <p className="body-xsmall">{address}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrganisationCard;
