'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
import { setUser } from '@/features/auth/authSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '@/schemas/login/schema';
import { toast } from 'react-toastify';
import { FirebaseErrors } from '@/types/FirebaseErrors';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [login] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

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
    resolver: yupResolver(loginValidationSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;
      signInWithEmailAndPassword(auth, email, password)
        .then(async (_) => {
          try {
            const user = await login({ email, password }).unwrap();
            dispatch(setUser(user));
          } catch (error) {
            auth.signOut();
          }
        })
        .catch((error) => {
          reset(defaultValues);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error', errorCode);
          toast.error(FirebaseErrors[errorCode] || errorMessage);
        });
    },
    [dispatch, login, reset, defaultValues]
  );

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const href = authState.user?.role ? `/user` : '/organisation';
      router.push(`${href}/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

  return (
    <main className="width-layout-page-form padding-layout-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 padding-layout-1">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="body-2xlarge font-semibold">
            Login Into Edu<span className="text-primary-main">Corp.</span>
          </h1>
          <p className="text-primary-light font-light body-xsmall">
            Bridging Academia and Industry
          </p>
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Email"
              variant="outlined"
              className="w-full"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Password"
              variant="outlined"
              className="w-full"
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ''}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-primary-main text-white w-full">
          Login
        </Button>
        <Link href={'/signup/user'}>
          <div className="link">
            Don&apos;t have an account? Click Here to Sign Up.
          </div>
        </Link>
      </form>
    </main>
  );
}
