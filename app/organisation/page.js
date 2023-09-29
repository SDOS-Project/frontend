'use client';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';

export default function Organisations() {
  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  console.log('organisations', organisations);

  return <div>Organisations</div>;
}
