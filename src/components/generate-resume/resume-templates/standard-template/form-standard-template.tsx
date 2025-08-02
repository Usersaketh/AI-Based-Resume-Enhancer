import { useRef, useState } from 'react'
import { BasicDetails, Education, TechnicalExperience, Certificates, Achievements, Projects, Skills } from '@/lib/types'
import FormStepIndicator from '../../form-step-indicator';
import FormTechnicalExperience from '../../forms/form-technical-experience';
import FormProjects from '../../forms/form-projects';
import FormSkills from '../../forms/form-skills';
import FormEducation from '../../forms/form-education';
import FormCertificates from '../../forms/form-certificates';
import FormAchievements from '../../forms/form-achievements';
import FormPaginationButtons from '../../form-pagination-buttons';

interface FormStandardTemplateProps {
    setBasicDetails: (updater: (prev: BasicDetails) => BasicDetails) => void;
    setEducation: (updater: (prev: Education) => Education) => void;
    setTechnicalExperience: (updater: (prev: TechnicalExperience) => TechnicalExperience) => void;
    setSkills: (updater: (prev: Skills) => Skills) => void;
    setProjects: (updater: (prev: Projects) => Projects) => void;
    setCertificates: (updater: (prev: Certificates) => Certificates) => void;
    setAchievements: (updater: (prev: Achievements) => Achievements) => void;
    basicDetails: BasicDetails;
    education: Education;
    technicalExperience: TechnicalExperience;
    skills: Skills;
    projects: Projects;
    certificates: Certificates;
    achievements: Achievements;
}


const steps = [
    'Basic Details',
    'Education',
    'Technical Experience',
    'Skills',
    'Projects',
    'Certificates',
    'Achievements',
];

const FormStandardTemplate: React.FC<FormStandardTemplateProps>  = (  {
    setBasicDetails,
    setEducation,
    setTechnicalExperience,
    setSkills,
    setProjects,
    setCertificates,
    setAchievements,
    basicDetails,
    education,
    technicalExperience,
    skills,
    projects,
    achievements,
    certificates,}
) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [latestStep, setLatestStep] = useState(1);

    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
      if (currentStep < steps.length){
        setCurrentStep(currentStep + 1);
        }
    
        if (latestStep <= currentStep){
            setLatestStep(latestStep + 1);
        }

        scrollToTop();
    };
  
    const handlePrev = () => {
      if (currentStep > 1){
        setCurrentStep(currentStep - 1);
        scrollToTop();
      } 
    };
  
    const handleStepClick = (index: number) => {
      setCurrentStep(index);
    };


    // Form Section Handlers
    const handleBasicDetailsInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof BasicDetails) => {
        const value = e.target.value ?? '';
        setBasicDetails(prev => ({
          ...prev,
          [field]: value,
        }));
    };

    return (
        <div className='flex flex-col h-full'>

            <div className='flex-shrink-0'>
                <FormStepIndicator 
                    currentStep={currentStep}
                    latestStep={latestStep}
                    steps={steps}
                    onStepClick={handleStepClick}
                />
            </div>

            {/* MultiStep Form */}
            <div
                ref={scrollableContainerRef}
             className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700 min-h-0'>

                {/* BasicDetails */}
                {
                    currentStep === 1 && 
                    <>
                    <div className='flex flex-col gap-4'>
                        <h1 className='font-semibold text-xl sm:text-2xl border-b-2 pb-2'>Basic Details</h1>
                        <div className='flex flex-col gap-3 sm:gap-4 px-2 sm:px-4 lg:px-10'>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Your Name :</span>
                                <input 
                                value={basicDetails?.name || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'name')}
                                placeholder="Enter your full name"
                                autoComplete="off"
                                name="name"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Phone Number :</span>
                                <input
                                value={basicDetails?.phone || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'phone')}
                                placeholder="Enter phone number"
                                autoComplete="off"
                                name="phone"
                                type="tel"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>City :</span>
                                <input
                                value={basicDetails?.city || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'city')}
                                placeholder="Enter city"
                                autoComplete="off"
                                name="city"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>State :</span>
                                <input 
                                value={basicDetails?.state || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'state')}
                                placeholder="Enter state"
                                autoComplete="off"
                                name="state"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Email :</span>
                                <input 
                                value={basicDetails?.gmail || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'gmail')}
                                placeholder="Enter email address"
                                autoComplete="off"
                                name="email"
                                type="email"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>GitHub Profile URL :</span>  
                                <input 
                                value={basicDetails?.github || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'github')}
                                placeholder="Enter GitHub URL"
                                autoComplete="off"
                                name="github"
                                type="url"
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>LinkedIn Profile URL :</span>
                                <input 
                                value={basicDetails?.linkedIn || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                onChange={(e) => handleBasicDetailsInput(e, 'linkedIn')}
                                placeholder="Enter LinkedIn URL"
                                autoComplete="off"
                                name="linkedin"
                                type="url"
                                />
                            </label>
                        </div>
                    </div>
                    </>
                }


                {/* Education */}
                {
                    currentStep === 2 && 
                    <FormEducation
                    education={education}
                    setEducation={setEducation}
                    />
                }

                
                {/* TechnialExperience */}
                {
                    currentStep === 3 && 
                    <FormTechnicalExperience
                        technicalExperience={technicalExperience}
                        setTechnicalExperience={setTechnicalExperience}
                        scrollToTop={scrollToTop}
                    />
                }


                {/* Skills */}
                {
                    currentStep === 4 &&
                    <FormSkills skills={skills} setSkills={setSkills} />
                }


                {/* Projects */}
                {
                    currentStep === 5 &&
                    <FormProjects 
                    projects={projects}
                    setProjects={setProjects}
                    scrollToTop={scrollToTop}
                    />
                }


                {/* Certificates */}
                {
                    currentStep === 6 &&
                    <FormCertificates
                    certificates={certificates}
                    setCertificates={setCertificates}
                    />
                }


                {/* Achievements */}
                {
                    currentStep === 7 && 
                    <FormAchievements
                    achievements={achievements}
                    setAchievements={setAchievements}
                    />
                }


            </div>

            {/* Pagination Buttons - Fixed at bottom */}
            <div className='flex-shrink-0'>
                <FormPaginationButtons
                currentStep={currentStep}
                steps={steps}
                onNext={handleNext}
                onPrev={handlePrev}
                />
            </div>

        </div>
    )
}

export default FormStandardTemplate

