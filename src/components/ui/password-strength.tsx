
import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  strength: number;
  errors: string[];
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength, errors }) => {
  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return '';
    }
  };

  if (strength === 0) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={cn("h-2 rounded-full transition-all duration-300", getStrengthColor(strength))}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className={cn("text-xs font-medium", 
          strength <= 2 ? 'text-red-600' : 
          strength <= 3 ? 'text-yellow-600' : 
          strength <= 4 ? 'text-blue-600' : 'text-green-600'
        )}>
          {getStrengthText(strength)}
        </span>
      </div>
      
      {errors.length > 0 && (
        <div className="text-xs text-gray-600">
          <span className="font-medium">Required: </span>
          {errors.join(', ')}
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
