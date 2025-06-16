
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface Skills {
  technical: string[];
  languages: string[];
  frameworks: string[];
  tools: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkillInputs, setNewSkillInputs] = useState({
    technical: '',
    languages: '',
    frameworks: '',
    tools: ''
  });

  const addSkill = (category: keyof Skills) => {
    const skill = newSkillInputs[category].trim();
    if (skill && !data[category].includes(skill)) {
      onChange({
        ...data,
        [category]: [...data[category], skill]
      });
      setNewSkillInputs({
        ...newSkillInputs,
        [category]: ''
      });
    }
  };

  const removeSkill = (category: keyof Skills, skill: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(s => s !== skill)
    });
  };

  const handleInputChange = (category: keyof Skills, value: string) => {
    setNewSkillInputs({
      ...newSkillInputs,
      [category]: value
    });
  };

  const handleKeyPress = (category: keyof Skills, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const SkillSection = ({ 
    title, 
    category, 
    placeholder, 
    color 
  }: { 
    title: string; 
    category: keyof Skills; 
    placeholder: string;
    color: string;
  }) =>  (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newSkillInputs[category]}
          onChange={(e) => handleInputChange(category, e.target.value)}
          onKeyPress={(e) => handleKeyPress(category, e)}
          className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-red-500"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => addSkill(category)}
          className={`${color} hover:opacity-90`}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data[category].map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            {skill}
            <button
              onClick={() => removeSkill(category, skill)}
              className="ml-2 hover:text-red-500"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SkillSection
        title="Technical Skills"
        category="technical"
        placeholder="JavaScript, Python, SQL..."
        color="bg-blue-600"
      />
      
      <SkillSection
        title="Programming Languages"
        category="languages"
        placeholder="Java, C++, TypeScript..."
        color="bg-green-600"
      />
      
      <SkillSection
        title="Frameworks & Libraries"
        category="frameworks"
        placeholder="React, Angular, Django..."
        color="bg-purple-600"
      />
      
      <SkillSection
        title="Tools & Technologies"
        category="tools"
        placeholder="Git, Docker, AWS..."
        color="bg-orange-600"
      />

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Add skills that are relevant to your target job. Press Enter or click the + button to add each skill.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
