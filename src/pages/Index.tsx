
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
import AuthForm from '@/components/auth/AuthForm';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useResume } from '@/hooks/useResume';
import { Download, Sparkles, Save, LogOut, User } from 'lucide-react';

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
  const [resumeData, setResumeData] = useState<ResumeData>(convertToResumeData(null));
  const [activeTab, setActiveTab] = useState('personal');

  // Update resume data when current resume changes
  useEffect(() => {
    if (currentResume) {
      setResumeData(convertToResumeData(currentResume));
    }
  }, [currentResume]);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async () => {
    await saveResume(resumeData);
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    console.log('Exporting resume as PDF...');
  };

  const handleAISuggestions = () => {
    // TODO: Implement AI suggestions
    console.log('Getting AI suggestions...');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Resume Builder</h1>
              <p className="text-gray-600">Create your professional resume with AI-powered suggestions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {user?.email}
              </div>
              <Button variant="outline" onClick={handleAISuggestions} className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Suggestions
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave} 
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">Personal Details</h3>
                  </div>
                  <PersonalDetailsForm 
                    data={resumeData.personalDetails}
                    onChange={(data) => updateResumeData('personalDetails', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <EducationForm 
                    data={resumeData.education}
                    onChange={(data) => updateResumeData('education', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                  </div>
                  <ExperienceForm 
                    data={resumeData.experience}
                    onChange={(data) => updateResumeData('experience', data)}
                  />
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">Projects</h3>
                  </div>
                  <ProjectsForm 
                    data={resumeData.projects}
                    onChange={(data) => updateResumeData('projects', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold">Skills & Technologies</h3>
                  </div>
                  <SkillsForm 
                    data={resumeData.skills}
                    onChange={(data) => updateResumeData('skills', data)}
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Progress Indicator */}
            <Card className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Resume Completion</span>
                <span>{calculateCompletion()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="text-sm text-gray-500">Modern Template</div>
              </div>
              <ResumePreview data={resumeData} />
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={onAuthSuccess} />;
  }

  return <ResumeBuilder />;
};

export default Index;
