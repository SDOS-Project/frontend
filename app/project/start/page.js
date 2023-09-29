'use client';
import { useCallback, useMemo } from 'react';
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

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-between gap-10'
      >
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Name'
              variant='outlined'
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ''}
            />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Description'
              multiline
              variant='outlined'
              error={!!errors.description}
              helperText={errors.description ? errors.description?.message : ''}
            />
          )}
        />
        {user?.role?.toLowerCase() === UserRole.FACULTY.toLowerCase() ? (
          <CustomAutocomplete
            control={control}
            fieldName='partnerHandle'
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
            fieldName='partnerHandle'
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
          type='submit'
          variant='contained'
          loading={isCreateProjectLoading}
        >
          Start Project
        </LoadingButton>
      </form>
    </main>
  );
}
