import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import NotificationProvider from '@/components/providers/NotificationProvider';
import AuthErrorHandler from '@/components/auth/AuthErrorHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Xynaps - Medical AI Assistant',
  description: 'Advanced medical consultations and clinical simulations powered by artificial intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <NotificationProvider />
          <AuthErrorHandler />
        </AuthProvider>
      </body>
    </html>
  );
}
