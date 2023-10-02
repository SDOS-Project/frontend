import ProjectCardSkeleton from '../project/skeletons/ProjectCardSkeleton';
import ProjectCard from '../project/ProjectCard';

export default function ProjectCardsLayout({ projects, isProjectsLoading }) {
  return (
    <>
      {isProjectsLoading ? (
        <>
          {Array.from({ length: 15 }).map((_, id) => (
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
    </>
  );
}
