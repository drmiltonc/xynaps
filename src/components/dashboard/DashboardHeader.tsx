'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/ui/AppLogo';

interface DashboardHeaderProps {
  user: any;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <AppLogo size="small" />

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user?.full_name || 'User'}
              </div>
              <div className="text-xs text-gray-500">
                {user?.email}
              </div>
            </div>
            
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
