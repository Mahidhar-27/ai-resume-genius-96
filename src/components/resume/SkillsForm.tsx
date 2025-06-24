
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, X, Code, Globe, Wrench, Monitor } from 'lucide-react';
import { validateTextLength } from '@/utils/validation';
import { useToast } from '@/components/ui/use-toast';

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
  const [newSkills, setNewSkills] = useState({
    technical: '',
    languages: '',
    frameworks: '',
    tools: ''
  });
  const { toast } = useToast();

  const addSkill = (category: keyof Skills) => {
    const skill = newSkills[category].trim();
    
    if (!skill) return;

    // No sanitization - allow spaces and special characters
    if (!validateTextLength(skill, 50)) {
      toast({
        title: "Skill name too long",
        description: "Skill names must be less than 50 characters.",
        variant: "destructive"
      });
      return;
    }

    if (data[category].includes(skill)) {
      toast({
        title: "Duplicate skill",
        description: "This skill is already added.",
        variant: "destructive"
      });
      return;
    }

    onChange({
      ...data,
      [category]: [...data[category], skill]
    });

    setNewSkills({ ...newSkills, [category]: '' });
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const updateNewSkill = (category: keyof Skills, value: string) => {
    // No sanitization - allow spaces and all characters
    if (value.length <= 50) {
      setNewSkills({ ...newSkills, [category]: value });
    }
  };

  const skillCategories = [
    {
      key: 'technical' as keyof Skills,
      title: 'Technical Skills',
      icon: Code,
      placeholder: 'JavaScript, Python, SQL',
      color: 'blue'
    },
    {
      key: 'languages' as keyof Skills,
      title: 'Programming Languages',
      icon: Globe,
      placeholder: 'JavaScript, TypeScript, Python',
      color: 'green'
    },
    {
      key: 'frameworks' as keyof Skills,
      title: 'Frameworks & Libraries',
      icon: Monitor,
      placeholder: 'React, Node.js, Express',
      color: 'purple'
    },
    {
      key: 'tools' as keyof Skills,
      title: 'Tools & Technologies',
      icon: Wrench,
      placeholder: 'Git, Docker, AWS',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {skillCategories.map(({ key, title, icon: Icon, placeholder, color }) => (
        <Card key={key} className="p-6 border border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Icon className={`w-4 h-4 text-${color}-600`} />
            <h4 className="font-medium text-gray-900">{title}</h4>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder={placeholder}
                  value={newSkills[key]}
                  onChange={(e) => updateNewSkill(key, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, key)}
                  className="border-gray-200 focus:border-blue-500"
                  maxLength={50}
                />
              </div>
              <Button
                type="button"
                onClick={() => addSkill(key)}
                disabled={!newSkills[key].trim()}
                className={`bg-${color}-600 hover:bg-${color}-700 text-white`}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {data[key].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`bg-${color}-100 text-${color}-800 hover:bg-${color}-200 pr-1`}
                >
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(key, skill)}
                    className="ml-1 p-0 h-auto w-4 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {data[key].length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No {title.toLowerCase()} added yet. Type a skill and press Enter or click + to add.
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SkillsForm;
