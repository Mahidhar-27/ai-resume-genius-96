
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Code, ExternalLink } from 'lucide-react';
import { validateTextLength, validateUrl } from '@/utils/validation';
import { useToast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const { toast } = useToast();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    let maxLength = 1000;

    // Set appropriate max lengths for different fields
    switch (field) {
      case 'name':
        maxLength = 100;
        break;
      case 'technologies':
        maxLength = 200;
        break;
      case 'description':
        maxLength = 1000;
        break;
      case 'link':
        maxLength = 500;
        break;
    }

    // No sanitization - allow spaces and all characters
    // Validate length
    if (!validateTextLength(value, maxLength)) {
      toast({
        title: "Input too long",
        description: `${field} must be less than ${maxLength} characters.`,
        variant: "destructive"
      });
      return;
    }

    // Validate URL if it's a link field
    if (field === 'link' && value && !validateUrl(value)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive"
      });
      return;
    }

    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  return (
    <div className="space-y-6">
      {data.map((project) => (
        <Card key={project.id} className="p-6 border border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-600" />
              <h4 className="font-medium text-gray-900">Project</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${project.id}`} className="text-sm font-medium">Project Name</Label>
                <Input
                  id={`name-${project.id}`}
                  placeholder="My Awesome Project"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="border-gray-200 focus:border-blue-500"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`link-${project.id}`} className="text-sm font-medium">Project Link (Optional)</Label>
                <div className="relative">
                  <Input
                    id={`link-${project.id}`}
                    placeholder="https://github.com/username/project"
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    className="border-gray-200 focus:border-blue-500 pr-10"
                    maxLength={500}
                  />
                  {project.link && (
                    <ExternalLink className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`technologies-${project.id}`} className="text-sm font-medium">Technologies Used</Label>
              <Input
                id={`technologies-${project.id}`}
                placeholder="React, TypeScript, Tailwind CSS"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${project.id}`} className="text-sm font-medium">Project Description</Label>
              <Textarea
                id={`description-${project.id}`}
                placeholder="Describe what this project does, the problem it solves, and key features..."
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="min-h-[80px] border-gray-200 focus:border-blue-500 resize-none"
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 text-right">
                {project.description.length}/1000 characters
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
