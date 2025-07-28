import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClerkAuthProvider, useAuth } from './contexts/ClerkAuthContext';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

import ClerkSignIn from './components/auth/ClerkSignIn';
import ClerkSignUp from './components/auth/ClerkSignUp';

import FormRenderer from './components/forms/FormRenderer';
import EnhancedOorbFormsApp from './components/forms/EnhancedOorbFormsApp';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isSignedIn } = useAuth();
  
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    console.log('User not authenticated, redirecting to sign-in');
    return <Navigate to="/sign-in" replace />;
  }
  
  console.log('User authenticated, rendering protected content');
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isSignedIn } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isSignedIn) {
    console.log('User already authenticated, redirecting to dashboard');
    return <Navigate to="/oorb-forms" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public routes */}
        <Route path="/sign-in" element={
          <PublicRoute>
            <ClerkSignIn />
          </PublicRoute>
        } />
        <Route path="/sign-up" element={
          <PublicRoute>
            <ClerkSignUp />
          </PublicRoute>
        } />
        <Route path="/form/:shareUrl" element={<FormRenderer />} />
        
        {/* Protected routes */}
        <Route path="/oorb-forms" element={
          <ProtectedRoute>
            <EnhancedOorbFormsApp />
          </ProtectedRoute>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/oorb-forms" replace />} />
      </Routes>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <ClerkAuthProvider>
      <AppRoutes />
    </ClerkAuthProvider>
  );
};

export default App;