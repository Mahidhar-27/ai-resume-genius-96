import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalDetailsForm from '@/components/resume/PersonalDetailsForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplateSelector from '@/components/resume/TemplateSelector';
import AuthForm from '@/components/auth/AuthForm';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useResume } from '@/hooks/useResume';
import { Download, Sparkles, Save, LogOut, User, FileText, CheckCircle2, Palette, Crown, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ResumeData {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
    location: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
}

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm text-blue-200 px-6 py-3 rounded-full border border-blue-400/30">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">AI POWERED RESUME BUILDER</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Build Your Dream
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Resume Today
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Create stunning, professional resumes with our AI-powered builder. Choose from beautiful templates, 
              get smart suggestions, and land your dream job faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setShowAuth(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                START BUILDING - FREE
              </Button>
              <p className="text-sm text-slate-400">No credit card required • 100% Free</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Suggestions</h3>
              <p className="text-slate-300">Get intelligent recommendations to improve your resume content and increase your chances of getting hired.</p>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Beautiful Templates</h3>
              <p className="text-slate-300">Choose from our collection of professionally designed templates that make your resume stand out.</p>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Export</h3>
              <p className="text-slate-300">Download your resume as a PDF instantly, ready to send to employers or upload to job boards.</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative max-w-md w-full">
            <Button
              variant="ghost"
              onClick={() => setShowAuth(false)}
              className="absolute -top-4 -right-4 w-8 h-8 p-0 bg-white/10 hover:bg-white/20 text-white rounded-full z-10"
            >
              ×
            </Button>
            <AuthForm onAuthSuccess={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeBuilder = () => {
  const { user, signOut } = useAuth();
  const { currentResume, isLoading, isSaving, saveResume } = useResume();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
      technical: [],
      languages: [],
      frameworks: [],
      tools: []
    }
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: string; data: any } | null>(null);
  const { toast } = useToast();

  const convertToResumeData = useCallback((resume: any): ResumeData => {
    if (!resume) {
      return {
        personalDetails: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          portfolio: '',
          summary: ''
        },
        education: [],
        experience: [],
        projects: [],
        skills: {
          technical: [],
          languages: [],
          frameworks: [],
          tools: []
        }
      };
    }

    const personalDetails = (resume.personal_details as any) || {};
    const education = Array.isArray(resume.education) ? resume.education as any[] : [];
    const experience = Array.isArray(resume.experience) ? resume.experience as any[] : [];
    const projects = Array.isArray(resume.projects) ? resume.projects as any[] : [];
    const skills = (resume.skills as any) || { technical: [], languages: [], frameworks: [], tools: [] };

    return {
      personalDetails: {
        fullName: personalDetails?.fullName || '',
        email: personalDetails?.email || '',
        phone: personalDetails?.phone || '',
        location: personalDetails?.location || '',
        linkedin: personalDetails?.linkedin || '',
        portfolio: personalDetails?.portfolio || '',
        summary: personalDetails?.summary || ''
      },
      education: education as ResumeData['education'],
      experience: experience as ResumeData['experience'],
      projects: projects as ResumeData['projects'],
      skills: {
        technical: Array.isArray(skills.technical) ? skills.technical : [],
        languages: Array.isArray(skills.languages) ? skills.languages : [],
        frameworks: Array.isArray(skills.frameworks) ? skills.frameworks : [],
        tools: Array.isArray(skills.tools) ? skills.tools : []
      }
    };
  }, []);

  // Initialize resume data only once when currentResume changes
  useEffect(() => {
    if (currentResume) {
      const convertedData = convertToResumeData(currentResume);
      setResumeData(convertedData);
      if (currentResume.selected_template_id) {
        setSelectedTemplate({
          id: currentResume.selected_template_id,
          data: currentResume.custom_template_data
        });
      }
    }
  }, [currentResume, convertToResumeData]);

  const updateResumeData = useCallback((section: keyof ResumeData, data: any) => {
    console.log(`Updating ${section} with:`, data);
    setResumeData(prev => {
      const updated = {
        ...prev,
        [section]: data
      };
      console.log('Updated resume data:', updated);
      return updated;
    });
  }, []);

  const handleTemplateSelect = useCallback((templateId: string, templateData: any) => {
    setSelectedTemplate({ id: templateId, data: templateData });
    toast({
      title: "Template selected",
      description: "Your resume template has been updated."
    });
  }, [toast]);

  const handleSave = async () => {
    try {
      console.log('Saving resume data:', resumeData);
      await saveResume(resumeData);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save failed",
        description: "Unable to save your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume - ${resumeData.personalDetails.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { background: ${selectedTemplate?.data?.colors?.primary || '#2563eb'}; color: white; padding: 20px; }
            .section { margin: 20px 0; }
            .section h2 { color: ${selectedTemplate?.data?.colors?.primary || '#2563eb'}; border-bottom: 1px solid #ccc; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${resumeData.personalDetails.fullName || 'Your Name'}</h1>
            <p>${resumeData.personalDetails.email} | ${resumeData.personalDetails.phone} | ${resumeData.personalDetails.location}</p>
          </div>
          ${resumeData.personalDetails.summary ? `
            <div class="section">
              <h2>Professional Summary</h2>
              <p>${resumeData.personalDetails.summary}</p>
            </div>
          ` : ''}
          ${resumeData.experience.length > 0 ? `
            <div class="section">
              <h2>Experience</h2>
              ${resumeData.experience.map(exp => `
                <div style="margin-bottom: 15px;">
                  <h3>${exp.title} - ${exp.company}</h3>
                  <p><em>${exp.duration} | ${exp.location}</em></p>
                  <p>${exp.description}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${resumeData.education.length > 0 ? `
            <div class="section">
              <h2>Education</h2>
              ${resumeData.education.map(edu => `
                <p><strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})</p>
              `).join('')}
            </div>
          ` : ''}
          ${resumeData.skills.technical.length > 0 ? `
            <div class="section">
              <h2>Skills</h2>
              <p><strong>Technical:</strong> ${resumeData.skills.technical.join(', ')}</p>
              ${resumeData.skills.frameworks.length > 0 ? `<p><strong>Frameworks:</strong> ${resumeData.skills.frameworks.join(', ')}</p>` : ''}
              ${resumeData.skills.languages.length > 0 ? `<p><strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}</p>` : ''}
              ${resumeData.skills.tools.length > 0 ? `<p><strong>Tools:</strong> ${resumeData.skills.tools.join(', ')}</p>` : ''}
            </div>
          ` : ''}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    
    toast({
      title: "Export initiated",
      description: "Your resume is being prepared for download. Use your browser's print dialog to save as PDF."
    });
  };

  const handleAISuggestions = () => {
    const suggestions = [
      "Consider adding quantifiable achievements to your experience descriptions",
      "Your summary could benefit from highlighting your top 3 skills",
      "Add more technical skills relevant to your target role",
      "Include links to your portfolio projects"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    toast({
      title: "AI Suggestion",
      description: randomSuggestion,
      duration: 5000
    });
  };

  const calculateCompletion = () => {
    let completed = 0;
    let total = 5;

    if (resumeData.personalDetails.fullName && resumeData.personalDetails.email) completed++;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.experience.length > 0) completed++;
    if (resumeData.projects.length > 0) completed++;
    if (resumeData.skills.technical.length > 0 || resumeData.skills.languages.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'personal': return <User className="w-4 h-4" />;
      case 'education': return <FileText className="w-4 h-4" />;
      case 'experience': return <CheckCircle2 className="w-4 h-4" />;
      case 'projects': return <Sparkles className="w-4 h-4" />;
      case 'skills': return <FileText className="w-4 h-4" />;
      case 'templates': return <Palette className="w-4 h-4" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Professional Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Powered Resume Builder</h1>
                <p className="text-sm text-slate-300">Modern, Professional and FREE</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleAISuggestions} className="gap-2 border-blue-400/30 hover:bg-blue-500/10 text-blue-200">
                <Sparkles className="w-4 h-4" />
                AI Enhance
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave} 
                disabled={isSaving}
                className="gap-2 border-green-400/30 hover:bg-green-500/10 text-green-200"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2 border-red-400/30 hover:bg-red-500/10 text-red-200">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <Card className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6 bg-slate-100 p-1 rounded-lg">
                  <TabsTrigger value="personal" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('personal')}
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('education')}
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('experience')}
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('projects')}
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('skills')}
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    {getTabIcon('templates')}
                    Templates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-600">Add your basic contact details and professional summary</p>
                    </div>
                  </div>
                  <PersonalDetailsForm 
                    data={resumeData.personalDetails}
                    onChange={(data) => updateResumeData('personalDetails', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Education Background</h3>
                      <p className="text-sm text-gray-600">List your academic qualifications and achievements</p>
                    </div>
                  </div>
                  <EducationForm 
                    data={resumeData.education}
                    onChange={(data) => updateResumeData('education', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                      <p className="text-sm text-gray-600">Showcase your professional experience and achievements</p>
                    </div>
                  </div>
                  <ExperienceForm 
                    data={resumeData.experience}
                    onChange={(data) => updateResumeData('experience', data)}
                  />
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Projects & Portfolio</h3>
                      <p className="text-sm text-gray-600">Highlight your key projects and technical work</p>
                    </div>
                  </div>
                  <ProjectsForm 
                    data={resumeData.projects}
                    onChange={(data) => updateResumeData('projects', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Skills & Technologies</h3>
                      <p className="text-sm text-gray-600">List your technical skills and competencies</p>
                    </div>
                  </div>
                  <SkillsForm 
                    data={resumeData.skills}
                    onChange={(data) => updateResumeData('skills', data)}
                  />
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <TemplateSelector
                    selectedTemplateId={selectedTemplate?.id || null}
                    onTemplateSelect={handleTemplateSelect}
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Enhanced Progress Indicator */}
            <Card className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Resume Progress</h3>
                    <p className="text-sm text-gray-600">Complete all sections for best results</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{calculateCompletion()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-sm text-gray-600">Your resume updates in real-time</p>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {selectedTemplate?.id ? 'Custom Template' : 'Default Template'}
                </div>
              </div>
              <div className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden">
                <ResumePreview data={resumeData} templateData={selectedTemplate?.data} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

const AuthWrapper: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading Smart Resume Builder...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <ResumeBuilder />;
};

export default Index;
