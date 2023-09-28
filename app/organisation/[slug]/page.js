'use client';
import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { OrganisationType } from '@/types/OrganisationType';

function Organisation({ params }) {
  const { slug } = params;

  const { data: organisation, isLoading } = useGetOrganisationQuery(slug);

  console.log('organisation', organisation);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='width-layout-1 body-large text-center mt-20'>
      Hi {organisation?.name} Role: {OrganisationType[organisation?.type]}
    </div>
  );
}

export default Organisation;
