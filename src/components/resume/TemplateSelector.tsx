
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, Palette, Sparkles } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  template_data: any;
  is_premium: boolean;
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
      const { data, error } = await supabase
        .from('resume_templates')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: "Error loading templates",
        description: "Failed to load resume templates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateColors = (templateData: any) => {
    return templateData?.colors || { primary: '#2563eb', secondary: '#64748b' };
  };

  const getTemplatePreview = (template: Template) => {
    const colors = getTemplateColors(template.template_data);
    const layout = template.template_data?.layout || 'modern';
    
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
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <Palette className="w-4 h-4 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Templates</h3>
          <p className="text-sm text-gray-600">Choose a template that best represents your professional style</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`relative p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplateId === template.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
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
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  {template.is_premium && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
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
