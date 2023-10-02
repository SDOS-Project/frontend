'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { UserRole } from '@/types/UserRole';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, IconButton, Tab } from '@mui/material';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Email } from '@mui/icons-material';
import AboutTabUser from '@/components/user/tabs/AboutTabUser';
import Link from 'next/link';
const ProjectsTab = dynamic(
  () => import('@/components/organisation/tabs/ProjectsTab'),
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
    <div className="width-layout-1 padding-layout-1 mt-20 bg-paper shadow-md">
      <div className="flex justify-between gap-2 items-center py-4 px-6 border-b">
        <div className="flex justify-start gap-2 items-center">
          <Avatar>{user.firstName.slice(0, 3)}</Avatar>
          <p className="body-xlarge">{user.firstName + ' ' + user.lastName}</p>
        </div>
        <Link href={`mailto:${user.email}`}>
          <IconButton>
            <Email />
          </IconButton>
        </Link>
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
