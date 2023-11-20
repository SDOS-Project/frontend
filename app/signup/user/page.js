'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '@/features/auth/apiSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signupValidationSchema } from '@/schemas/signup/schema';
import { useGetOrganisationsDropdownQuery } from '@/features/organisation/apiSlice';
import { UserRole } from '@/types/UserRole';
import CustomAutocomplete from '@/components/common/CustomAutocomplete';
import { setUser } from '@/features/auth/authSlice';
import { LoadingButton } from '@mui/lab';
import { FirebaseErrors } from '@/types/FirebaseErrors';
import { TabSwitch } from '@/components/signup/TabSwitch';
import ImageUpload from '@/components/common/ImageUpload';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  disciplineEnumMapping,
  engineeringFields,
} from '@/types/EngineeringFields';
import MultipleAutocomplete from '@/components/common/MultipleAutocomplete';

export default function Signup() {
  const dispatch = useDispatch();

  const { data: organisations, isLoading: isOrganisationsLoading } =
    useGetOrganisationsDropdownQuery();
  const [signup, { isLoading: isUserSignupLoading }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );
  const handleClickShowConfirmPassword = useCallback(
    () => setShowConfirmPassword((show) => !show),
    []
  );
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

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
        type: showPassword ? 'text' : 'password',
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: showConfirmPassword ? 'text' : 'password',
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowConfirmPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end">
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      },
      {
        name: 'socialUrl',
        label: 'Homepage/LinkedIn URL',
        type: 'text',
      },
    ],
    [
      showPassword,
      showConfirmPassword,
      handleClickShowPassword,
      handleClickShowConfirmPassword,
      handleMouseDownPassword,
    ]
  );

  const defaultValues = useMemo(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      socialUrl: '',
      role: '',
      organisationHandle: '',
      discipline: '',
      areasOfInterest: [],
      imgUrl: '',
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues,
  });

  const selectedDiscipline = watch('discipline');

  useEffect(() => {
    if (getValues('discipline') !== selectedDiscipline) {
      console.log('resetting areas of interest');
      setValue('areasOfInterest', []);
    }
  }, [selectedDiscipline, getValues, setValue]);

  const areasOfInterestOptions = useMemo(() => {
    return engineeringFields[selectedDiscipline] || [];
  }, [selectedDiscipline]);

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;
      const transformedData = {
        ...data,
        discipline: disciplineEnumMapping[data.discipline] || data.discipline,
      };
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const firebaseUser = userCredential.user;
          try {
            const user = await signup({
              ...transformedData,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4">
      <TabSwitch />
      <ImageUpload userType={'user'} setValue={setValue} />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {textField.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      ))}
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl className="w-full" size="small">
            <InputLabel className={errors?.role && 'text-error-main'}>
              Role
            </InputLabel>
            <Select
              {...field}
              label="role"
              error={!!errors.role}
              className="w-full">
              {Object.keys(UserRole)?.map((role) => {
                if (UserRole[role] === UserRole.STUDENT) {
                  return;
                }
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
      <CustomAutocomplete
        control={control}
        fieldName="organisationHandle"
        options={organisations}
        errors={errors}
        loading={isOrganisationsLoading}
        label={'Organisation (Optional)'}
        optionLabelCallback={(option) => option?.name}
      />
      <Controller
        name="discipline"
        control={control}
        render={({ field }) => (
          <FormControl className="w-full" size="small">
            <InputLabel className={errors?.discipline && 'text-error-main'}>
              Discipline
            </InputLabel>
            <Select
              {...field}
              label="discipline"
              error={!!errors.discipline}
              className="w-full">
              {Object.keys(engineeringFields)?.map((discipline) => {
                return (
                  <MenuItem key={discipline} value={discipline}>
                    {discipline}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText className="text-error-main">
              {errors?.discipline && errors?.discipline?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <MultipleAutocomplete
        control={control}
        fieldName="areasOfInterest"
        label="Areas of Interest"
        options={areasOfInterestOptions}
        errors={errors}
        setValue={setValue}
        freeSolo={true}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isUserSignupLoading}
        className="w-full bg-primary-main">
        Sign up
      </LoadingButton>
    </form>
  );
}
