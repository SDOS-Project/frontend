'use client';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Chip, Tab, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import AboutTabUser from '@/components/user/tabs/AboutTabUser';
import { UserRole } from '@/types/UserRole';
import themeConstants from '@/theme/themeConstants';
import Link from 'next/link';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

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
    <div className="width-layout-1 padding-layout-2">
      <div className="bg-paper shadow-md relative">
        <div className="absolute top-0 left-0 bg-gg h-36 w-full rounded-t-lg z-0"></div>
        <Tooltip title={UserRole[user?.role]}>
          <div className="z-50 absolute right-6 top-6 bg-primary-main text-white p-3 rounded-full body-xsmall">
            {UserRole[user?.role] == UserRole.FACULTY ? (
              <SchoolIcon className="body-xlarge" />
            ) : (
              <CorporateFareIcon className="body-xlarge" />
            )}
          </div>
        </Tooltip>
        <div className="w-full pt-24 z-50">
          <Avatar className="w-24 h-24 sm:w-24 sm:h-24 body-2xlarge mx-6">
            {user?.firstName[0] + user?.lastName[0]}
          </Avatar>
          <div className="flex flex-col justify-start gap-2 items-start mx-6 mt-4">
            <p className="body-xlarge text-primary-dark font-medium">
              {user?.firstName + ' ' + user?.lastName}
            </p>
            <Link href={`/organisation/${user?.organisation?.handle}`}>
              <div className="flex gap-2 items-center">
                <Avatar src={user?.organisation?.logoUrl}></Avatar>
                <p className="body-small">{user?.organisation?.name}</p>
              </div>
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
      </div>
    </div>
  );
}
