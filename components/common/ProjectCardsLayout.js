import NullViewComponent from '../null-views/NullView';
import ProjectCard from '../project/ProjectCard';
import ProjectCardSkeleton from '../project/Skeletons/ProjectCardSkeleton';

export default function ProjectCardsLayout({
  projects,
  isProjectsLoading,
  grid = 'cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8',
}) {
  if (!isProjectsLoading && projects.length === 0) {
    return (
      <NullViewComponent
        imgSrc="/assets/images/project/empty.svg"
        heading="No Projects Found"
        desc="You haven't created any projects yet."
      />
    );
  }

  return (
    <main className={grid}>
      {isProjectsLoading
        ? Array.from({ length: 15 }).map((project, i) => (
            <ProjectCardSkeleton key={`${project}-${i}`} />
          ))
        : projects?.map((project) => (
            <ProjectCard key={project.handle} {...project} />
          ))}
    </main>
  );
}
