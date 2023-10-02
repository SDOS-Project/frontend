'use client';
import AboutTab from '@/components/project/tabs/AboutTab';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Chip, Tab } from '@mui/material';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
const UpdatesTab = dynamic(
  () => import('@/components/project/tabs/UpdatesTab'),
  {
    ssr: false,
  }
);

export default function Project({ params }) {
  const { slug } = params;

  const { data: project, isLoading } = useGetProjectQuery(slug);

  const [tabValue, setTabValue] = useState('About');
  console.log('project', project);

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const tabs = useMemo(
    () => [
      {
        label: 'About',
        component: <AboutTab handle={slug} />,
      },
      {
        label: 'Updates',
        component: <UpdatesTab handle={slug} />,
      },
    ],
    [slug]
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="width-layout-1 bg-paper shadow-md">
      <div className="flex justify-between items-center py-4 px-6 border-b">
        <p className="body-xlarge">{project.name}</p>
        <div className="flex justify-end items-center gap-4">
          <Chip
            color="primary"
            label={ProjectStatus[project.status]}
            sx={{ fontSize: '1rem', paddingInline: '0.75rem' }}
          />
          <div className="flex justify-end">
            <Avatar
              sx={{ width: 48, height: 48 }}
              src={project.organisations[0]?.logoUrl ?? ''}
            />
            <Avatar
              sx={{ width: 48, height: 48, marginLeft: '-12px' }}
              src={project.organisations[1]?.logoUrl ?? ''}
            />
          </div>
        </div>
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
