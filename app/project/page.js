'use client';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectCardSkeleton from '@/components/project/Skeletons/ProjectCardSkeleton';
import { useGetProjectsQuery } from '@/features/project/apiSice';

export default function Projects() {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  console.log('projects', projects);

  return (
    <main className="width-layout-1 padding-layout-1">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-4 my-4">
        {true ? (
          <>
            {Array.from({ length: 15 }).map((project, id) => (
              <ProjectCardSkeleton key={id} />
            ))}
          </>
        ) : (
          <>
            {projects?.map((project) => (
              <ProjectCard key={project.handle} {...project} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
