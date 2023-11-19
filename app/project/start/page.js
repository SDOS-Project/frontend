'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ProjectLocation } from '@/types/ProjectLocation';
import AddStudents from '@/components/project/forms/AddStudents';

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
      startDate: null,
      endDate: null,
      location: '',
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
      console.log(data);
      const formattedData = {
        ...data,
        startDate: data.startDate ? data.startDate.toISOString() : null,
        endDate: data.endDate ? data.endDate.toISOString() : null,
      };
      try {
        const project = await createProject(formattedData).unwrap();
        router.push(`/project/${project.handle}`);
      } catch (error) {
        reset(defaultValues);
      }
    },
    [createProject, defaultValues, reset, router]
  );

  const textFields = useMemo(
    () => [
      { name: 'name', label: 'Name' },
      { name: 'description', label: 'Description' },
    ],
    []
  );

  const dateFields = useMemo(
    () => [
      {
        name: 'startDate',
        label: 'Start Date',
      },
      {
        name: 'endDate',
        label: 'End Date',
      },
    ],
    []
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
            Collaboration of Academic Expertise with Industrial Innovation.
            Register your project here to bridge the gap between academic
            knowledge and industrial insight.
          </p>
        </div>
        {textFields.map(({ name, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label={label}
                className="w-full"
                variant="outlined"
                multiline={name === 'description'}
                rows={name === 'description' ? 5 : 1}
                error={!!errors[name]}
                helperText={errors[name] ? errors[name]?.message : ''}
              />
            )}
          />
        ))}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {dateFields.map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  label={label}
                  inputFormat="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!errors[name],
                      helperText: errors[name] ? errors[name].message : '',
                    },
                  }}
                  value={value}
                  onChange={(newValue) =>
                    onChange(newValue ? newValue.$d : null)
                  }
                  className="w-full">
                  {({ inputRef, inputProps, InputProps }) => (
                    <TextField
                      {...inputProps}
                      ref={inputRef}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                      InputProps={InputProps}
                    />
                  )}
                </DesktopDatePicker>
              )}
            />
          ))}
        </LocalizationProvider>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full" size="small">
              <InputLabel className={errors?.location && 'text-error-main'}>
                Location
              </InputLabel>
              <Select
                {...field}
                label="Location"
                error={!!errors.location}
                className="w-full">
                {Object.keys(ProjectLocation)?.map((location) => {
                  return (
                    <MenuItem key={location} value={location}>
                      {ProjectLocation[location]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className="text-error-main">
                {errors?.location && errors?.location?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <AddStudents />
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
