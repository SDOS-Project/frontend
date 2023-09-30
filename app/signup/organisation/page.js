'use client';
import { useCallback, useMemo } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch } from 'react-redux';
import { useOrganisationSignupMutation } from '@/features/auth/apiSlice';
import { Controller, useForm } from 'react-hook-form';
import {
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
import { LoadingButton } from '@mui/lab';
import { FirebaseErrors } from '@/types/FirebaseErrors';

export default function Signup() {
  const dispatch = useDispatch();

  const [signup, { isLoading: isOrganisationSignupLoading }] =
    useOrganisationSignupMutation();

  const textFields = useMemo(
    () => [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
      },
      {
        name: 'address',
        label: 'Address',
        type: 'text',
      },
      {
        name: 'ipPolicy',
        label: 'IP Policy URL',
        type: 'text',
      },
    ],
    []
  );

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
          toast.error(FirebaseErrors[errorCode] || errorMessage);
        });
    },
    [dispatch, signup, reset, defaultValues]
  );

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-between gap-10'
      >
        {textFields.map((textField) => (
          <Controller
            key={textField.name}
            name={textField.name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                label={textField.label}
                type={textField.type}
                variant='outlined'
                error={!!errors[textField.name]}
                helperText={
                  errors[textField.name] ? errors[textField.name]?.message : ''
                }
              />
            )}
          />
        ))}
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
        <LoadingButton
          type='submit'
          variant='contained'
          loading={isOrganisationSignupLoading}
        >
          Sign Up
        </LoadingButton>
      </form>
    </main>
  );
}
