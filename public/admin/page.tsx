'use client';
import { useEffect } from 'react';
import AuthGuard from '@/app/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';

function AdminContent() {
  const { user, logout } = useAuth();

  useEffect(() => {
    window.location.href = '/admin/index.html#/';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <button
                onClick={logout}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="p-8 text-center">
        <p className="text-gray-600">Redirecting to Content Manager...</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminContent />
    </AuthGuard>
  );
}