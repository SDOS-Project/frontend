'use client';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Header from '../layout/header';

export default function Layout({ children }) {
  const auth = useSelector(selectIsAuthenticated);

  //   if (!auth) return <>Unauthorised</>;

  return (
    <>
      {auth && <Header />}
      {children}
    </>
  );
}
