'use client';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Header from '../layout/header';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';

export default function Layout({ children }) {
  const auth = useSelector(selectIsAuthenticated);

  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setIsPageTransitioning(true);
    };

    const handleRouteChangeComplete = (url) => {
      setIsPageTransitioning(false);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  if (isPageTransitioning) return <div>Transitioning...</div>;

  return (
    <div className="bg-grey min-h-screen">
      {auth && <Header />}
      {children}
    </div>
  );
}
