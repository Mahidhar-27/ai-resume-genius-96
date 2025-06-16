
import React from 'react';
import { ResumeData } from '@/pages/Index';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalDetails, education, experience, projects, skills } = data;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 space-y-6 text-sm">
        {/* Header */}
        <div className="text-center border-b-2 border-blue-600 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalDetails.fullName || 'Your Full Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            {personalDetails.email && <span>{personalDetails.email}</span>}
            {personalDetails.phone && <span>{personalDetails.phone}</span>}
            {personalDetails.location && <span>{personalDetails.location}</span>}
          </div>
          {(personalDetails.linkedin || personalDetails.portfolio) && (
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-blue-600">
              {personalDetails.linkedin && <span>{personalDetails.linkedin}</span>}
              {personalDetails.portfolio && <span>{personalDetails.portfolio}</span>}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {personalDetails.summary && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalDetails.summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{edu.year}</p>
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                    </div>
                    <p className="text-gray-600">{exp.duration}</p>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-blue-600 text-xs">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                      {project.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2">
              {skills.technical.length > 0 && (
                <p>
                  <span className="font-medium text-gray-900">Technical Skills:</span>{' '}
                  <span className="text-gray-700">{skills.technical.join(', ')}</span>
                </p>
              )}
              {skills.languages.length > 0 && (
                <p>
                  <span className="font-medium text-gray-900">Programming Languages:</span>{' '}
                  <span className="text-gray-700">{skills.languages.join(', ')}</span>
                </p>
              )}
              {skills.frameworks.length > 0 && (
                <p>
                  <span className="font-medium text-gray-900">Frameworks & Libraries:</span>{' '}
                  <span className="text-gray-700">{skills.frameworks.join(', ')}</span>
                </p>
              )}
              {skills.tools.length > 0 && (
                <p>
                  <span className="font-medium text-gray-900">Tools & Technologies:</span>{' '}
                  <span className="text-gray-700">{skills.tools.join(', ')}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalDetails.fullName && !personalDetails.email && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Your resume preview will appear here</p>
            <p className="text-sm">Start by filling out your personal details in the form</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
