import React from 'react';
import type { ResumeData } from '@/pages/Index';

interface ResumePreviewProps {
  data: ResumeData;
  templateData?: any;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateData }) => {
  const colors = templateData?.colors || { primary: '#2563eb', secondary: '#64748b' };
  const layout = templateData?.layout || 'modern';

  const renderModernLayout = () => (
    <div className="bg-white text-gray-800 font-sans leading-relaxed">
      {/* Header */}
      <div 
        className="text-white p-6"
        style={{ backgroundColor: colors.primary }}
      >
        <h1 className="text-3xl font-bold mb-2">{data.personalDetails.fullName || 'Your Name'}</h1>
        <div className="text-sm opacity-90 space-y-1">
          {data.personalDetails.email && <div>{data.personalDetails.email}</div>}
          {data.personalDetails.phone && <div>{data.personalDetails.phone}</div>}
          {data.personalDetails.location && <div>{data.personalDetails.location}</div>}
          {data.personalDetails.linkedin && <div>LinkedIn: {data.personalDetails.linkedin}</div>}
          {data.personalDetails.portfolio && <div>Portfolio: {data.personalDetails.portfolio}</div>}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        {data.personalDetails.summary && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalDetails.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{exp.duration}</div>
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{edu.year}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-600 hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 mb-1 whitespace-pre-wrap">{project.description}</p>
                  <p className="text-sm text-gray-500">Technologies: {project.technologies}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.languages.length > 0 || 
          data.skills.frameworks.length > 0 || data.skills.tools.length > 0) && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.frameworks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.frameworks.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.languages.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.languages.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.tools.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.tools.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderClassicLayout = () => (
    <div className="bg-white text-gray-800 font-serif leading-relaxed p-8">
      {/* Header */}
      <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: colors.primary }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
          {data.personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-x-4">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>•</span>}
          {data.personalDetails.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails.location && <span>•</span>}
          {data.personalDetails.location && <span>{data.personalDetails.location}</span>}
          {data.personalDetails.linkedin && (
            <>
              <span>•</span>
              <span>LinkedIn: {data.personalDetails.linkedin}</span>
            </>
          )}
          {data.personalDetails.portfolio && (
            <>
              <span>•</span>
              <span>Portfolio: {data.personalDetails.portfolio}</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {data.personalDetails.summary && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.personalDetails.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold">{exp.title} - {exp.company}</h3>
                    <span className="text-gray-600">{exp.duration}</span>
                  </div>
                  {exp.location && <p className="text-gray-600 text-sm mb-2">{exp.location}</p>}
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <span className="font-semibold">{edu.degree}</span>
                    <span className="text-gray-600"> - {edu.institution}</span>
                  </div>
                  <span className="text-gray-600">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.languages.length > 0) && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
              Skills
            </h2>
            <div className="text-gray-700">
              {data.skills.technical.length > 0 && (
                <p><strong>Technical:</strong> {data.skills.technical.join(', ')}</p>
              )}
              {data.skills.frameworks.length > 0 && (
                <p><strong>Frameworks:</strong> {data.skills.frameworks.join(', ')}</p>
              )}
              {data.skills.languages.length > 0 && (
                <p><strong>Languages:</strong> {data.skills.languages.join(', ')}</p>
              )}
              {data.skills.tools.length > 0 && (
                <p><strong>Tools:</strong> {data.skills.tools.join(', ')}</p>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  <p className="text-sm text-gray-600">Technologies: {project.technologies}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg" style={{ aspectRatio: '8.5/11' }}>
      {layout === 'classic' ? renderClassicLayout() : renderModernLayout()}
    </div>
  );
};

export default ResumePreview;
