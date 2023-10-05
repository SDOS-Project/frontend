'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Chip, Tab } from '@mui/material';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import AboutTabUser from '@/components/user/tabs/AboutTabUser';
import { UserRole } from '@/types/UserRole';
import themeConstants from '@/theme/themeConstants';
const ProjectsTab = dynamic(
  () => import('@/components/user/tabs/ProjectsTab'),
  {
    ssr: false,
  }
);

export default function User({ params }) {
  const { slug } = params;

  const { data: user, isLoading } = useGetUserQuery(slug);

  const [tabValue, setTabValue] = useState('About');

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const tabs = useMemo(
    () => [
      {
        label: 'About',
        component: <AboutTabUser handle={slug} />,
      },
      {
        label: 'Projects',
        component: <ProjectsTab handle={slug} />,
      },
    ],
    [slug]
  );

  console.log('user', user);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="width-layout-1 padding-layout-1">
      <div className=" bg-paper shadow-md">
        <div className="flex justify-between gap-2 items-center py-4 px-6 border-b">
          <div className="flex justify-start gap-2 items-center">
            <p className="body-xlarge">
              {user.firstName + ' ' + user.lastName}
            </p>
          </div>
          <div className="flex justify-end items-center gap-6">
            <Chip
              label={UserRole[user?.role]}
              color="primary"
              sx={{ fontSize: '1rem', paddingInline: '0.75rem' }}
            />
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: themeConstants.primary.main,
              }}>
              {user?.firstName[0] + user?.lastName[0]}
            </Avatar>
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
    </div>
  );
}
