
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Palette, Sparkles, FileText, Briefcase, User, Star, Crown, Diamond, Building, Zap, Shield, Target, Rocket, Award } from 'lucide-react';

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
          id: 'executive-pro',
          name: 'Executive Professional',
          description: 'Premium executive template with sophisticated navy blue design and clean white typography',
          template_data: { layout: 'executive-pro', colors: { primary: '#1e3a8a', secondary: '#3b82f6', accent: '#ffffff', text: '#1f2937' } },
          is_premium: true,
          category: 'EXECUTIVE'
        },
        {
          id: 'modern-classic',
          name: 'Modern Classic',
          description: 'Timeless design combining modern aesthetics with classic professionalism',
          template_data: { layout: 'modern-classic', colors: { primary: '#0f172a', secondary: '#475569', accent: '#f8fafc', text: '#334155' } },
          is_premium: false,
          category: 'PROFESSIONAL'
        },
        {
          id: 'tech-leader',
          name: 'Tech Leadership',
          description: 'Perfect for senior tech roles with clean lines and technical focus',
          template_data: { layout: 'tech-leader', colors: { primary: '#1e40af', secondary: '#2563eb', accent: '#eff6ff', text: '#1e293b' } },
          is_premium: true,
          category: 'TECHNOLOGY'
        },
        {
          id: 'corporate-elite',
          name: 'Corporate Elite',
          description: 'High-end corporate design for C-level and senior management positions',
          template_data: { layout: 'corporate-elite', colors: { primary: '#1f2937', secondary: '#4b5563', accent: '#f9fafb', text: '#111827' } },
          is_premium: true,
          category: 'CORPORATE'
        },
        {
          id: 'consulting-pro',
          name: 'Consulting Professional',
          description: 'Sophisticated template designed for consulting and advisory roles',
          template_data: { layout: 'consulting-pro', colors: { primary: '#164e63', secondary: '#0891b2', accent: '#f0f9ff', text: '#0c4a6e' } },
          is_premium: false,
          category: 'CONSULTING'
        },
        {
          id: 'finance-executive',
          name: 'Finance Executive',
          description: 'Professional template tailored for finance and banking professionals',
          template_data: { layout: 'finance-executive', colors: { primary: '#134e4a', secondary: '#14b8a6', accent: '#f0fdfa', text: '#042f2e' } },
          is_premium: true,
          category: 'FINANCE'
        },
        {
          id: 'minimalist-pro',
          name: 'Minimalist Professional',
          description: 'Clean, minimal design focusing on content and readability',
          template_data: { layout: 'minimalist-pro', colors: { primary: '#374151', secondary: '#6b7280', accent: '#ffffff', text: '#1f2937' } },
          is_premium: false,
          category: 'MINIMAL'
        },
        {
          id: 'creative-director',
          name: 'Creative Director',
          description: 'Elegant template for creative leadership and design roles',
          template_data: { layout: 'creative-director', colors: { primary: '#581c87', secondary: '#8b5cf6', accent: '#faf5ff', text: '#4c1d95' } },
          is_premium: true,
          category: 'CREATIVE'
        },
        {
          id: 'startup-founder',
          name: 'Startup Founder',
          description: 'Dynamic template perfect for entrepreneurs and startup professionals',
          template_data: { layout: 'startup-founder', colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#fef2f2', text: '#991b1b' } },
          is_premium: false,
          category: 'STARTUP'
        },
        {
          id: 'academic-scholar',
          name: 'Academic Scholar',
          description: 'Refined template for academic, research, and educational professionals',
          template_data: { layout: 'academic-scholar', colors: { primary: '#92400e', secondary: '#d97706', accent: '#fffbeb', text: '#78350f' } },
          is_premium: true,
          category: 'ACADEMIC'
        },
        {
          id: 'healthcare-pro',
          name: 'Healthcare Professional',
          description: 'Clean, trustworthy design for medical and healthcare professionals',
          template_data: { layout: 'healthcare-pro', colors: { primary: '#065f46', secondary: '#10b981', accent: '#ecfdf5', text: '#064e3b' } },
          is_premium: false,
          category: 'HEALTHCARE'
        },
        {
          id: 'luxury-brand',
          name: 'Luxury Brand Manager',
          description: 'Premium template with golden accents for luxury brand professionals',
          template_data: { layout: 'luxury-brand', colors: { primary: '#a16207', secondary: '#eab308', accent: '#fffef7', text: '#713f12' } },
          is_premium: true,
          category: 'LUXURY'
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
    return templateData?.colors || { primary: '#2563eb', secondary: '#64748b', accent: '#ffffff', text: '#1f2937' };
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'executive-pro': return <Crown className="w-5 h-5" />;
      case 'modern-classic': return <FileText className="w-5 h-5" />;
      case 'tech-leader': return <Zap className="w-5 h-5" />;
      case 'corporate-elite': return <Building className="w-5 h-5" />;
      case 'consulting-pro': return <Target className="w-5 h-5" />;
      case 'finance-executive': return <Shield className="w-5 h-5" />;
      case 'minimalist-pro': return <User className="w-5 h-5" />;
      case 'creative-director': return <Palette className="w-5 h-5" />;
      case 'startup-founder': return <Rocket className="w-5 h-5" />;
      case 'academic-scholar': return <Award className="w-5 h-5" />;
      case 'healthcare-pro': return <Star className="w-5 h-5" />;
      case 'luxury-brand': return <Diamond className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getEnhancedTemplatePreview = (template: Template) => {
    const colors = getTemplateColors(template.template_data);
    
    return (
      <div className="w-full h-64 bg-white border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div 
          className="h-20 w-full flex items-center justify-between px-6"
          style={{ 
            background: template.id === 'executive-pro' ? 
              'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' : 
              `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
          }}
        >
          <div className="space-y-1">
            <div className="w-24 h-4 bg-white rounded-full opacity-95"></div>
            <div className="w-16 h-2 bg-white/70 rounded-full"></div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            {getTemplateIcon(template.id)}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="w-32 h-3 bg-gray-800 rounded-full"></div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-gray-300 rounded-full"></div>
              <div className="w-4/5 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3/5 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-3 bg-gray-600 rounded-full"></div>
            <div className="flex gap-2">
              <div className="w-16 h-5 rounded-full" style={{ backgroundColor: colors.secondary, opacity: 0.8 }}></div>
              <div className="w-20 h-5 rounded-full" style={{ backgroundColor: colors.secondary, opacity: 0.8 }}></div>
              <div className="w-14 h-5 rounded-full" style={{ backgroundColor: colors.secondary, opacity: 0.8 }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-600 text-xl">Loading Professional Templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-8 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-100">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
          <Sparkles className="w-5 h-5" />
          PROFESSIONAL RESUME TEMPLATES
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Stand Out with Premium Design
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-xl leading-relaxed">
            Choose from our collection of professionally crafted resume templates. Each design is optimized to help you land interviews and advance your career.
          </p>
        </div>
        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Crown className="w-6 h-6 mr-3" />
            CREATE YOUR RESUME NOW
          </Button>
        </div>
      </div>

      {/* Professional Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`group relative p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white border-2 rounded-3xl ${
              selectedTemplateId === template.id 
                ? 'ring-4 ring-blue-500 shadow-2xl transform scale-105 border-blue-300 bg-blue-50/30' 
                : 'hover:shadow-xl hover:transform hover:scale-102 border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onTemplateSelect(template.id, template.template_data)}
          >
            {selectedTemplateId === template.id && (
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
            )}

            <div className="space-y-6">
              {getEnhancedTemplatePreview(template)}
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      {getTemplateIcon(template.id)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">{template.name}</h4>
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{template.category}</p>
                    </div>
                  </div>
                  {template.is_premium && (
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                
                <Button 
                  className={`w-full font-bold rounded-xl py-3 transition-all duration-200 ${
                    template.is_premium 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateSelect(template.id, template.template_data);
                  }}
                >
                  {template.is_premium ? (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Select Premium Template
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Select Free Template
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Palette className="w-20 h-20 mx-auto mb-8 opacity-50" />
          <p className="text-2xl mb-3">No templates available</p>
          <p className="text-lg">Templates will be loaded automatically.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
