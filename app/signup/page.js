'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
import { setUser } from '@/features/auth/authSlice';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signupValidationSchema } from '@/schemas/signup/schema';

function Signup() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const defaultValues = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback((data) => {
    console.logq('data', data);
  }, []);

  //   useEffect(() => {
  //     if (authState.isAuthenticated && authState.user) {
  //       router.push(`/user/${authState.user.handle}`);
  //     }
  //   }, [authState.isAuthenticated, authState.user, router]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-between gap-10'
      >
        <Controller
          name='firstName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='First Name'
              variant='outlined'
              className='mb-4'
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName?.message : ''}
            />
          )}
        />
        <Controller
          name='lastName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Last Name'
              variant='outlined'
              className='mb-4'
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName?.message : ''}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Email'
              variant='outlined'
              className='mb-4'
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ''}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              type='password'
              label='Password'
              variant='outlined'
              className='mb-4'
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ''}
            />
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              type='password'
              label='Confirm Password'
              variant='outlined'
              className='mb-4'
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword?.message : ''
              }
            />
          )}
        />
        <Button type='submit' variant='contained'>
          Login
        </Button>
      </form>
    </main>
  );
}

export default Signup;
