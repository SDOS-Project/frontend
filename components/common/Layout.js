'use client';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Header from '../layout/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter();

  const auth = useSelector(selectIsAuthenticated);

  // useEffect(() => {
  //   // Event handler for route change start
  //   const handleRouteChangeStart = (url) => {
  //     console.log(`Route is changing to: ${url}`);
  //     // You can perform actions when the route change starts here
  //   };

  //   // Event handler for route change complete
  //   const handleRouteChangeComplete = (url) => {
  //     console.log(`Route change completed to: ${url}`);
  //     // You can perform actions when the route change is complete here
  //   };

  //   // Subscribe to route change events
  //   router.events.on('routeChangeStart', handleRouteChangeStart);
  //   router.events.on('routeChangeComplete', handleRouteChangeComplete);

  //   // Clean up event listeners when the component unmounts
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChangeStart);
  //     router.events.off('routeChangeComplete', handleRouteChangeComplete);
  //   };
  // }, [router.events]);

  return (
    <>
      {auth && <Header />}
      {children}
    </>
  );
}
