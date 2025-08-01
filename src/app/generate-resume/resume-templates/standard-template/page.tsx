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
    <div className='flex gap-10 h-screen p-4 px-14 overflow-hidden'>
      <div className='flex-1 flex flex-col gap-4 h-full min-h-0'>
        <div className='flex justify-between flex-shrink-0'>
          <h1
          className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-300'>
            Standard Template
          </h1>
          <div className='flex gap-5 items-center'>
            <div className='text-sm text-pink-600 bg-pink-50 px-3 py-1 rounded-full'>
              📄 Professional Layout
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
              documentTitle='GeneratedResume-ResumeGPT'
            />
          </div>
        </div>

        {/* Compact UX Controls */}
        <div className='px-2 flex-shrink-0'>
          <div className='rounded-lg  space-y-3'>
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

        {/* Render Standard Resume */}
        <div ref={resumeDownloadRef} className='h-full w-ful'>
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
