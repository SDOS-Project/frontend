'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SignupProvider({ children }) {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const href = authState.user?.role ? `/user` : '/organisation';
      router.push(`${href}/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

  return children;
}
