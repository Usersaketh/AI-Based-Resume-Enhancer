'use client'
import FormStandardTemplate from '@/components/generate-resume/resume-templates/standard-template/form-standard-template'
import { useRef } from 'react'
import { FileDown } from 'lucide-react'
import ReactToPrint from 'react-to-print';
import { useGenerateResumeStore } from '@/store/generate-resume-store'
import TemplateSwitcher from '@/components/generate-resume/template-switcher'
import AutoSave from '@/components/generate-resume/auto-save'

const ElegantTemplate = () => {
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
          className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500'>
            Elegant Template
          </h1>
          <div className='flex gap-5 items-center'>
            <div className='text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full'>
              ✨ Elegant Design
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
              documentTitle='ElegantTemplate-Resume.AI'
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

        {/* Render Elegant Resume */}
        <div ref={resumeDownloadRef} className='h-full w-full'>
          <div className='h-full bg-white w-full rounded-xl p-2 text-gray-800 print:bg-white print:shadow-none print:rounded-none print:p-8 overflow-y-auto text-xs print:text-sm' style={{ fontFamily: 'Georgia, serif', fontSize: '8px' }}>
            
            {/* Header */}
            <div className='text-center mb-2 border-b border-gray-200 pb-1 print:mb-8 print:pb-6'>
              <h1 className='text-lg font-light tracking-wide text-gray-900 mb-0.5 print:text-4xl print:mb-2'>
                {basicDetails.name || 'Your Name'}
              </h1>
              <div className='flex justify-center items-center gap-1 text-xs text-gray-600 mt-0.5 print:gap-4 print:text-sm print:mt-4'>
                {basicDetails.phone && (
                  <span>{basicDetails.phone}</span>
                )}
                {basicDetails.gmail && (
                  <span>•</span>
                )}
                {basicDetails.gmail && (
                  <span>{basicDetails.gmail}</span>
                )}
                {(basicDetails.city || basicDetails.state) && (
                  <span>•</span>
                )}
                {(basicDetails.city || basicDetails.state) && (
                  <span>{basicDetails.city || 'City'}, {basicDetails.state || 'State'}</span>
                )}
              </div>
              {(basicDetails.linkedIn || basicDetails.github) && (
                <div className='flex justify-center gap-1 text-xs text-gray-600 mt-0.5 print:gap-4 print:text-sm print:mt-2'>
                  {basicDetails.linkedIn && (
                    <span>LinkedIn: {basicDetails.linkedIn}</span>
                  )}
                  {basicDetails.github && (
                    <span>GitHub: {basicDetails.github}</span>
                  )}
                </div>
              )}
            </div>

            {/* Experience */}
            {technicalExperience.length > 0 && (
              <div className='mb-2 print:mb-8'>
                <h2 className='text-sm font-light tracking-widest text-gray-900 mb-1 text-center relative print:text-xl print:mb-6'>
                  <span className='bg-white px-1 print:px-4'>PROFESSIONAL EXPERIENCE</span>
                  <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                </h2>
                <div className='space-y-1 print:space-y-6'>
                  {technicalExperience.map((exp, index) => (
                    <div key={index} className='border-l-2 border-gray-200 pl-2 ml-1 relative print:pl-6 print:ml-4'>
                      <div className='absolute -left-0.5 top-0 w-1 h-1 bg-gray-400 rounded-full print:-left-2 print:w-3 print:h-3'></div>
                      <div className='flex justify-between items-baseline mb-0.5 print:mb-2'>
                        <div>
                          <h3 className='text-xs font-medium text-gray-900 print:text-lg'>{exp.role || 'Job Title'}</h3>
                          <p className='text-gray-700 italic text-xs print:text-base'>{exp.companyName || 'Company Name'}</p>
                        </div>
                        <span className='text-xs text-gray-500 font-light print:text-sm'>
                          {exp.duration || 'Duration'}
                        </span>
                      </div>
                      <p className='text-gray-700 leading-tight text-justify text-xs print:text-sm print:leading-relaxed'>
                        {exp.description || 'Job description...'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className='mb-8'>
                <h2 className='text-xl font-light tracking-widest text-gray-900 mb-6 text-center relative'>
                  <span className='bg-white px-4'>EDUCATION</span>
                  <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                </h2>
                <div className='space-y-4'>
                  {education.map((edu, index) => (
                    <div key={index} className='text-center border-b border-gray-100 pb-4 last:border-b-0'>
                      <h3 className='text-lg font-medium text-gray-900'>{edu.course || 'Course'}</h3>
                      <p className='text-gray-700 italic'>{edu.name || 'Institution'}</p>
                      <div className='flex justify-center gap-4 text-sm text-gray-600 mt-2'>
                        <span>{edu.duration || 'Duration'}</span>
                        {edu.score && (
                          <>
                            <span>•</span>
                            <span>{edu.score}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className='mb-8'>
                <h2 className='text-xl font-light tracking-widest text-gray-900 mb-6 text-center relative'>
                  <span className='bg-white px-4'>PROJECTS</span>
                  <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                </h2>
                <div className='space-y-6'>
                  {projects.map((project, index) => (
                    <div key={index} className='text-center border-b border-gray-100 pb-6 last:border-b-0'>
                      <div className='flex justify-center items-baseline gap-4 mb-2'>
                        <h3 className='text-lg font-medium text-gray-900'>{project.name || 'Project Name'}</h3>
                        <span className='text-sm text-gray-500 font-light'>
                          {project.year || 'Year'}
                        </span>
                      </div>
                      {project.techstack && (
                        <p className='text-sm text-gray-600 mb-2 italic'>
                          Technologies: {project.techstack}
                        </p>
                      )}
                      <p className='text-gray-700 leading-relaxed text-justify max-w-2xl mx-auto'>
                        {project.description || 'Project description...'}
                      </p>
                      {project.gitlink && (
                        <p className='text-sm text-gray-600 mt-2'>
                          Repository: {project.gitlink}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className='mb-8'>
                <h2 className='text-xl font-light tracking-widest text-gray-900 mb-6 text-center relative'>
                  <span className='bg-white px-4'>TECHNICAL SKILLS</span>
                  <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                </h2>
                <div className='text-center'>
                  <div className='inline-flex flex-wrap gap-3 justify-center'>
                    {skills.map((skill, index) => (
                      <span key={index} className='text-gray-700 border-b border-gray-300 pb-1 font-light'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Certificates & Achievements */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              
              {/* Certificates */}
              {certificates.length > 0 && (
                <div>
                  <h2 className='text-xl font-light tracking-widest text-gray-900 mb-6 text-center relative'>
                    <span className='bg-white px-4'>CERTIFICATIONS</span>
                    <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                  </h2>
                  <div className='space-y-3'>
                    {certificates.map((cert, index) => (
                      <div key={index} className='text-center'>
                        <h3 className='font-medium text-gray-900'>{cert.title}</h3>
                        <p className='text-sm text-gray-600 italic'>{cert.tag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div>
                  <h2 className='text-xl font-light tracking-widest text-gray-900 mb-6 text-center relative'>
                    <span className='bg-white px-4'>ACHIEVEMENTS</span>
                    <div className='absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10'></div>
                  </h2>
                  <div className='space-y-2'>
                    {achievements.map((achievement, index) => (
                      <p key={index} className='text-gray-700 text-center font-light'>
                        {achievement}
                      </p>
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

export default ElegantTemplate
