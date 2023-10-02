'use client';
import ProjectsGrid from '@/components/project/ProjectsGrid';
import { useGetProjectsQuery } from '@/features/project/apiSice';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  if (isProjectsLoading) return <div>Loading...</div>;
  return (
    <main className="mt-20 width-layout-1 p-2">
      <ProjectsGrid projects={projects} />
    </main>
  );
}
