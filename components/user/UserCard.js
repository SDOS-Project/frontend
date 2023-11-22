import { OrganisationType } from '@/types/OrganisationType';
import { Mail } from '@mui/icons-material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, Chip } from '@mui/material';
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
          <div className="flex gap-2 items-center">
            <Mail color="primary" className="body-large" />
            <p className="body-normal">{email}</p>
          </div>
          <div className="flex gap-2 items-center">
            {organisation.type.toLowerCase() ===
              OrganisationType.ACADEMIC.toLowerCase() ? (
              <SchoolIcon color="primary" className="body-large" />
            ) : (
              <CorporateFareIcon color="primary" className="body-large" />
            )}
            <p className="body-normal">{organisation.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MenuBookIcon color="primary" className="body-large" />
            <p className="body-normal">{discipline}</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {areasOfInterest.map((item, i) => {
              if (i > 5) return;
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
