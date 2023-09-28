'use client';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { startProjectValidationSchema } from '@/schemas/project/start/schema';

function StartProject() {
  const defaultValues = useMemo(() => {
    return {
      name: '',
      description: '',
      partner: '',
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(startProjectValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback(async (data) => {
    console.log(data);
  }, []);

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
        <Button type='submit' variant='contained'>
          Start Project
        </Button>
      </form>
    </main>
  );
}

export default StartProject;
