import TeamMember from '@/components/common/TeamMember';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { ProjectLocation } from '@/types/ProjectLocation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, Tooltip } from '@mui/material';
import { format } from 'date-fns';
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
        <p className="body-large font-medium text-primary-dark">Students</p>
        {project.students.map((user) => (
          <TeamMember key={user.handle} {...user} isStudent={true} />
        ))}
      </div>
      {project.organisations && project.organisations.length > 0 ? (
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
      ) : (
        <></>
      )}
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large font-medium text-primary-dark">More Info</p>

        <Tooltip title="Project Location" placement="left-start">
          <div className="flex justify-start items-center gap-2">
            <LocationOnIcon className="body-normal text-primary-dark" />
            <p className="body-small">{ProjectLocation[project.location]}</p>
          </div>
        </Tooltip>

        <Tooltip title="Project Duration" placement="left-start">
          <div className="flex justify-start items-center gap-2">
            <CalendarTodayIcon className="body-normal text-primary-dark" />
            <p className="body-small">
              {format(new Date(project.startDate), 'dd MMM yyyy')} to{' '}
              {format(new Date(project.endDate), 'dd MMM yyyy')}
            </p>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
