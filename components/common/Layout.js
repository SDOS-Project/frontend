'use client';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Header from '../layout/header';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { LinearProgress } from '@mui/material';

export default function Layout({ children }) {
  const auth = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    if (
      !auth &&
      !pathname.includes('/login') &&
      !pathname.includes('/signup')
    ) {
      router.push('/');
    }
  }, [auth, pathname, router]);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      console.log('routeChangeStart', url);
      setIsPageTransitioning(true);
    };

    const handleRouteChangeComplete = (url) => {
      console.log('routeChangeComplete', url);
      setIsPageTransitioning(false);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <div className="bg-grey min-h-screen">
      {/* {isPageTransitioning && <LinearProgress color="primary" />} */}
      {auth && (
        <PersistGate loading={null} persistor={persistor}>
          <Header />
        </PersistGate>
      )}
      {children}
    </div>
  );
}
