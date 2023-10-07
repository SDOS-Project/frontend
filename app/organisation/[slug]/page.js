'use client';
import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Tab, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import AboutTabOrg from '@/components/organisation/tabs/AboutTabOrg';
import dynamic from 'next/dynamic';
import { OrganisationType } from '@/types/OrganisationType';
import Link from 'next/link';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const TeamTabOrg = dynamic(
  () => import('@/components/organisation/tabs/TeamTabOrg'),
  {
    ssr: false,
  }
);
const ProjectsTab = dynamic(
  () => import('@/components/organisation/tabs/ProjectsTab'),
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
        label: 'Coordinators',
        component: <TeamTabOrg handle={slug} />,
      },
      {
        label: 'Projects',
        component: <ProjectsTab handle={slug} />,
      },
    ],
    [slug]
  );

  console.log('organisation', organisation);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="width-layout-1 padding-layout-2">
      <div className="bg-paper shadow-md relative">
        <div className="absolute top-0 left-0 bg-gg h-24 sm:h-36 w-full rounded-t-lg z-0"></div>
        <Tooltip title={OrganisationType[organisation?.type]}>
          <div className="z-50 absolute right-6 top-6 bg-primary-main text-white p-3 rounded-full body-xsmall">
            {OrganisationType[organisation?.type].toLowerCase() ===
            OrganisationType.ACADEMIC.toLowerCase() ? (
              <SchoolIcon className="body-xlarge" />
            ) : (
              <CorporateFareIcon className="body-xlarge" />
            )}
          </div>
        </Tooltip>
        <div className="w-full pt-14 sm:pt-24 z-50">
          <Avatar
            className="w-20 h-20 sm:w-24 sm:h-24 body-2xlarge mx-6"
            src={organisation?.logoUrl}>
            {organisation?.name}
          </Avatar>
          <div className="flex flex-col justify-start gap-2 items-start mx-6 mt-4">
            <p className="body-xlarge text-primary-dark font-medium">
              {organisation?.name}
            </p>
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
                <div className="w-full p-4 flex flex-col gap-4">
                  {tab.component}
                </div>
              </TabPanel>
            ))}
          </TabContext>
        </div>
      </div>
    </div>
  );
}
