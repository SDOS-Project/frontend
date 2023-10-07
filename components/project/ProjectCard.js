import { Avatar, Chip } from '@mui/material';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Link from 'next/link';
import { ProjectStatus } from '@/types/ProjectStatus';
import { OrganisationType } from '@/types/OrganisationType';

function ProjectCard({ handle, name, organisations, description, status }) {
  return (
    <Link href={`/project/${handle}`}>
      <div className="w-full h-full shadow-md rounded-sm cursor-pointer bg-paper hover:shadow-lg duration-500 relative rounded-lg">
        <div className="z-50 absolute bg-primary-main text-white px-2 py-1 rounded-br-lg body-xsmall">
          {ProjectStatus[status]}
        </div>
        <div className="absolute top-0 left-0 bg-gg h-20 w-full rounded-t-lg"></div>
        <div className="z-50 py-6 px-4">
          <div className="w-full flex flex-col justify-center items-center px-5 py-4 gap-3">
            <div className="flex justify-center">
              <Avatar className="w-16 h-16" src={organisations[0].logoUrl} />
              <Avatar
                className="w-16 h-16 -ml-3"
                src={organisations[1].logoUrl}
              />
            </div>
            <p className="body-2xlarge font-semibold">{name}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {organisations.map((org) => (
              <div className="flex items-center justify-start gap-2">
                {org.type.toLowerCase() ==
                OrganisationType.ACADEMIC.toLowerCase() ? (
                  <SchoolIcon className="body-large" />
                ) : (
                  <CorporateFareIcon className="body-large" />
                )}
                <p className="body-normal">{org.name}</p>
              </div>
            ))}

            <p className="body-xsmall line-clamp-3 ">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
