'use client';

import FAQS from '@/components/landing/FAQS';
import HeroSection from '@/components/landing/HeroSection';
import OurMission from '@/components/landing/OurMission';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const href = authState.user?.role ? `/user` : '/organisation';
      router.push(`${href}/${authState.user.handle}`);
    }
  }, [authState.isAuthenticated, authState.user, router]);

  return (
    <main className="bg-white h-full w-full flex flex-col items-center justify-center gap-4">
      <HeroSection />
      <OurMission />
      <WhyChooseUs />
      <FAQS />
    </main>
  );
}
