'use client';
import AboutTab from '@/components/project/tabs/AboutTab';
import {
  useGetProjectConfigQuery,
  useGetProjectQuery,
} from '@/features/project/apiSice';
import { ProjectStatus } from '@/types/ProjectStatus';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, Tab } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
const EditProfile = dynamic(
  () => import('@/components/project/forms/EditProfile'),
  {
    ssr: false,
  }
);
const UpdatesTab = dynamic(
  () => import('@/components/project/tabs/UpdatesTab'),
  {
    ssr: false,
  }
);

export default function Project({ params }) {
  const { slug } = params;

  const { data: project, isLoading } = useGetProjectQuery(slug);
  const { data: projectConfig, isLoading: isProjectConfigLoading } =
    useGetProjectConfigQuery(slug);

  const [tabValue, setTabValue] = useState('About');

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfile = useCallback(() => {
    setIsEditProfileOpen(true);
  }, []);

  const handleChange = useCallback((_, newValue) => {
    setTabValue(newValue);
  }, []);

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

  if (isLoading || isProjectConfigLoading) return <div>Loading...</div>;
  return (
    <div className="width-layout-1 padding-layout-2">
      <div className="bg-paper shadow-md relative">
        <div className="absolute top-0 left-0 bg-gg h-24 sm:h-36 w-full rounded-t-lg z-0"></div>
        <div className="z-50 absolute right-0 top-0 bg-primary-main text-white py-2 px-4 rounded-bl-lg body-small">
          {ProjectStatus[project.status]}
        </div>
        <div className="w-full pt-14 sm:pt-24 z-50">
          <div className="flex justify-start mx-6">
            <Avatar
              className="w-20 h-20 sm:w-24 sm:h-24"
              src={project.organisations[0]?.logoUrl ?? ''}
            />
            <Avatar
              className="w-20 h-20 sm:w-24 sm:h-24 -ml-5"
              src={project.organisations[1]?.logoUrl ?? ''}
            />
          </div>
          <div className="flex justify-between gap-2 items-center mx-6 mt-4">
            <p className="body-xlarge text-primary-dark font-medium">
              {project.name}
            </p>
            {projectConfig?.isAdmin && (
              <Button
                variant="contained"
                className="bg-primary-main"
                onClick={() => handleEditProfile()}>
                Edit Project
              </Button>
            )}
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
      {projectConfig?.isAdmin && (
        <EditProfile
          handle={slug}
          isDialogOpen={isEditProfileOpen}
          handleCloseDialog={() => setIsEditProfileOpen(false)}
        />
      )}
    </div>
  );
}
