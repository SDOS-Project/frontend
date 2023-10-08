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
import { TabSwitch } from '@/components/signup/TabSwitch';
import ImageUpload from '@/components/common/ImageUpload';

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
    setValue,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4">
      <TabSwitch />
      {textFields.map((textField) => (
        <Controller
          key={textField.name}
          name={textField.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              size="small"
              label={textField.label}
              type={textField.type}
              variant="outlined"
              error={!!errors[textField.name]}
              helperText={
                errors[textField.name] ? errors[textField.name]?.message : ''
              }
            />
          )}
        />
      ))}
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormControl className="w-full mb-2 lg:mb-0" size="small">
            <InputLabel>Type</InputLabel>
            <Select {...field} label="Type" error={!!errors.type}>
              {Object.keys(OrganisationType)?.map((role) => {
                return (
                  <MenuItem key={role} value={role}>
                    {OrganisationType[role]}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText className="text-red ml-4">
              {errors?.role && errors?.role?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <ImageUpload userType={'organisation'} setValue={setValue} />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isOrganisationSignupLoading}
        className="w-full bg-primary-main">
        Sign Up
      </LoadingButton>
    </form>
  );
}
