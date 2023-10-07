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
      <div className="w-full bg-white shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative rounded-lg">
        <div className="z-50 absolute bg-primary-main text-white px-4 py-2 rounded-br-lg body-xsmall">
          {type.toLowerCase() === OrganisationType.ACADEMIC.toLowerCase() ? (
            <SchoolIcon className="body-large" />
          ) : (
            <CorporateFareIcon className="body-large" />
          )}
        </div>
        <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
        <div className="w-full z-50">
          <div className="w-full pt-10 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <Avatar className="h-16 w-16" src={logoUrl ?? ''}>
                {name[0]}
              </Avatar>
              <Tooltip title={name}>
                <p className="body-xlarge text-center capitalize font-semibold line-clamp-1">
                  {name}
                </p>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-2 py-4 px-6">
            <div className="flex gap-2 items-center">
              <Email className="body-large" />
              <p className="body-normal">{email}</p>
            </div>
            <div className="flex gap-2 items-center">
              <RoomIcon className="body-large" />
              <p className="body-normal">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrganisationCard;
