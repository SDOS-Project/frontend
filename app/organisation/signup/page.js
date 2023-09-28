'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useOrganisationSignupMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { setUser } from '@/features/auth/authSlice';
import { organisationSignupValidationSchema } from '@/schemas/organisation-signup/schema';
import { OrganisationType } from '@/types/OrganisationType';

function Signup() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [signup] = useOrganisationSignupMutation();

  const defaultValues = useMemo(() => {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      type: '',
      logoUrl: '',
      address: '',
      ipPolicy: '',
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(organisationSignupValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const firebaseUser = userCredential.user;
          try {
            const organisation = await signup({
              ...data,
              firebaseId: firebaseUser.uid,
            }).unwrap();
            dispatch(setUser(organisation));
          } catch (error) {
            deleteUser(firebaseUser)
              .then(() => {
                console.log('User deleted');
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((error) => {
          reset(defaultValues);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error', errorCode, errorMessage);
          toast.error(errorMessage);
        });
    },
    [dispatch, signup, reset, defaultValues]
  );

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      router.push(`/organisation/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

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
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Email'
              variant='outlined'
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
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword?.message : ''
              }
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <FormControl className='w-full mb-2 lg:mb-0' size='small'>
              <InputLabel>Type</InputLabel>
              <Select {...field} label='type' error={!!errors.type}>
                {Object.keys(OrganisationType)?.map((role) => {
                  return (
                    <MenuItem key={role} value={role}>
                      {OrganisationType[role]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className='text-red ml-4'>
                {errors?.role && errors?.role?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Address'
              variant='outlined'
              error={!!errors.address}
              helperText={errors.address ? errors.address?.message : ''}
            />
          )}
        />
        <Controller
          name='ipPolicy'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='IP Policy URL'
              placeholder='https://example.com'
              variant='outlined'
              error={!!errors.ipPolicy}
              helperText={errors.ipPolicy ? errors.ipPolicy?.message : ''}
            />
          )}
        />
        <Button type='submit' variant='contained'>
          Sign up
        </Button>
      </form>
    </main>
  );
}

export default Signup;
