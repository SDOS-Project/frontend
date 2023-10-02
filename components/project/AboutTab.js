import { useGetProjectQuery } from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { Edit, Mail } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import Link from 'next/link';

export default function AboutTab({ handle }) {
  const { data: project } = useGetProjectQuery(handle);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start py-4 px-6 border-b">
        <div className="flex flex-col gap-2">
          <p className="body-large">Status</p>
          <Chip label={ProjectStatus[project.status]} color="primary" />
        </div>
        <div className="flex justify-end gap-2 items-center text-primary-grey cursor-pointer">
          <p className="body-small">Edit Status</p>
          <Edit />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Team</p>
        {project.users.map((item, i) => (
          <div className="flex justify-between items-center" key={i}>
            <Link href={`/user/${item.handle}`}>
              <div className="flex justify-start items-center gap-2">
                <Avatar className="w-10 h-10" />
                <p className="body-small">
                  {item.firstName + ' ' + item.lastName}
                </p>
              </div>
            </Link>
            <Link href={`mailto:${item.email}`}>
              <div className="flex items-center justify-end gap-2">
                <Mail />
                <p className="body-small">{item.email}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Description</p>
        <p className="body-small">{project.description}</p>
      </div>
    </div>
  );
}
