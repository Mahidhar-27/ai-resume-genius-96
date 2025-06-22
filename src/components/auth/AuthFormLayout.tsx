
import React from 'react';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface AuthFormLayoutProps {
  children: React.ReactNode;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create professional resumes with AI assistance</p>
        </div>

        {children}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthFormLayout;
