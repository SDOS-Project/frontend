'use client';

import { useGetProjectsQuery } from '@/features/project/apiSice';

function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  if (isProjectsLoading) return <div>Loading...</div>;
  return <div>Projects</div>;
}

export default Projects;
