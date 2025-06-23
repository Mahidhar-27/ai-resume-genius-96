
-- Create a table for resume templates
CREATE TABLE public.resume_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview_image TEXT,
  template_data JSONB NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some default resume templates
INSERT INTO public.resume_templates (name, description, template_data) VALUES
('Modern Professional', 'Clean and modern design perfect for tech professionals', '{"layout": "modern", "colors": {"primary": "#2563eb", "secondary": "#64748b"}, "sections": ["header", "summary", "experience", "skills", "education", "projects"]}'),
('Classic Business', 'Traditional format ideal for corporate positions', '{"layout": "classic", "colors": {"primary": "#1f2937", "secondary": "#6b7280"}, "sections": ["header", "summary", "experience", "education", "skills", "projects"]}'),
('Creative Design', 'Eye-catching design for creative professionals', '{"layout": "creative", "colors": {"primary": "#7c3aed", "secondary": "#a78bfa"}, "sections": ["header", "summary", "projects", "experience", "skills", "education"]}'),
('Minimal Clean', 'Simple and clean layout focusing on content', '{"layout": "minimal", "colors": {"primary": "#059669", "secondary": "#10b981"}, "sections": ["header", "summary", "experience", "education", "skills"]}');

-- Enable RLS on resume_templates (public read access)
ALTER TABLE public.resume_templates ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read resume templates
CREATE POLICY "Anyone can view resume templates" 
  ON public.resume_templates 
  FOR SELECT 
  USING (true);

-- Add template selection to resumes table
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS selected_template_id UUID REFERENCES public.resume_templates(id);
ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS custom_template_data JSONB;
