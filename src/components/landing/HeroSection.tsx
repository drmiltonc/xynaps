'use client';

import { Button } from '@/components/ui/button';
import AppLogo from '../ui/AppLogo';
import OAuthLogin from '../auth/OAuthLogin';

export default function HeroSection() {
  console.log('HeroSection component rendered');
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <AppLogo className="mx-auto mb-8" size="large" />
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing
            <span className="text-blue-600 block">Medical Practice</span>
            with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced medical consultations and clinical simulations powered by artificial intelligence. 
            Get precise answers and enhance your diagnostic skills.
          </p>
          
          {/* Authentication Section */}
          <div id="auth-section" className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Sign In to Access
            </h2>
            <p className="text-gray-600 mb-6">
              Choose your preferred authentication method to start using Xynaps
            </p>
            <OAuthLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
