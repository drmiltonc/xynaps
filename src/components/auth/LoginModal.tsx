'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import OAuthLogin from './OAuthLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to Xynaps
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Sign in to access Medical Query and Clinical Simulation
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <OAuthLogin />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
