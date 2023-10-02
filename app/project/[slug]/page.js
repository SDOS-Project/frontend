'use client';
import AboutTab from '@/components/project/AboutTab';
import UpdatesTab from '@/components/project/UpdatesTab';
import { useGetProjectQuery } from '@/features/project/apiSice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Chip, Tab } from '@mui/material';
import { useState } from 'react';

export default function Project({ params }) {
  const { slug } = params;

  const { data: project, isLoading } = useGetProjectQuery(slug);

  console.log('project', project);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-20 width-layout-1 bg-paper shadow-md">
      <div className="flex justify-between items-center py-4 px-6 border-b">
        <p className="body-large">Thesis On Ai</p>
        <div className="flex justify-end items-center gap-4">
          <Chip
            color="primary"
            label="On Going"
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
          <TabPanel value="1" sx={{ padding: 0 }}>
            <AboutTab />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <UpdatesTab />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
