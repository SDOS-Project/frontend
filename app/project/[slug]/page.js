'use client';
import AboutTab from '@/components/project/AboutTab';
import UpdatesTab from '@/components/project/UpdatesTab';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Chip, Tab } from '@mui/material';
import { useMemo, useState } from 'react';

export default function Project({ params }) {
  const { slug } = params;

  const { data: project, isLoading } = useGetProjectQuery(slug);

  console.log('project', project);

  const [value, setValue] = useState('1');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const tabs = useMemo(
    () => [
      {
        label: 'About',
        value: '1',
        component: <AboutTab />,
      },
      {
        label: 'Updates',
        value: '2',
        component: <UpdatesTab />,
      },
    ],
    []
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-20 width-layout-1 bg-paper shadow-md">
      <div className="flex justify-between items-center py-4 px-6 border-b">
        <p className="body-large">Thesis On Ai</p>
        <div className="flex justify-end items-center gap-4">
          <Chip
            color="primary"
            label={ProjectStatus[project.status]}
            sx={{ fontSize: '1rem', paddingInline: '0.75rem' }}
          />
          <div className="flex justify-end">
            <Avatar alt="IIITD" sx={{ width: 48, height: 48 }} />
            <Avatar
              alt="FB"
              sx={{ width: 48, height: 48, marginLeft: '-12px' }}
            />
          </div>
        </div>
      </div>
      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="About" value="1" sx={{ fontSize: '1rem' }} />
              <Tab label="Updates" value="2" sx={{ fontSize: '1rem' }} />
            </TabList>
          </Box>
          {tabs.map((tab) => (
            <TabPanel
              key={`${tab.label}-${tab.value}`}
              value={tab.value}
              sx={{ padding: 0 }}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </div>
    </div>
  );
}
