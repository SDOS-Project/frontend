import NullViewComponent from '../null-views/NullView';
import ProjectCard from '../project/ProjectCard';
import ProjectCardSkeleton from '../project/Skeletons/ProjectCardSkeleton';

export default function ProjectCardsLayout({
  projects,
  isProjectsLoading,
  grid,
}) {
  return (
    <>
      {isProjectsLoading ? (
        <main
          className={
            grid ??
            'cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8'
          }>
          {Array.from({ length: 15 }).map((project, i) => (
            <ProjectCardSkeleton key={`${project}-${i}`} />
          ))}
        </main>
      ) : projects.length > 0 ? (
        <main
          className={
            grid ??
            'cards-grid-layout padding-layout-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8'
          }>
          {projects?.map((project) => (
            <ProjectCard key={project.handle} {...project} />
          ))}
        </main>
      ) : (
        <NullViewComponent
          imgSrc="/assets/images/project/empty.svg"
          heading="No Projects Found"
          desc="You haven't created any projects yet."
        />
      )}
    </>
  );
}
