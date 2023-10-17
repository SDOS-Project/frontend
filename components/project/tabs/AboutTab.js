import TeamMember from '@/components/common/TeamMember';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { Avatar } from '@mui/material';
import Link from 'next/link';

export default function AboutTab({ handle }) {
  const { data: project } = useGetProjectQuery(handle);
  return (
    <>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b overflow-clip">
        <p className="body-large font-medium text-primary-dark">Description</p>
        <p className="body-small">{project.description}</p>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">Team</p>
        {project.users.map((user) => (
          <TeamMember key={user.handle} {...user} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">
          Organisations
        </p>
        {project.organisations.map((organisation) => (
          <Link
            href={`/organisation/${organisation?.handle}`}
            key={organisation.handle}>
            <div className="flex gap-2 items-center">
              <Avatar
                src={organisation?.imgUrl}
                className="h-8 w-8 sm:h-10 sm:w-10"></Avatar>
              <p className="body-small">{organisation?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
