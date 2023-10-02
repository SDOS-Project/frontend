import { useGetProjectsQuery } from '@/features/project/apiSice';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { Avatar, Chip } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ProjectCard from '../project/ProjectCard';
import ProjectCardSkeleton from '../project/Skeletons/ProjectCardSkeleton';

function ProjectsTab({ handle }) {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  if (isProjectsLoading) {
    return (
      <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4 my-4">
        {Array.from({ length: 15 }).map((_, id) => (
          <ProjectCardSkeleton key={id} />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4 my-4">
      {projects?.map((project) => (
        <ProjectCard key={project.handle} {...project} />
      ))}
    </div>
  );
}

export default ProjectsTab;
