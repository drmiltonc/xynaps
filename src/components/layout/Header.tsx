'use client';

import { useAuthContext } from '@/components/providers/AuthProvider';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const { user, loading } = useAuthContext();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Logo */}
          <AppLogo size="small" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {/* Mobile menu content can be added here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}
