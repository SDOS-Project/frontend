import { Avatar, Tooltip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Link from 'next/link';
import { ProjectStatus } from '@/types/ProjectStatus';
import { OrganisationType } from '@/types/OrganisationType';

export default function ProjectCard({
  handle,
  name,
  organisations,
  description,
  status,
}) {
  return (
    <Link href={`/project/${handle}`}>
      <div className="w-full h-full shadow-md cursor-pointer bg-paper hover:shadow-lg duration-500 relative rounded-lg">
        <div className="z-50 absolute bg-primary-main text-white px-2 py-1 rounded-br-lg body-xsmall">
          {ProjectStatus[status]}
        </div>
        <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
        <div className="z-50 py-6 px-4">
          <div className="w-full flex flex-col justify-center items-center px-5 py-4 gap-3">
            <div className="flex justify-center">
              <Avatar className="w-16 h-16" src={organisations?.[0].imgUrl}>
                {organisations?.[0].name[0]}
              </Avatar>
              <Avatar
                className="w-16 h-16 -ml-3"
                src={organisations?.[1].imgUrl}>
                {organisations?.[1].name[0]}
              </Avatar>
            </div>
            <p className="body-large font-medium text-center capitalize line-clamp-1">
              {name}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {organisations?.length > 0 &&
              organisations?.map((organisation) => (
                <div
                  className="flex items-center justify-start gap-2"
                  key={organisation.handle}>
                  {organisation.type.toLowerCase() ==
                  OrganisationType.ACADEMIC.toLowerCase() ? (
                    <SchoolIcon className="body-large" color="primary" />
                  ) : (
                    <CorporateFareIcon className="body-large" color="primary" />
                  )}
                  <Tooltip title={organisation.name}>
                    <p className="body-normal line-clamp-1">
                      {organisation.name}
                    </p>
                  </Tooltip>
                </div>
              ))}
            <p className="body-small line-clamp-3 text-primary-darkgrey">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
