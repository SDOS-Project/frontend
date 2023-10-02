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
import { useRouter } from 'next/navigation';
import { TabSwitch } from '@/components/signup/TabSwitch';
import FormFieldLabel from '@/components/common/FormFieldLabel';
import Link from 'next/link';

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
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
    <main className="width-layout-page-form padding-layout-1">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 bg-paper p-10 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="body-2xlarge font-semibold">
              Signup On Edu
              <span className="text-primary-main">Corp.</span>
            </h1>
            <p className="text-primary-grey font-light body-small">
              Bridging Academia and Industry
            </p>
          </div>
          <TabSwitch />
          {textFields.map((textField) => (
            <div
              className="w-full"
              key={`${textField.label}-${textField.name}`}>
              <FormFieldLabel title={textField.label} />
              <Controller
                key={textField.name}
                name={textField.name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    size="small"
                    // label={textField.label}
                    type={textField.type}
                    variant="outlined"
                    error={!!errors[textField.name]}
                    helperText={
                      errors[textField.name]
                        ? errors[textField.name]?.message
                        : ''
                    }
                  />
                )}
              />
            </div>
          ))}
          <div className="w-full">
            <FormFieldLabel title={'Type'} />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl className="w-full mb-2 lg:mb-0" size="small">
                  {/* <InputLabel>Type</InputLabel> */}
                  <Select {...field} error={!!errors.type}>
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
          </div>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isOrganisationSignupLoading}
            className="w-full bg-primary-main">
            Sign Up
          </LoadingButton>
          <Link href="/">
            <div className="body-small text-primary-grey font-light cursor-pointer hover:text-primary-main hover:underline">
              Want to Login? Click Here.
            </div>
          </Link>
        </form>
      </div>
    </main>
  );
}
