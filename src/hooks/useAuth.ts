'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
  app_metadata: {
    roles?: string[];
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Netlify Identity script
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.netlifyIdentity.init();
      
      // Check current user
      const currentUser = window.netlifyIdentity.currentUser();
      setUser(currentUser);
      setLoading(false);

      // Listen for login events
      window.netlifyIdentity.on('login', (user: User) => {
        setUser(user);
        window.netlifyIdentity.close();
      });

      // Listen for logout events
      window.netlifyIdentity.on('logout', () => {
        setUser(null);
      });
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};