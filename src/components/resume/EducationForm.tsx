
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { validateTextLength } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    };
    const updatedData = [...data, newEducation];
    console.log('Adding education:', updatedData);
    onChange(updatedData);
  };

  const removeEducation = (id: string) => {
    const updatedData = data.filter(edu => edu.id !== id);
    console.log('Removing education:', updatedData);
    onChange(updatedData);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    console.log(`Updating education ${id} field ${field}:`, value);
    
    // Allow spaces and special characters for education fields - no sanitization
    let isValid = true;

    // Apply field-specific validation without removing spaces
    switch (field) {
      case 'degree':
      case 'institution':
        if (value.length > 200) {
          isValid = false;
        }
        break;
      case 'year':
        if (value.length > 10) {
          isValid = false;
        }
        break;
      case 'gpa':
        if (value.length > 10) {
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      toast({
        title: "Input too long",
        description: "Please keep your input within the character limit.",
        variant: "destructive"
      });
      return;
    }

    const updatedData = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    console.log('Updated education data:', updatedData);
    onChange(updatedData);
  };

  return (
    <div className="space-y-4">
      {data.map((education) => (
        <Card key={education.id} className="p-4 border-l-4 border-l-green-500">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Education Entry</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree/Program *</Label>
                <Input
                  placeholder="Bachelor of Science in Computer Science"
                  value={education.degree || ''}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  maxLength={200}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  placeholder="University of Technology"
                  value={education.institution || ''}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  maxLength={200}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Graduation Year *</Label>
                <Input
                  placeholder="2024"
                  value={education.year || ''}
                  onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  maxLength={10}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <Input
                  placeholder="3.8/4.0"
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 hover:border-green-500 hover:text-green-600 transition-colors duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;
