import { Avatar, Chip } from '@mui/material';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { useRouter } from 'next/navigation';

function ProjectCard({
  handle,
  projectName,
  collegeName,
  companyName,
  projectDesc,
  status,
}) {
  const router = useRouter();
  return (
    <div
      className="w-full md:w-96 shadow-lg rounded-sm cursor-pointer hover:shadow-xl bg-paper"
      onClick={() => router.push(`/project/${handle}`)}>
      <div className="w-full flex justify-between items-center px-5 py-4 border-b">
        <p className="body-normal">{projectName}</p>
        <div className="flex justify-end">
          <Avatar alt="IIITD" sx={{ width: 30, height: 30 }} />
          <Avatar
            alt="FB"
            sx={{ width: 30, height: 30, marginLeft: '-12px' }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full px-5 py-4">
        <div className="flex items-center justify-start gap-2">
          <SchoolIcon className="body-xsmall" />
          <p className="body-xsmall">{collegeName}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <CorporateFareIcon className="body-xsmall" />
          <p className="body-xsmall">{companyName}</p>
        </div>
        <Chip color="primary" label={status} className="w-fit" />
        <p className="body-xsmall">{projectDesc}</p>
      </div>
    </div>
  );
}

export default ProjectCard;