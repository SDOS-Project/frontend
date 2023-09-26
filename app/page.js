'use client';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/features/auth/apiSlice';
import { useRouter } from 'next/navigation';
import { setUser } from '@/features/auth/authSlice';

export default function Home() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const [login] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (_) => {
        const { data } = await login({ email, password });
        dispatch(setUser(data));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorCode, errorMessage);
      });
  };

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      router.push(`/user/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form className='flex flex-col items-center justify-between'>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </main>
  );
}
