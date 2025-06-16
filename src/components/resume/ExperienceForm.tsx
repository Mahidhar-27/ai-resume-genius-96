
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

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
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: '',
      location: ''
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <div className="space-y-4">
      {data.map((experience) => (
        <Card key={experience.id} className="p-4 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Work Experience</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  placeholder="Software Engineer"
                  value={experience.title}
                  onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  placeholder="Tech Company Inc."
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Input
                  placeholder="Jan 2022 - Present"
                  value={experience.duration}
                  onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="San Francisco, CA"
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description *</Label>
              <Textarea
                placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Implemented responsive designs and optimized application performance"
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500">Use bullet points to highlight key achievements and responsibilities</p>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 hover:border-purple-500 hover:text-purple-600 transition-colors duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
