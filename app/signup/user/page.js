'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
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
import { signupValidationSchema } from '@/schemas/signup/schema';
import { useGetOrganisationsQuery } from '@/features/organisation/apiSlice';
import { UserRole } from '@/types/UserRole';
import MultipleChipSelect from '@/components/common/MultipleChipSelect';
import CustomAutocomplete from '@/components/common/CustomAutocomplete';
import { setUser } from '@/features/auth/authSlice';
import { LoadingButton } from '@mui/lab';
import { FirebaseErrors } from '@/types/FirebaseErrors';

export default function Signup() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsQuery();

  const [signup, { isLoading: isUserSignupLoading }] = useSignupMutation();

  const textFields = useMemo(
    () => [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
      },
      {
        name: 'lastName',
        label: 'Last Name',
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
    ],
    []
  );

  const defaultValues = useMemo(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      organisationHandle: '',
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
            const user = await signup({
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
          toast.error(FirebaseErrors[errorCode] || errorMessage);
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
          name='role'
          control={control}
          render={({ field }) => (
            <FormControl className='w-full mb-2 lg:mb-0' size='small'>
              <InputLabel>Role</InputLabel>
              <Select {...field} label='role' error={!!errors.role}>
                {Object.keys(UserRole)?.map((role) => {
                  return (
                    <MenuItem key={role} value={role}>
                      {UserRole[role]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className='text-error-main'>
                {errors?.role && errors?.role?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <CustomAutocomplete
          control={control}
          fieldName='organisationHandle'
          options={organisations}
          errors={errors}
          loading={isOrganisationsLoading}
          label={'Organisation'}
          optionLabelCallback={(option) => option?.name}
        />
        <MultipleChipSelect
          control={control}
          fieldName='areasOfInterest'
          options={['AI', 'ML', 'DL', 'CV']}
          errors={errors}
          setValue={setValue}
        />
        <LoadingButton
          type='submit'
          variant='contained'
          loading={isUserSignupLoading}
        >
          Sign up
        </LoadingButton>
      </form>
    </main>
  );
}
