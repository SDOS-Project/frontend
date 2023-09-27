'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
import { setUser } from '@/features/auth/authSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signupValidationSchema } from '@/schemas/signup/schema';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';
import { UserRole } from '@/types/UserRole';
import MultipleChipSelect from '@/components/common/MultipleChipSelect';
import CustomAutocomplete from '@/components/common/CustomAutocomplete';

function Signup() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const { data: organisations, isLoading } = useGetOrganisationsQuery();

  const [signup] = useSignupMutation();

  const defaultValues = useMemo(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      organisationId: '',
      areasOfInterest: [],
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const firebaseUser = userCredential.user;
          try {
            const { data: user } = await signup({
              ...data,
              firebaseId: firebaseUser.uid,
            }).unwrap();
            dispatch(setUser(user));
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
      router.push(`/user/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

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
          name='role'
          control={control}
          render={({ field }) => (
            <FormControl className='w-full mb-2 lg:mb-0' size='small'>
              <InputLabel>Role</InputLabel>
              <Select {...field} label='role'>
                {Object.keys(UserRole)?.map((role) => {
                  return (
                    <MenuItem key={role} value={role}>
                      {UserRole[role]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        />
        <CustomAutocomplete
          control={control}
          fieldName='organisationId'
          options={organisations}
          errors={errors}
        />
        <MultipleChipSelect
          control={control}
          fieldName='areasOfInterest'
          options={['AI', 'ML', 'DL', 'CV']}
          errors={errors}
          setValue={setValue}
        />
        <Button type='submit' variant='contained'>
          Sign up
        </Button>
      </form>
    </main>
  );
}

export default Signup;
