'use client';
import { useGetProjectQuery } from '@/features/project/apiSice';

function Project({ params }) {
  const { slug } = params;

  const { data: project, isLoading } = useGetProjectQuery(slug);

  console.log('project', project);

  if (isLoading) return <div>Loading...</div>;
  return <div className='mt-20'>Project handle: {slug}</div>;
}

export default Project;
