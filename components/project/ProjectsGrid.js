import React from 'react';
import ProjectCard from './ProjectCard';
import { useGetProjectsQuery } from '@/features/project/apiSice';

function ProjectsGrid() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  return (
    <div className="flex flex-wrap w-full gap-6 items-stretch justify-center">
      {projects.map((item, i) => (
        <ProjectCard
          key={i}
          handle={item.handle}
          projectName={'IIITD Thesis'}
          collegeName={'IIITD'}
          companyName={'Meta'}
          projectDesc={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
          }
          status={'On Going'}
        />
      ))}
    </div>
  );
}

export default ProjectsGrid;
