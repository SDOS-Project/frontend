import { disciplineDisplayMapping } from '@/types/EngineeringFields';
import { OrganisationType } from '@/types/OrganisationType';
import { UserRole } from '@/types/UserRole';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, Chip, Tooltip } from '@mui/material';
import Link from 'next/link';

function UserCard({
  handle,
  firstName,
  lastName,
  email,
  organisation,
  areasOfInterest,
  imgUrl,
  discipline,
  organisationName,
}) {
  return (
    <Link href={`/user/${handle}`}>
      <div className="w-full h-full shadow-md cursor-pointer bg-paper hover:shadow-lg duration-500 relative rounded-lg">
        <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
        <div className="p-4 pt-6 flex flex-col justify-center items-center gap-3">
          <Avatar className="w-24 h-24" src={imgUrl} />
          <p className="body-xlarge text-center font-semibold">
            {firstName} {lastName}
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4 pb-4">
          {organisation ? (
            <Tooltip title={organisation.name}>
              <div className="flex gap-2 items-center">
                {organisation.type.toLowerCase() ===
                  OrganisationType.ACADEMIC.toLowerCase() ? (
                  <SchoolIcon color="primary" className="body-large" />
                ) : (
                  <CorporateFareIcon color="primary" className="body-large" />
                )}
                <p className="body-normal line-clamp-1">{organisation.name}</p>
              </div>
            </Tooltip>
          ) : (
            <Tooltip title={organisationName}>
              <div className="flex gap-2 items-center">
                {role.toLowerCase() === UserRole.EMPLOYEE.toLowerCase() ? (
                  <CorporateFareIcon color="primary" className="body-large" />
                ) : (
                  <SchoolIcon color="primary" className="body-large" />
                )}
                <p className="body-normal line-clamp-1">{organisationName}</p>
              </div>
            </Tooltip>
          )}
          <div className="flex gap-2 items-center">
            <MenuBookIcon color="primary" className="body-large" />
            <p className="body-normal line-clamp-1">{disciplineDisplayMapping[discipline]}</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-1">
            {areasOfInterest.map((item, i) => {
              if (i > 3) return;
              return (
                <Chip
                  label={item}
                  key={`${item}-${i}`}
                  size="small"
                  className="p-2"
                />
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
