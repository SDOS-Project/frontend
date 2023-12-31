import ProjectCardsLayout from '@/components/common/ProjectCardsLayout';
import { useGetOrganisationProjectsQuery } from '@/features/organisation/apiSlice';

export default function ProjectsTab({ handle }) {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetOrganisationProjectsQuery(handle);
  return (
    <ProjectCardsLayout
      projects={projects}
      isProjectsLoading={isProjectsLoading}
      grid="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 sm:gap-4"
    />
  );
}
