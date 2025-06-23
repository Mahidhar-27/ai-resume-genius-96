
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerificationSuccess,
  onBack
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    console.log('Verifying OTP for email:', email, 'OTP:', otp);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      console.log('OTP verification response:', { data, error });

      if (error) {
        console.error('OTP verification error:', error);
        if (error.message.includes('expired')) {
          toast({
            title: "Code expired",
            description: "Your verification code has expired. Please request a new one.",
            variant: "destructive"
          });
        } else if (error.message.includes('invalid')) {
          toast({
            title: "Invalid code",
            description: "The verification code you entered is incorrect. Please try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Verification failed",
            description: error.message || "Invalid verification code. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        console.log('OTP verification successful');
        toast({
          title: "Email verified!",
          description: "Your account has been successfully verified."
        });
        onVerificationSuccess();
      }
    } catch (error) {
      console.error('OTP verification exception:', error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    console.log('Resending OTP for email:', email);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      console.log('Resend OTP response:', { error });

      if (error) {
        console.error('Resend OTP error:', error);
        toast({
          title: "Resend failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('OTP resent successfully');
        toast({
          title: "Verification code resent",
          description: "A new verification code has been sent to your email."
        });
        setOtp(''); // Clear the current OTP input
      }
    } catch (error) {
      console.error('Resend OTP exception:', error);
      toast({
        title: "Resend error",
        description: "Failed to resend verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPInput = (value: string) => {
    // Only allow digits and limit to 6 characters
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
    console.log('OTP input value:', sanitizedValue);
    setOtp(sanitizedValue);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium text-gray-900">{email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Check your inbox and spam folder for the verification code.
          </p>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => handleOTPInput(e.target.value)}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              required
              autoComplete="one-time-code"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Didn't receive the code?
          </p>
          <Button
            variant="outline"
            onClick={handleResendOTP}
            disabled={isResending}
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            {isResending ? 'Resending...' : 'Resend verification code'}
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default OTPVerification;
