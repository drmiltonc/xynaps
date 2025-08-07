'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AppLogo from '../ui/AppLogo';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <AppLogo size="small" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Button */}
          <div className="hidden md:block">
            {!loading && (
              user ? (
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {!loading && (
              user ? (
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard'}
                  size="sm"
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => setShowLogin(true)}
                  size="sm"
                >
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
