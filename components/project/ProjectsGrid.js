import React from 'react';
import ProjectCard from './ProjectCard';
import { ProjectStatus } from '@/types/ProjectStatus';

function ProjectsGrid({ projects }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4 my-4">
      {projects?.map((project) => (
        <ProjectCard
          key={project.handle}
          handle={project.handle}
          projectName={project.name}
          collegeName={'IIITD'}
          companyName={'Meta'}
          projectDesc={project.description}
          status={ProjectStatus[project.status]}
        />
      ))}
    </div>
  );
}

export default ProjectsGrid;
