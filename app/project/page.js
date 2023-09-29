'use client';
import { useGetProjectsQuery } from '@/features/project/apiSice';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  if (isProjectsLoading) return <div>Loading...</div>;
  return <div className='mt-20'>Projects</div>;
}
