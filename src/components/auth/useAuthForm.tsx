
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validatePassword, sanitizeInput, validateEmail, getGenericErrorMessage } from '@/utils/validation';

export const useAuthForm = (onAuthSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({ isValid: false, errors: [], strength: 0 });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    
    // Sanitize inputs based on field type
    if (field === 'fullName') {
      sanitizedValue = sanitizeInput(value, 100);
    } else if (field === 'email') {
      sanitizedValue = sanitizeInput(value, 320);
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Real-time password validation
    if (field === 'password') {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const validateForm = (isSignUp: boolean) => {
    // Email validation
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    // Password validation
    if (isSignUp && !passwordValidation.isValid) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive"
      });
      return false;
    }

    // Password confirmation for signup
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both password fields match.",
        variant: "destructive"
      });
      return false;
    }

    // Full name validation for signup
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

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign up failed",
          description: getGenericErrorMessage('auth'),
          variant: "destructive"
        });
      } else if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Smart Resume Builder!"
        });
        onAuthSuccess();
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

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Sign in failed",
          description: getGenericErrorMessage('auth'),
          variant: "destructive"
        });
      } else {
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

  return {
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
  };
};
