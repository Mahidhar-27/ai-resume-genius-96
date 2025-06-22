
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthFormLayout from './AuthFormLayout';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useAuthForm } from './useAuthForm';

interface AuthFormProps {
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const {
    formData,
    isLoading,
    showPassword,
    showConfirmPassword,
    passwordValidation,
    handleInputChange,
    setShowPassword,
    setShowConfirmPassword,
    handleSignUp,
    handleSignIn
  } = useAuthForm(onAuthSuccess);

  return (
    <AuthFormLayout>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin" className="text-sm font-medium">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="text-sm font-medium">Create Account</TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-6">
          <SignInForm
            formData={formData}
            isLoading={isLoading}
            showPassword={showPassword}
            onInputChange={handleInputChange}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onSubmit={handleSignIn}
          />
        </TabsContent>

        <TabsContent value="signup" className="space-y-6">
          <SignUpForm
            formData={formData}
            isLoading={isLoading}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            passwordValidation={passwordValidation}
            onInputChange={handleInputChange}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onSubmit={handleSignUp}
          />
        </TabsContent>
      </Tabs>
    </AuthFormLayout>
  );
};

export default AuthForm;
