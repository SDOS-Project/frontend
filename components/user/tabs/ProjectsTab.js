import ProjectCardsLayout from '@/components/common/ProjectCardsLayout';
import { useGetUserProjectsQuery } from '@/features/user/apiSlice';

export default function ProjectsTab({ handle }) {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetUserProjectsQuery(handle);
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 sm:gap-4">
      <ProjectCardsLayout
        projects={projects}
        isProjectsLoading={isProjectsLoading}
      />
    </div>
  );
}
