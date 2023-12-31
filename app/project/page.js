'use client';
import ProjectCardsLayout from '@/components/common/ProjectCardsLayout';
import { useGetProjectsQuery } from '@/features/project/apiSice';
import { LinearProgress } from '@mui/material';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  return (
    <>
      {isProjectsLoading && <LinearProgress />}
      <ProjectCardsLayout
        projects={projects}
        isProjectsLoading={isProjectsLoading}
        grid="cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8"
      />
    </>
  );
}
