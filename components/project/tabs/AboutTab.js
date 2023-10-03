import TeamMember from '@/components/common/TeamMember';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { Edit } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';

export default function AboutTab({ handle }) {
  const { data: project } = useGetProjectQuery(handle);
  return (
    <>
      <div className="w-full flex justify-between items-start py-4 px-6 border-b">
        <div className="flex flex-col gap-2">
          <p className="body-large">Status</p>
          <Chip label={ProjectStatus[project.status]} color="primary" />
        </div>
        <div className="flex justify-end gap-2 items-center text-primary-light cursor-pointer">
          <IconButton>
            <Edit />
          </IconButton>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Team</p>
        {project.users.map((user) => (
          <TeamMember key={user.handle} {...user} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Description</p>
        <p className="body-small">{project.description}</p>
      </div>
    </>
  );
}
