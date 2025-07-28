import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

interface ClerkAuthContextType {
  user: any;
  loading: boolean;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
  getInitials: () => string;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(ClerkAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within ClerkAuthProvider');
  }
  return context;
};

export const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut: clerkSignOut, isSignedIn } = useClerkAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  const signOut = async () => {
    await clerkSignOut();
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || 'U';
  };

  const value = {
    user: user ? {
      _id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0]?.emailAddress,
      email: user.emailAddresses[0]?.emailAddress,
      avatar: user.imageUrl,
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      createdAt: user.createdAt,
      lastLogin: user.lastSignInAt
    } : null,
    loading,
    isSignedIn: !!isSignedIn,
    signOut,
    getInitials
  };

  return (
    <ClerkAuthContext.Provider value={value}>
      {children}
    </ClerkAuthContext.Provider>
  );
};