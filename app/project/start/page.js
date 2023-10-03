'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { startProjectValidationSchema } from '@/schemas/project/start/schema';
import {
  useGetEmployeesQuery,
  useGetFacultyQuery,
} from '@/features/user/apiSlice';
import CustomAutocomplete from '@/components/common/CustomAutocomplete';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/authSlice';
import { UserRole } from '@/types/UserRole';
import { useCreateProjectMutation } from '@/features/project/apiSice';
import { useRouter } from 'next/navigation';

export default function StartProject() {
  const router = useRouter();

  const user = useSelector(selectUser);

  const { data: faculty, isLoading: isFacultyLoading } = useGetFacultyQuery();
  const { data: employees, isLoading: isEmployeesLoading } =
    useGetEmployeesQuery();

  const [createProject, { isLoading: isCreateProjectLoading }] =
    useCreateProjectMutation();

  const defaultValues = useMemo(() => {
    return {
      name: '',
      description: '',
      creatorHandle: user?.handle,
      partnerHandle: '',
    };
  }, [user?.handle]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(startProjectValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        const project = await createProject(data).unwrap();
        router.push(`/project/${project.handle}`);
      } catch (error) {
        reset(defaultValues);
      }
    },
    [createProject, defaultValues, reset, router]
  );

  useEffect(() => {
    if (user?.type) router.push(`/organisation/${user.handle}`);
  }, [user?.type, user?.handle, router]);

  return (
    <main className="width-layout-page-form padding-layout-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 padding-layout-1">
        <div className="flex flex-col items-center justify-cente gap-2">
          <h1 className="body-2xlarge font-semibold">
            Start A <span className="text-primary-main">Project</span>
          </h1>
          <p className="text-primary-light font-light body-xsmall text-center">
            A Project is the collaboration of esteemed Faculty Members with
            hardworking Company Employees. A Project can be a Research Project,
            a Software Project, or a Hardware Project.
          </p>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Name"
              className="w-full"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ''}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Description"
              multiline
              rows={5}
              variant="outlined"
              className="w-full"
              error={!!errors.description}
              helperText={errors.description ? errors.description?.message : ''}
            />
          )}
        />
        {user?.role?.toLowerCase() === UserRole.FACULTY.toLowerCase() ? (
          <CustomAutocomplete
            control={control}
            fieldName="partnerHandle"
            options={employees}
            errors={errors}
            loading={isEmployeesLoading}
            label={'Project Partner'}
            optionLabelCallback={(option) =>
              option?.firstName + ' ' + option?.lastName || ''
            }
          />
        ) : (
          <CustomAutocomplete
            control={control}
            fieldName="partnerHandle"
            options={faculty}
            errors={errors}
            loading={isFacultyLoading}
            label={'Project Partner'}
            optionLabelCallback={(option) =>
              option?.firstName + ' ' + option?.lastName || ''
            }
          />
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          className="w-full bg-primary-main"
          loading={isCreateProjectLoading}>
          Start Project
        </LoadingButton>
      </form>
    </main>
  );
}
