"use client";
import { useCallback, useEffect, useMemo } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/features/auth/apiSlice";
import { useRouter } from "next/navigation";
import { setUser } from "@/features/auth/authSlice";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/schemas/login/schema";
import { toast } from "react-toastify";
import { FirebaseErrors } from "@/types/FirebaseErrors";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [login] = useLoginMutation();

  const defaultValues = useMemo(() => {
    return {
      email: "",
      password: "",
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
          console.log("error", errorCode);
          toast.error(FirebaseErrors[errorCode] || errorMessage);
        });
    },
    [dispatch, login, reset, defaultValues]
  );

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const href = authState.user?.role ? `/user` : "/organisation";
      router.push(`${href}/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-grey">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-6 bg-paper py-16 px-20 w-1/2 rounded-md"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-semibold">
            Login Into Edu<span className="text-primary-main">Corp.</span>
          </h1>
          <p className="text-primary-grey font-light">
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
              helperText={errors.email ? errors.email?.message : ""}
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
              type="password"
              label="Password"
              variant="outlined"
              className="w-full"
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ""}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-primary-main text-white w-full"
        >
          Login
        </Button>

        <p
          className="text-primary-grey font-light cursor-pointer hover:text-primary-main hover:underline"
          onClick={() => router.push("/signup/user")}
        >
          Don't have an Account? Click Here to Sign Up.
        </p>
      </form>
    </main>
  );
}
