'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/providers/AuthProvider';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('Home - Auth state changed:', { mounted, loading, user: !!user });
  }, [mounted, loading, user]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (mounted && !loading && user && !redirecting) {
      console.log('🔵 Home - User authenticated, redirecting to dashboard');
      setRedirecting(true);
      router.push('/dashboard');
    }
  }, [mounted, loading, user, redirecting, router]);

  if (!mounted) {
    console.log('Home - Not mounted yet');
    return null;
  }

  if (loading) {
    console.log('Home - Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show redirect message for authenticated users
  if (user && redirecting) {
    console.log('Home - Showing redirect state for authenticated user');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting to dashboard...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  console.log('Home - Showing landing page, user:', !!user);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
