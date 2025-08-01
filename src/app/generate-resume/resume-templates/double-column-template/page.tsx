'use client'
import FormStandardTemplate from '@/components/generate-resume/resume-templates/standard-template/form-standard-template'
import { useRef } from 'react'
import { FileDown } from 'lucide-react'
import ReactToPrint from 'react-to-print';
import { useGenerateResumeStore } from '@/store/generate-resume-store'
import TemplateSwitcher from '@/components/generate-resume/template-switcher'
import AutoSave from '@/components/generate-resume/auto-save'

const DoubleColumnTemplate = () => {
  const {
    basicDetails,
    education,
    technicalExperience,
    skills,
    projects,
    certificates,
    achievements,
    setBasicDetails,
    setEducation,
    setTechnicalExperience,
    setSkills,
    setProjects,
    setCertificates,
    setAchievements,
  } = useGenerateResumeStore();

  const resumeDownloadRef = useRef(null);

  return (
    <div className='flex gap-10 h-screen p-4 px-14 overflow-hidden'>
      <div className='flex-1 flex flex-col gap-4 h-full min-h-0'>
        <div className='flex justify-between flex-shrink-0'>
          <h1
          className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-teal-500 to-blue-500'>
            Double Column Template
          </h1>
          <div className='flex gap-5 items-center'>
            <div className='text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full'>
              📋 Two Column Layout
            </div>
            <ReactToPrint
              trigger={() => (
                <button
                  className='bg-neutral-900 border-2 p-2 rounded-lg flex items-center hover:opacity-90'
                >
                  <FileDown className='h-4 w-4' />
                  <p className='ml-1 text-sm'>Download PDF</p>
                </button>
              )}
              content={() => resumeDownloadRef.current}
              pageStyle="@page { margin: 0.5in; size: A4; } @media print { body { background: white !important; } * { color-adjust: exact !important; -webkit-print-color-adjust: exact !important; } }"
              documentTitle='DoubleColumnTemplate-Resume.AI'
            />
          </div>
        </div>

        {/* Compact UX Controls */}
        <div className='px-2 flex-shrink-0'>
          <div className='rounded-lg space-y-3'>
            <TemplateSwitcher />
          </div>
        </div>

        {/* Resume Form - Scrollable */}
        <div className='px-5 flex-1 min-h-0'>
          <FormStandardTemplate 
          setBasicDetails={setBasicDetails}
          setEducation={setEducation}
          setTechnicalExperience={setTechnicalExperience}
          setSkills={setSkills}
          setProjects={setProjects}
          setCertificates={setCertificates}
          setAchievements={setAchievements}
          basicDetails={basicDetails}
          education={education}
          technicalExperience={technicalExperience}
          skills={skills}
          projects={projects}
          certificates={certificates}
          achievements={achievements}
          />
        </div>
        
      </div>

      {/* Resume Viewer */}
      <div className='w-2/5 h-full border-l border-gray-200 pl-6'>

        {/* Render Double Column Resume */}
        <div ref={resumeDownloadRef} className='h-full w-full'>
          <div className='h-full bg-white w-full rounded-xl flex text-gray-800 print:bg-white print:shadow-none print:rounded-none print:p-6 overflow-hidden text-xs print:text-sm' style={{ fontFamily: 'Arial, sans-serif', fontSize: '8px' }}>
            
            {/* Left Column */}
            <div className='w-1/3 bg-gray-800 text-white p-2 flex flex-col gap-2 overflow-y-auto print:p-6 print:gap-6'>
              
              {/* Header */}
              <div className='text-center border-b border-gray-600 pb-1 print:pb-4'>
                <h1 className='text-sm font-bold mb-0.5 print:text-2xl print:mb-2'>
                  {basicDetails.name || 'Your Name'}
                </h1>
                <p className='text-gray-300 text-xs print:text-sm'>Professional</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className='text-xs font-semibold mb-0.5 text-gray-300 print:text-lg print:mb-3'>CONTACT</h3>
                <div className='space-y-0.5 text-xs print:text-sm print:space-y-2'>
                  {basicDetails.phone && (
                    <div>📞 {basicDetails.phone}</div>
                  )}
                  {basicDetails.gmail && (
                    <div>📧 {basicDetails.gmail}</div>
                  )}
                  {(basicDetails.city || basicDetails.state) && (
                    <div>📍 {basicDetails.city || 'City'}, {basicDetails.state || 'State'}</div>
                  )}
                  {basicDetails.linkedIn && (
                    <div>💼 LinkedIn</div>
                  )}
                  {basicDetails.github && (
                    <div>🌐 GitHub</div>
                  )}
                </div>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className='text-xs font-semibold mb-0.5 text-gray-300 print:text-lg print:mb-3'>SKILLS</h3>
                  <div className='space-y-0.5 text-xs print:text-sm print:space-y-1'>
                    {skills.map((skill, index) => (
                      <div key={index} className='bg-gray-700 p-0.5 rounded text-center print:p-2'>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold mb-3 text-gray-300'>CERTIFICATES</h3>
                  <div className='space-y-2 text-sm'>
                    {certificates.map((cert, index) => (
                      <div key={index}>
                        <div className='font-medium'>{cert.title}</div>
                        <div className='text-gray-400 text-xs'>{cert.tag}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold mb-3 text-gray-300'>ACHIEVEMENTS</h3>
                  <div className='space-y-2 text-sm'>
                    {achievements.map((achievement, index) => (
                      <div key={index} className='text-gray-300'>
                        • {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column */}
            <div className='w-2/3 p-2 flex flex-col gap-2 overflow-y-auto print:p-6 print:gap-6'>

              {/* Experience */}
              {technicalExperience.length > 0 && (
                <div>
                  <h3 className='text-sm font-bold text-gray-800 mb-1 border-b-2 border-gray-800 pb-0.5 print:text-2xl print:mb-4 print:pb-2'>EXPERIENCE</h3>
                  <div className='space-y-1 print:space-y-4'>
                    {technicalExperience.map((exp, index) => (
                      <div key={index}>
                        <div className='flex justify-between items-start mb-0.5 print:mb-2'>
                          <div>
                            <h4 className='font-bold text-xs text-gray-800 print:text-lg'>{exp.role || 'Job Title'}</h4>
                            <p className='text-gray-600 font-medium text-xs print:text-base'>{exp.companyName || 'Company Name'}</p>
                          </div>
                          <div className='text-xs text-gray-500 text-right print:text-sm'>
                            {exp.duration || 'Duration'}
                          </div>
                        </div>
                        <div className='text-xs text-gray-700 leading-tight mt-0.5 print:text-sm print:leading-relaxed print:mt-2'>
                          {exp.description || 'Job description...'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2'>EDUCATION</h3>
                  <div className='space-y-3'>
                    {education.map((edu, index) => (
                      <div key={index}>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h4 className='font-bold text-gray-800'>{edu.course || 'Course'}</h4>
                            <p className='text-gray-600'>{edu.name || 'Institution'}</p>
                          </div>
                          <div className='text-sm text-gray-500 text-right'>
                            <div>{edu.duration || 'Duration'}</div>
                            <div>{edu.score || 'Score'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2'>PROJECTS</h3>
                  <div className='space-y-4'>
                    {projects.map((project, index) => (
                      <div key={index}>
                        <div className='flex justify-between items-start mb-1'>
                          <h4 className='font-bold text-gray-800'>{project.name || 'Project Name'}</h4>
                          <div className='text-sm text-gray-500'>
                            {project.year || 'Year'}
                          </div>
                        </div>
                        {project.techstack && (
                          <div className='text-sm text-gray-600 mb-1'>
                            <strong>Tech Stack:</strong> {project.techstack}
                          </div>
                        )}
                        <div className='text-sm text-gray-700 leading-relaxed'>
                          {project.description || 'Project description...'}
                        </div>
                        {project.gitlink && (
                          <div className='text-sm text-blue-600 mt-1'>
                            <strong>GitHub:</strong> {project.gitlink}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DoubleColumnTemplate
