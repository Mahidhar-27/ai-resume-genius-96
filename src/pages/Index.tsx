import React, { useState, useEffect } from 'react';
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
import { Download, Sparkles, Save, LogOut, User, FileText, CheckCircle2, Palette } from 'lucide-react';
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

const ResumeBuilder = () => {
  const { user, signOut } = useAuth();
  const { currentResume, isLoading, isSaving, saveResume, convertToResumeData } = useResume();
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

  // Update resume data when current resume changes
  useEffect(() => {
    if (currentResume) {
      const convertedData = convertToResumeData(currentResume);
      console.log('Converting resume data:', convertedData);
      setResumeData(convertedData);
      if (currentResume.selected_template_id) {
        setSelectedTemplate({
          id: currentResume.selected_template_id,
          data: currentResume.custom_template_data
        });
      }
    }
  }, [currentResume, convertToResumeData]);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    console.log(`Updating ${section} with:`, data);
    setResumeData(prev => {
      const updated = {
        ...prev,
        [section]: data
      };
      console.log('Updated resume data:', updated);
      return updated;
    });
  };

  const handleTemplateSelect = (templateId: string, templateData: any) => {
    setSelectedTemplate({ id: templateId, data: templateData });
    toast({
      title: "Template selected",
      description: "Your resume template has been updated."
    });
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Professional Header */}
      <div className="bg-white border-b shadow-sm backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Resume Builder</h1>
                <p className="text-sm text-gray-600">Create professional resumes with AI assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleAISuggestions} className="gap-2 border-blue-200 hover:bg-blue-50">
                <Sparkles className="w-4 h-4" />
                AI Enhance
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave} 
                disabled={isSaving}
                className="gap-2 border-green-200 hover:bg-green-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2 border-red-200 hover:bg-red-50 text-red-600">
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
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-100 p-1 rounded-lg">
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
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
  const [showAuth, setShowAuth] = useState(true);

  return (
    <AuthProvider>
      <AuthWrapper onAuthSuccess={() => setShowAuth(false)} showAuth={showAuth} />
    </AuthProvider>
  );
};

const AuthWrapper: React.FC<{ onAuthSuccess: () => void; showAuth: boolean }> = ({ onAuthSuccess, showAuth }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Smart Resume Builder...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={onAuthSuccess} />;
  }

  return <ResumeBuilder />;
};

export default Index;
