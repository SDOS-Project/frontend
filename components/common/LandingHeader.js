'use client';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export const LandingHeader = () => {
  const router = useRouter();
  const auth = useSelector(selectIsAuthenticated);
  console.log('AUTH>>>>', auth);
  if (!auth)
    return (
      <div className="flex justify-between items-center w-full sticky top-0 left-0 p-4 bg-primary-main">
        <p className="body-large text-white">EduCorp.</p>
        <div className="flex justify-end gap-6">
          <p
            className="cursor-pointer text-white"
            onClick={() => router.push('/signup/user')}>
            Signup
          </p>
          <p
            className="cursor-pointer text-white"
            onClick={() => router.push('/')}>
            Login
          </p>
        </div>
      </div>
    );
};
