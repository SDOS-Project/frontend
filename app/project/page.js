'use client';
import ProjectCardsLayout from '@/components/common/ProjectCardsLayout';
import { useGetProjectsQuery } from '@/features/project/apiSice';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  return (
    <main className="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-4">
      <ProjectCardsLayout
        projects={projects}
        isProjectsLoading={isProjectsLoading}
      />
    </main>
  );
}
