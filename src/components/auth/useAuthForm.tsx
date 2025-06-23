
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validatePassword, sanitizeInput, validateEmail, getGenericErrorMessage } from '@/utils/validation';

export const useAuthForm = (onAuthSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({ isValid: false, errors: [], strength: 0 });
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    
    if (field === 'fullName') {
      sanitizedValue = sanitizeInput(value, 100);
    } else if (field === 'email') {
      sanitizedValue = sanitizeInput(value, 320);
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    if (field === 'password') {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const validateForm = (isSignUp: boolean) => {
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (isSignUp && !passwordValidation.isValid) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive"
      });
      return false;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both password fields match.",
        variant: "destructive"
      });
      return false;
    }

    if (isSignUp && formData.fullName.length < 2) {
      toast({
        title: "Name required",
        description: "Please enter your full name (at least 2 characters).",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) {
      return;
    }
    
    setIsLoading(true);
    console.log('Starting signup process with email:', formData.email);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Signup successful, user needs email confirmation');
        setPendingEmail(formData.email);
        setShowOTPVerification(true);
        toast({
          title: "Check your email",
          description: "We've sent you a verification code. Please check your email and enter the code below."
        });
      }
    } catch (error) {
      console.error('Signup exception:', error);
      toast({
        title: "An error occurred",
        description: getGenericErrorMessage('network'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(false)) {
      return;
    }
    
    setIsLoading(true);
    console.log('Starting signin process with email:', formData.email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      console.log('Signin response:', { data, error });

      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Signin successful');
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account."
        });
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Signin exception:', error);
      toast({
        title: "An error occurred",
        description: getGenericErrorMessage('network'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerificationSuccess = () => {
    console.log('OTP verification successful, proceeding to app');
    setShowOTPVerification(false);
    toast({
      title: "Account verified!",
      description: "Welcome to Smart Resume Builder."
    });
    onAuthSuccess();
  };

  const handleBackToSignUp = () => {
    console.log('Going back to signup form');
    setShowOTPVerification(false);
    setPendingEmail('');
  };

  return {
    formData,
    isLoading,
    showPassword,
    showConfirmPassword,
    passwordValidation,
    showOTPVerification,
    pendingEmail,
    handleInputChange,
    setShowPassword,
    setShowConfirmPassword,
    handleSignUp,
    handleSignIn,
    handleOTPVerificationSuccess,
    handleBackToSignUp
  };
};
