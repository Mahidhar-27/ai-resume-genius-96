
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Palette, Sparkles, FileText, Briefcase, User, Star, Crown, Diamond } from 'lucide-react';

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
      const defaultTemplates = [
        {
          id: 'modern',
          name: 'Modern Professional',
          description: 'Clean and modern design perfect for tech professionals',
          template_data: { layout: 'modern', colors: { primary: '#1e3a8a', secondary: '#3b82f6' } },
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
          id: 'navy-elite',
          name: 'Navy Elite',
          description: 'Premium navy blue design with elegant white styling',
          template_data: { layout: 'navy-elite', colors: { primary: '#0f172a', secondary: '#1e293b' } },
          is_premium: true,
          category: 'PREMIUM'
        },
        {
          id: 'creative',
          name: 'Creative Design',
          description: 'Eye-catching design for creative professionals',
          template_data: { layout: 'creative', colors: { primary: '#7c3aed', secondary: '#a78bfa' } },
          is_premium: true,
          category: 'CREATIVE'
        },
        {
          id: 'minimal',
          name: 'Minimal Clean',
          description: 'Simple and clean layout focusing on content',
          template_data: { layout: 'minimal', colors: { primary: '#059669', secondary: '#10b981' } },
          is_premium: false,
          category: 'SIMPLE'
        },
        {
          id: 'executive',
          name: 'Executive Suite',
          description: 'Professional template for senior management roles',
          template_data: { layout: 'executive', colors: { primary: '#991b1b', secondary: '#dc2626' } },
          is_premium: true,
          category: 'EXECUTIVE'
        },
        {
          id: 'tech',
          name: 'Tech Specialist',
          description: 'Perfect for software developers and engineers',
          template_data: { layout: 'tech', colors: { primary: '#1e40af', secondary: '#3b82f6' } },
          is_premium: false,
          category: 'TECH'
        },
        {
          id: 'academic',
          name: 'Academic Scholar',
          description: 'Ideal for researchers and academic positions',
          template_data: { layout: 'academic', colors: { primary: '#7c2d12', secondary: '#ea580c' } },
          is_premium: true,
          category: 'ACADEMIC'
        },
        {
          id: 'startup',
          name: 'Startup Ready',
          description: 'Dynamic template for startup environments',
          template_data: { layout: 'startup', colors: { primary: '#be185d', secondary: '#ec4899' } },
          is_premium: false,
          category: 'STARTUP'
        },
        {
          id: 'luxury',
          name: 'Luxury Gold',
          description: 'Premium gold and black design for luxury brands',
          template_data: { layout: 'luxury', colors: { primary: '#d97706', secondary: '#f59e0b' } },
          is_premium: true,
          category: 'LUXURY'
        },
        {
          id: 'gradient',
          name: 'Gradient Pro',
          description: 'Modern gradient design with stunning visuals',
          template_data: { layout: 'gradient', colors: { primary: '#6366f1', secondary: '#8b5cf6' } },
          is_premium: true,
          category: 'MODERN'
        },
        {
          id: 'corporate',
          name: 'Corporate Blue',
          description: 'Professional corporate design in blue tones',
          template_data: { layout: 'corporate', colors: { primary: '#1d4ed8', secondary: '#3b82f6' } },
          is_premium: false,
          category: 'CORPORATE'
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
      case 'navy-elite': return <Crown className="w-5 h-5" />;
      case 'luxury': return <Diamond className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getEnhancedTemplatePreview = (template: Template) => {
    const colors = getTemplateColors(template.template_data);
    
    return (
      <div className="w-full h-56 bg-white border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div 
          className="h-16 w-full flex items-center justify-between px-6"
          style={{ 
            background: template.id === 'navy-elite' ? 
              'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 
              `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
          }}
        >
          <div className="w-20 h-3 bg-white rounded-full opacity-90"></div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            {getTemplateIcon(template.id)}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="w-32 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <div className="w-4/5 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-3/5 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-6 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-20 h-6 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-14 h-6 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg">Loading beautiful templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-6 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          AI POWERED
        </div>
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          Beautiful Resume Templates
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Choose from our collection of professionally designed templates. Each template is crafted to make your resume stand out and get you noticed by recruiters.
        </p>
        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Crown className="w-5 h-5 mr-2" />
            START BUILDING - FREE
          </Button>
        </div>
      </div>

      {/* Enhanced Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`group relative p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white border-2 rounded-2xl ${
              selectedTemplateId === template.id 
                ? 'ring-4 ring-blue-500 shadow-2xl transform scale-105 border-blue-300' 
                : 'hover:shadow-xl hover:transform hover:scale-102 border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => onTemplateSelect(template.id, template.template_data)}
          >
            {selectedTemplateId === template.id && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}

            <div className="space-y-6">
              {getEnhancedTemplatePreview(template)}
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      {getTemplateIcon(template.id)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{template.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{template.category}</p>
                    </div>
                  </div>
                  {template.is_premium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                
                <Button 
                  className={`w-full font-semibold rounded-xl transition-all duration-200 ${
                    template.is_premium 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateSelect(template.id, template.template_data);
                  }}
                >
                  {template.is_premium ? (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Premium Template
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Free Template
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Palette className="w-16 h-16 mx-auto mb-6 opacity-50" />
          <p className="text-xl mb-2">No templates available</p>
          <p className="text-sm">Templates will be loaded automatically.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
