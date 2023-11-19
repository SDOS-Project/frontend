'use client';
import { useCallback, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '@/features/auth/apiSlice';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { setUser } from '@/features/auth/authSlice';
import { LoadingButton } from '@mui/lab';
import { FirebaseErrors } from '@/types/FirebaseErrors';
import { TabSwitch } from '@/components/signup/TabSwitch';
import ImageUpload from '@/components/common/ImageUpload';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { studentSignupValidationSchema } from '@/schemas/signup/student/schema';

export default function Signup() {
  const dispatch = useDispatch();

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
      imgUrl: '',
    };
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(studentSignupValidationSchema),
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
