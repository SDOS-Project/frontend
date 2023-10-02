'use client';
import Filters from '@/components/project/Filters';
import ProjectsGrid from '@/components/project/ProjectsGrid';
import SearchBar from '@/components/project/SearchBar';
import { useGetProjectsQuery } from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { useState } from 'react';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(ProjectStatus.ONGOING);

  if (isProjectsLoading) return <div>Loading...</div>;
  return (
    <main className="mt-20 width-layout-1 p-2">
      <SearchBar
        state={search}
        setState={setSearch}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Filters state={filter} setState={setFilter} />
      <ProjectsGrid />
    </main>
  );
}
