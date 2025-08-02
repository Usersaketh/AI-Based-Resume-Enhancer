'use client'
import { useRef } from 'react'
import { FileDown } from 'lucide-react'
import ReactToPrint from 'react-to-print';
import { useGenerateResumeStore } from '@/store/generate-resume-store'
import TemplateSwitcher from '@/components/generate-resume/template-switcher'
import AutoSave from '@/components/generate-resume/auto-save'
import FormStandardTemplate from '@/components/generate-resume/resume-templates/standard-template/form-standard-template'

const ModernTemplate = () => {
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
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 h-full lg:h-screen p-2 sm:p-4 lg:px-14 overflow-hidden'>
      <div className='flex-1 flex flex-col gap-4 h-full min-h-0'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center flex-shrink-0 gap-3 sm:gap-0'>
          <div>
            <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
              Modern Template
            </h1>
          </div>
          <div className='flex flex sm:flex-row gap-3 sm:gap-5 items-center sm:items-center'>
            <div className='text-xs sm:text-sm text-blue-400 bg-blue-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1'>
              ✨ <span className='hidden sm:inline'>Modern Design Style</span><span className='sm:hidden'>Modern</span>
            </div>
            <ReactToPrint
              trigger={() => (
                <button
                  className='bg-neutral-900 border-2 p-2 rounded-lg flex items-center hover:opacity-90 text-sm'
                >
                  <FileDown className='h-3 w-3 sm:h-4 sm:w-4' />
                  <p className='ml-1 text-xs sm:text-sm'>Download PDF</p>
                </button>
              )}
              content={() => resumeDownloadRef.current}
              pageStyle="@page { margin: 0.5in; size: A4; } @media print { body { background: white !important; } * { color-adjust: exact !important; -webkit-print-color-adjust: exact !important; } }"
              documentTitle='ModernTemplate-Resume.AI'
            />
          </div>
        </div>

        {/* Compact UX Controls */}
        <div className='px-1 flex-shrink-0'>
          <div className='flex items-center gap-2 sm:gap-3 bg-neutral-900/30 backdrop-blur-sm rounded-md p-2 sm:p-3 border border-neutral-700'>
            <TemplateSwitcher />
          </div>
        </div>

        {/* Resume Form - Scrollable */}
        <div className='px-2 sm:px-5 flex-1 min-h-0'>
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
      <div className='w-full sm:w-2/5 h-full border-gray-200 pl-2 mb-20'>

        {/* Render Modern Resume with different styling */}
        <div ref={resumeDownloadRef} className='h-full w-full'>
          <div className='h-full bg-gradient-to-br from-blue-50 to-indigo-100 w-full rounded-xl flex flex-col gap-1 text-neutral-800 p-2 print:bg-white print:shadow-none print:rounded-none print:p-6 print:gap-4 overflow-y-auto text-xs print:text-sm' 
               style={{ fontSize: '9px' }}>
            
            {/* Modern Header */}
            <div className='flex justify-between items-center border-b-4 border-blue-500 pb-1 mb-2 print:pb-4 print:mb-4'>
              <div className='flex flex-col'>
                <h1 className='text-lg font-bold text-blue-600 print:text-3xl'>
                  {basicDetails.name || 'Your Name'}
                </h1>
                <p className='text-gray-600 text-xs print:text-lg'>Professional Resume</p>
              </div>
              <div className='text-right text-xs text-gray-600 space-y-0.5 print:text-sm print:space-y-2'>
                <div>{basicDetails.phone || 'Phone Number'}</div>
                <div>{basicDetails.gmail || 'email@example.com'}</div>
                <div>{basicDetails.city || 'City'}, {basicDetails.state || 'State'}</div>
              </div>
            </div>

            {/* Skills Section with Modern Design */}
            {skills.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>SKILLS</h2>
                <div className='flex flex-wrap gap-0.5 print:gap-2'>
                  {skills.map((skill, index) => (
                    <span key={index} className='bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full text-xs font-medium print:px-3 print:py-1 print:text-sm'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience with Modern Layout */}
            {technicalExperience.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>EXPERIENCE</h2>
                {technicalExperience.map((exp, index) => (
                  <div key={index} className='mb-1 bg-white p-1.5 rounded-lg shadow-sm print:mb-4 print:p-4'>
                    <div className='flex justify-between items-start mb-0.5 print:mb-2'>
                      <div>
                        <h3 className='font-bold text-xs text-gray-800 print:text-lg'>{exp.role || 'Job Title'}</h3>
                        <p className='text-blue-600 font-medium text-xs print:text-base'>{exp.companyName || 'Company Name'}</p>
                      </div>
                      <div className='text-xs text-gray-500 text-right print:text-sm'>
                        {exp.duration || 'Duration'}
                      </div>
                    </div>
                    <div className='text-xs text-gray-700 leading-tight print:text-sm print:leading-relaxed'>
                      {exp.description || 'Job description...'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>EDUCATION</h2>
                {education.map((edu, index) => (
                  <div key={index} className='mb-1 bg-white p-1.5 rounded-lg shadow-sm print:mb-3 print:p-3'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-bold text-xs text-gray-800 print:text-base'>{edu.course || 'Course'}</h3>
                        <p className='text-blue-600 text-xs print:text-sm'>{edu.name || 'Institution'}</p>
                      </div>
                      <div className='text-xs text-gray-500 text-right print:text-sm'>
                        <div>{edu.duration || 'Duration'}</div>
                        <div>{edu.score || 'Score'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>PROJECTS</h2>
                {projects.map((project, index) => (
                  <div key={index} className='mb-1 bg-white p-1.5 rounded-lg shadow-sm print:mb-4 print:p-4'>
                    <h3 className='font-bold text-xs text-gray-800 print:text-lg'>{project.name || 'Project Name'}</h3>
                    <p className='text-xs text-blue-600 mb-0.5 print:text-base print:mb-2'>{project.techstack || 'Technologies'}</p>
                    <p className='text-xs text-gray-700 leading-tight print:text-sm print:leading-relaxed'>{project.description || 'Project description...'}</p>
                    {project.gitlink && (
                      <p className='text-xs text-blue-500 mt-0.5 print:text-sm print:mt-2'>GitHub: {project.gitlink}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>CERTIFICATES</h2>
                {certificates.map((cert, index) => (
                  <div key={index} className='mb-1 bg-white p-1.5 rounded-lg shadow-sm print:mb-3 print:p-3'>
                    <h3 className='font-medium text-xs text-gray-800 print:text-base'>{cert.title || 'Certificate Title'}</h3>
                    <p className='text-xs text-blue-600 print:text-sm'>{cert.tag || 'Issuer'}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className='mb-1 print:mb-4'>
                <h2 className='text-sm font-bold text-blue-600 mb-0.5 border-l-4 border-blue-500 pl-2 print:text-xl print:mb-3 print:pl-3'>ACHIEVEMENTS</h2>
                {achievements.map((achievement, index) => (
                  <div key={index} className='mb-1 bg-white p-1.5 rounded-lg shadow-sm print:mb-3 print:p-3'>
                    <p className='text-xs text-gray-700 leading-tight print:text-sm print:leading-relaxed'>• {achievement}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default ModernTemplate
