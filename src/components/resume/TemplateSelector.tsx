
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Palette, Sparkles, FileText, Briefcase, User, Star } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  template_data: any;
  is_premium: boolean;
  category: string;
}

interface TemplateSelectorProps {
  selectedTemplateId: string | null;
  onTemplateSelect: (templateId: string, templateData: any) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onTemplateSelect
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      // Extended templates collection
      const defaultTemplates = [
        {
          id: 'modern',
          name: 'Modern Professional',
          description: 'Clean and modern design perfect for tech professionals',
          template_data: { layout: 'modern', colors: { primary: '#2563eb', secondary: '#64748b' } },
          is_premium: false,
          category: 'RESUME BUILDER'
        },
        {
          id: 'classic',
          name: 'Classic Business',
          description: 'Traditional format ideal for corporate positions',
          template_data: { layout: 'classic', colors: { primary: '#1f2937', secondary: '#6b7280' } },
          is_premium: false,
          category: 'RESUME BUILDER'
        },
        {
          id: 'creative',
          name: 'Creative Design',
          description: 'Eye-catching design for creative professionals',
          template_data: { layout: 'creative', colors: { primary: '#7c3aed', secondary: '#a78bfa' } },
          is_premium: true,
          category: 'RESUME BUILDER'
        },
        {
          id: 'minimal',
          name: 'Minimal Clean',
          description: 'Simple and clean layout focusing on content',
          template_data: { layout: 'minimal', colors: { primary: '#059669', secondary: '#10b981' } },
          is_premium: false,
          category: 'RESUME BUILDER'
        },
        {
          id: 'executive',
          name: 'Executive Suite',
          description: 'Professional template for senior management roles',
          template_data: { layout: 'executive', colors: { primary: '#991b1b', secondary: '#dc2626' } },
          is_premium: true,
          category: 'RESUME BUILDER'
        },
        {
          id: 'tech',
          name: 'Tech Specialist',
          description: 'Perfect for software developers and engineers',
          template_data: { layout: 'tech', colors: { primary: '#1e40af', secondary: '#3b82f6' } },
          is_premium: false,
          category: 'RESUME BUILDER'
        },
        {
          id: 'academic',
          name: 'Academic Scholar',
          description: 'Ideal for researchers and academic positions',
          template_data: { layout: 'academic', colors: { primary: '#7c2d12', secondary: '#ea580c' } },
          is_premium: true,
          category: 'RESUME BUILDER'
        },
        {
          id: 'startup',
          name: 'Startup Ready',
          description: 'Dynamic template for startup environments',
          template_data: { layout: 'startup', colors: { primary: '#be185d', secondary: '#ec4899' } },
          is_premium: false,
          category: 'RESUME BUILDER'
        }
      ];
      
      setTemplates(defaultTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: "Error loading templates",
        description: "Using default templates instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateColors = (templateData: any) => {
    return templateData?.colors || { primary: '#2563eb', secondary: '#64748b' };
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'modern': return <FileText className="w-5 h-5" />;
      case 'classic': return <Briefcase className="w-5 h-5" />;
      case 'creative': return <Palette className="w-5 h-5" />;
      case 'minimal': return <User className="w-5 h-5" />;
      case 'executive': return <Star className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTemplatePreview = (template: Template) => {
    const colors = getTemplateColors(template.template_data);
    
    return (
      <div className="w-full h-48 bg-white border rounded-lg overflow-hidden shadow-sm">
        <div 
          className="h-12 w-full flex items-center px-4"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="w-16 h-2 bg-white rounded opacity-80"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="w-24 h-2 bg-gray-300 rounded"></div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-20 h-1 bg-gray-300 rounded"></div>
            <div className="w-full h-1 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="w-16 h-1 bg-gray-300 rounded"></div>
            <div className="w-full h-1 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">AI Powered Resume Builder - Modern, Professional and FREE</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Free AI-Powered Resume Builder, Smart Resume Builder, Interactive Online CV Builder, Cover Letter Builder, and More...
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
          START NOW - FREE
        </Button>
        <p className="text-sm text-gray-500">*You can start now for free (no credit card required)</p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`relative p-6 cursor-pointer transition-all duration-200 hover:shadow-xl bg-white ${
              selectedTemplateId === template.id 
                ? 'ring-2 ring-blue-500 shadow-xl transform scale-105' 
                : 'hover:shadow-lg hover:transform hover:scale-102'
            }`}
            onClick={() => onTemplateSelect(template.id, template.template_data)}
          >
            {selectedTemplateId === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="space-y-4">
              {getTemplatePreview(template)}
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTemplateIcon(template.id)}
                    <h4 className="font-bold text-gray-900 text-lg">{template.name}</h4>
                  </div>
                  {template.is_premium && (
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
                
                <div className="pt-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplateSelect(template.id, template.template_data);
                    }}
                  >
                    {template.category} Templates
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No templates available</p>
          <p className="text-sm">Templates will be loaded automatically.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
