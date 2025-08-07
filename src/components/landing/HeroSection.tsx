'use client';

import { Button } from '@/components/ui/button';
import AppLogo from '../ui/AppLogo';
import LoginModal from '../auth/LoginModal';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing
            <span className="text-blue-600 block">Medical Practice</span>
            with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced medical consultations and clinical simulations powered by artificial intelligence. 
            Get precise answers and enhance your diagnostic skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
