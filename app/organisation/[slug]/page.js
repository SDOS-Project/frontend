'use client';
import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Tab } from '@mui/material';
import { useMemo, useState } from 'react';
import AboutTabOrg from '@/components/organisation/tabs/AboutTabOrg';
import dynamic from 'next/dynamic';
const TeamTabOrg = dynamic(
  () => import('@/components/organisation/tabs/TeamTabOrg'),
  {
    ssr: false,
  }
);

export default function Organisation({ params }) {
  const { slug } = params;

  const { data: organisation, isLoading } = useGetOrganisationQuery(slug);
  const [tabValue, setTabValue] = useState('About');

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const tabs = useMemo(
    () => [
      {
        label: 'About',
        component: <AboutTabOrg handle={slug} />,
      },
      {
        label: 'Faculty',
        component: <TeamTabOrg handle={slug} />,
      },
    ],
    [slug]
  );

  console.log('organisation', organisation);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="width-layout-1 padding-layout-1 mt-20 bg-paper shadow-md">
      <div className="flex justify-start gap-2 items-center py-4 px-6 border-b">
        <Avatar src={organisation.logoSrc}>{organisation.name[0]}</Avatar>
        <p className="body-xlarge">{organisation.name}</p>
      </div>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Tabs">
            {tabs.map((tab) => (
              <Tab
                key={`${tab.label}-${tab.value}`}
                label={tab.label}
                value={tab.label}
                className="body-normal"
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab) => (
          <TabPanel
            key={`${tab.label}-${tab.value}`}
            value={tab.label}
            sx={{ padding: 0 }}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
