
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';
import type { ResumeData } from '@/pages/Index';

interface Resume {
  id: string;
  title: string;
  personal_details: any;
  education: any[];
  experience: any[];
  projects: any[];
  skills: any;
  template_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useResume = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load user's resumes
  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user]);

  const loadResumes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setResumes(data || []);
      
      // Set the first resume as current, or create a new one if none exists
      if (data && data.length > 0) {
        setCurrentResume(data[0]);
      } else {
        await createNewResume();
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
      toast({
        title: "Error loading resumes",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewResume = async (title = 'My Resume') => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title,
          personal_details: {},
          education: [],
          experience: [],
          projects: [],
          skills: { technical: [], languages: [], frameworks: [], tools: [] }
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentResume(data);
      setResumes(prev => [data, ...prev]);
      
      toast({
        title: "New resume created",
        description: "You can now start building your resume."
      });

      return data;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error creating resume",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveResume = async (resumeData: ResumeData) => {
    if (!user || !currentResume) return;

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          personal_details: resumeData.personalDetails,
          education: resumeData.education,
          experience: resumeData.experience,
          projects: resumeData.projects,
          skills: resumeData.skills,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentResume.id);

      if (error) throw error;

      toast({
        title: "Resume saved",
        description: "Your changes have been saved successfully."
      });

      // Refresh the current resume data
      await loadResumes();
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error saving resume",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const convertToResumeData = (resume: Resume | null): ResumeData => {
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

    return {
      personalDetails: {
        fullName: resume.personal_details?.fullName || '',
        email: resume.personal_details?.email || '',
        phone: resume.personal_details?.phone || '',
        location: resume.personal_details?.location || '',
        linkedin: resume.personal_details?.linkedin || '',
        portfolio: resume.personal_details?.portfolio || '',
        summary: resume.personal_details?.summary || ''
      },
      education: resume.education || [],
      experience: resume.experience || [],
      projects: resume.projects || [],
      skills: resume.skills || {
        technical: [],
        languages: [],
        frameworks: [],
        tools: []
      }
    };
  };

  return {
    currentResume,
    resumes,
    isLoading,
    isSaving,
    saveResume,
    createNewResume,
    convertToResumeData
  };
};
