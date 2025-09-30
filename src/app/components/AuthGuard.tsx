'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      login();
    }
  }, [loading, user, login]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
            <p className="mt-2 text-gray-600">Please log in to access the admin panel</p>
            <button
              onClick={login}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}