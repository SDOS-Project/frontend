'use client';
import { useCallback, useMemo } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '@/features/auth/apiSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
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
import { useRouter } from 'next/navigation';
import { TabSwitch } from '@/components/signup/TabSwitch';
import Link from 'next/link';
import FormFieldLabel from '@/components/common/FormFieldLabel';

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

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

  return (
    <main className="width-layout-page-form padding-layout-1">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 bg-paper p-10 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="body-2xlarge font-semibold">
              Signup On Edu<span className="text-primary-main">Corp.</span>
            </div>
            <div className="text-primary-grey font-light body-small">
              Bridging Academia and Industry
            </div>
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
                    className="w-full"
                  />
                )}
              />
            </div>
          ))}
          <div className="w-full">
            <FormFieldLabel title={'Role'} />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl className="w-full mb-2 lg:mb-0" size="small">
                  {/* <InputLabel>Role</InputLabel> */}
                  <Select
                    {...field}
                    // label="role"
                    error={!!errors.role}
                    className="w-full">
                    {Object.keys(UserRole)?.map((role) => {
                      return (
                        <MenuItem key={role} value={role}>
                          {UserRole[role]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText className="text-error-main">
                    {errors?.role && errors?.role?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </div>
          <div className="w-full">
            <FormFieldLabel title={'Organisation'} />
            <CustomAutocomplete
              control={control}
              fieldName="organisationHandle"
              options={organisations}
              errors={errors}
              loading={isOrganisationsLoading}
              // label={'Organisation'}
              optionLabelCallback={(option) => option?.name}
            />
          </div>
          <div className="w-full">
            <FormFieldLabel title={'Areas of Interest'} />
            <MultipleChipSelect
              control={control}
              fieldName="areasOfInterest"
              options={['AI', 'ML', 'DL', 'CV']}
              errors={errors}
              setValue={setValue}
            />
          </div>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isUserSignupLoading}
            className="w-full bg-primary-main">
            Sign up
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
