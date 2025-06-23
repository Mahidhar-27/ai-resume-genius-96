
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { sanitizeInput, validateTextLength, validateUrl } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  location: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: '',
      location: ''
    };
    const updatedData = [...data, newExperience];
    console.log('Adding experience:', updatedData); // Debug log
    onChange(updatedData);
  };

  const removeExperience = (id: string) => {
    const updatedData = data.filter(exp => exp.id !== id);
    console.log('Removing experience:', updatedData); // Debug log
    onChange(updatedData);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    console.log(`Updating experience ${id} field ${field}:`, value); // Debug log
    
    let sanitizedValue = value;
    let maxLength = 1000;

    // Set appropriate max lengths for different fields
    switch (field) {
      case 'title':
      case 'company':
      case 'location':
        maxLength = 100;
        break;
      case 'duration':
        maxLength = 50;
        break;
      case 'description':
        maxLength = 2000;
        break;
    }

    // Sanitize input
    sanitizedValue = sanitizeInput(value, maxLength);

    // Validate length
    if (!validateTextLength(sanitizedValue, maxLength)) {
      toast({
        title: "Input too long",
        description: `${field} must be less than ${maxLength} characters.`,
        variant: "destructive"
      });
      return;
    }

    const updatedData = data.map(exp => 
      exp.id === id ? { ...exp, [field]: sanitizedValue } : exp
    );
    console.log('Updated experience data:', updatedData); // Debug log
    onChange(updatedData);
  };

  return (
    <div className="space-y-6">
      {data.map((experience) => (
        <Card key={experience.id} className="p-6 border border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-gray-900">Work Experience</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${experience.id}`} className="text-sm font-medium">Job Title</Label>
              <Input
                id={`title-${experience.id}`}
                placeholder="Software Engineer"
                value={experience.title || ''}
                onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`company-${experience.id}`} className="text-sm font-medium">Company</Label>
              <Input
                id={`company-${experience.id}`}
                placeholder="Tech Corp"
                value={experience.company || ''}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`duration-${experience.id}`} className="text-sm font-medium">Duration</Label>
              <Input
                id={`duration-${experience.id}`}
                placeholder="Jan 2020 - Present"
                value={experience.duration || ''}
                onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`location-${experience.id}`} className="text-sm font-medium">Location</Label>
              <Input
                id={`location-${experience.id}`}
                placeholder="San Francisco, CA"
                value={experience.location || ''}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
                maxLength={100}
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`description-${experience.id}`} className="text-sm font-medium">Job Description</Label>
            <Textarea
              id={`description-${experience.id}`}
              placeholder="Describe your responsibilities and achievements..."
              value={experience.description || ''}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              className="min-h-[100px] border-gray-200 focus:border-blue-500 resize-none"
              maxLength={2000}
            />
            <div className="text-xs text-gray-500 text-right">
              {(experience.description || '').length}/2000 characters
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
