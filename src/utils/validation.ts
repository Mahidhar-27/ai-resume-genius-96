
// Password validation utility
export const validatePassword = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`At least ${minLength} characters`);
  }
  if (!hasUpperCase) {
    errors.push('One uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('One lowercase letter');
  }
  if (!hasNumber) {
    errors.push('One number');
  }
  if (!hasSpecialChar) {
    errors.push('One special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password, errors.length)
  };
};

const calculatePasswordStrength = (password: string, errorCount: number) => {
  if (password.length === 0) return 0;
  if (errorCount >= 4) return 1; // Very weak
  if (errorCount >= 3) return 2; // Weak
  if (errorCount >= 2) return 3; // Fair
  if (errorCount === 1) return 4; // Good
  return 5; // Strong
};

// Input sanitization utilities
export const sanitizeInput = (input: string, maxLength: number = 1000) => {
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, ''); // Basic XSS prevention
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 320; // RFC 5321 limit
};

export const validateUrl = (url: string) => {
  if (!url) return true; // Empty URLs are optional
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Text length validation
export const validateTextLength = (text: string, maxLength: number) => {
  return text.length <= maxLength;
};

export const getGenericErrorMessage = (type: 'auth' | 'validation' | 'network') => {
  switch (type) {
    case 'auth':
      return 'Authentication failed. Please check your credentials and try again.';
    case 'validation':
      return 'Please check your input and try again.';
    case 'network':
      return 'Something went wrong. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
