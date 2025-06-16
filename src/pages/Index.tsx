
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalDetailsForm from '@/components/resume/PersonalDetailsForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Download, Sparkles, Save } from 'lucide-react';

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

const Index = () => {
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

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    console.log('Exporting resume as PDF...');
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving resume...');
  };

  const handleAISuggestions = () => {
    // TODO: Implement AI suggestions
    console.log('Getting AI suggestions...');
  };

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
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleAISuggestions} className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Suggestions
              </Button>
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export PDF
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
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
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

export default Index;
