'use client';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Header from '../layout/header';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const router = useRouter();

  const auth = useSelector(selectIsAuthenticated);

  return (
    <>
      {auth && <Header />}
      {children}
    </>
  );
}
