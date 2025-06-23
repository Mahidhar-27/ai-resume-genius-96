
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput, validateEmail, validateUrl, validateTextLength } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const updateField = (field: keyof PersonalDetails, value: string) => {
    console.log(`Updating ${field}:`, value);
    
    let sanitizedValue = value;
    let isValid = true;

    // Apply field-specific validation and sanitization
    switch (field) {
      case 'fullName':
        sanitizedValue = sanitizeInput(value, 100);
        if (!validateTextLength(sanitizedValue, 100)) isValid = false;
        break;
      case 'email':
        sanitizedValue = sanitizeInput(value, 320);
        if (sanitizedValue && !validateEmail(sanitizedValue)) {
          toast({
            title: "Invalid email format",
            description: "Please enter a valid email address.",
            variant: "destructive"
          });
          return;
        }
        break;
      case 'phone':
        sanitizedValue = sanitizeInput(value, 20);
        break;
      case 'location':
        sanitizedValue = sanitizeInput(value, 100);
        break;
      case 'linkedin':
      case 'portfolio':
        sanitizedValue = sanitizeInput(value, 500);
        if (sanitizedValue && !validateUrl(sanitizedValue)) {
          toast({
            title: "Invalid URL format",
            description: "Please enter a valid URL (e.g., https://example.com).",
            variant: "destructive"
          });
          return;
        }
        break;
      case 'summary':
        sanitizedValue = sanitizeInput(value, 1000);
        if (!validateTextLength(sanitizedValue, 1000)) {
          toast({
            title: "Summary too long",
            description: "Please keep your summary under 1000 characters.",
            variant: "destructive"
          });
          return;
        }
        break;
    }

    if (isValid) {
      const updatedData = {
        ...data,
        [field]: sanitizedValue
      };
      console.log('Updated personal details:', updatedData);
      onChange(updatedData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName || ''}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={100}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={320}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={data.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={20}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={data.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={100}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            value={data.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={500}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            placeholder="https://johndoe.com"
            value={data.portfolio || ''}
            onChange={(e) => updateField('portfolio', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            maxLength={500}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          placeholder="A brief summary of your professional background and career objectives..."
          value={data.summary || ''}
          onChange={(e) => updateField('summary', e.target.value)}
          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500">
          {(data.summary || '').length}/1000 characters - 2-3 sentences highlighting your key strengths and career goals
        </p>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
