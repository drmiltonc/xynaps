import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/ui/AppLogo';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto text-center p-8">
        <AppLogo className="mx-auto mb-8" size="large" />
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Error
          </h1>
          
          <p className="text-gray-600 mb-6">
            There was an issue with the authentication process. This could be due to:
          </p>
          
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Invalid or expired authentication code</li>
            <li>• Network connectivity issues</li>
            <li>• OAuth provider configuration problems</li>
            <li>• Session timeout</li>
          </ul>
          
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">
                Try Again
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
