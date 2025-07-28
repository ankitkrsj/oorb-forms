import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

const ClerkSignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to Forms
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your forms and responses
          </p>
        </div>
        
        <SignIn 
          appearance={{
            baseTheme: undefined,
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
              socialButtonsBlockButton: 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900 text-sm normal-case',
              socialButtonsBlockButtonText: 'font-medium',
              formFieldInput: 'rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500',
              footerActionLink: 'text-blue-600 hover:text-blue-500'
            }
          }}
          redirectUrl="/oorb-forms"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
};

export default ClerkSignIn;