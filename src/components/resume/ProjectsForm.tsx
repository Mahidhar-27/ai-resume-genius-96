
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

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
    onChange(data.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  return (
    <div className="space-y-4">
      {data.map((project) => (
        <Card key={project.id} className="p-4 border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Project</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  placeholder="E-commerce Platform"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label>Project Link</Label>
                <Input
                  placeholder="https://github.com/username/project"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used *</Label>
              <Input
                placeholder="React, Node.js, MongoDB, Express.js"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500">Separate technologies with commas</p>
            </div>

            <div className="space-y-2">
              <Label>Project Description *</Label>
              <Textarea
                placeholder="• Built a full-stack e-commerce platform with user authentication&#10;• Implemented shopping cart functionality and payment integration&#10;• Achieved 99% uptime and optimized for mobile responsiveness"
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500">Highlight key features and achievements</p>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full border-dashed border-2 hover:border-orange-500 hover:text-orange-600 transition-colors duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
