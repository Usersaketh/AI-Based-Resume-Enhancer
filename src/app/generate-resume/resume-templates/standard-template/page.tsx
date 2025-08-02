'use client'
import FormStandardTemplate from '@/components/generate-resume/resume-templates/standard-template/form-standard-template'
import { useRef } from 'react'
import ResumePreviewStandardTemplate from '@/components/generate-resume/resume-templates/standard-template/resume-preview-standard-template'
import { FileDown } from 'lucide-react'
import ReactToPrint from 'react-to-print';
import { useGenerateResumeStore } from '@/store/generate-resume-store'
import TemplateSwitcher from '@/components/generate-resume/template-switcher'
import AutoSave from '@/components/generate-resume/auto-save'

const StandardTemplate = () => {
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
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 min-h-screen lg:h-screen p-2 sm:p-4 lg:px-14 lg:overflow-hidden'>
      <div className='flex-1 flex flex-col gap-4 min-h-0'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center flex-shrink-0 gap-3 sm:gap-0'>
          <h1
          className='text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-300'>
            Standard Template
          </h1>
          <div className='flex sm:flex-row gap-3 sm:gap-5 items-center sm:items-center'>
            <div className='text-xs sm:text-sm text-pink-600 bg-pink-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1'>
              📄 <span className='hidden sm:inline'>Professional Layout</span><span className='sm:hidden'>Professional</span>
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
              documentTitle='GeneratedResume-ResumeGPT'
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

      {/* Resume Viewer - Desktop Only */}
      <div className=' lg:w-2/5  border-gray-200 px-2  mb-12'>

        {/* Render Standard Resume */}
        <div ref={resumeDownloadRef} className='h-full w-full'>
          <ResumePreviewStandardTemplate
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
    </div>
  )
}

export default StandardTemplate
