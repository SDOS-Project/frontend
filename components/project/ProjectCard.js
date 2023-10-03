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
      <div className="w-full shadow-md rounded-sm cursor-pointer bg-paper hover:shadow-lg duration-500">
        <div className="w-full flex justify-between items-center px-5 py-4 border-b">
          <p className="body-normal">{name}</p>
          <div className="flex justify-end">
            <Avatar className="w-12 h-12" src={organisations[0].logoUrl} />
            <Avatar
              className="w-12 h-12 -ml-3"
              src={organisations[1].logoUrl}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full px-5 py-4">
          {organisations.map((org) => (
            <Link href={`/organisation/${org.handle}`} key={org.handle}>
              <div className="flex items-center justify-start gap-2">
                {org.type.toLowerCase() ==
                OrganisationType.ACADEMIC.toLowerCase() ? (
                  <SchoolIcon className="body-normal" />
                ) : (
                  <CorporateFareIcon className="body-normal" />
                )}
                <p className="body-xsmall">{org.name}</p>
              </div>
            </Link>
          ))}
          <Chip
            color="primary"
            label={ProjectStatus[status]}
            className="w-fit"
          />
          <p className="body-xsmall line-clamp-3 text-primary-light">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
