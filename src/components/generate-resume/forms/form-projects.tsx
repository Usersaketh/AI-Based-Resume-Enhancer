import { useRef, useState } from 'react';
import { ProjectItem, Projects } from '@/lib/types';
import { ArrowLeft, ArrowRight, Brain, FilePenLine, Loader } from 'lucide-react';
import GenerateAIDescriptionCard from '../generate-ai-description-card';
import FormSectionNavigationButtons from '../form-section-navigation-buttons';
import { toast } from 'sonner';

interface FormProjectsProps {
  projects: Projects;
  setProjects: (updater: (prev: Projects) => Projects) => void;
  scrollToTop: () => void;
}

const FormProjects: React.FC<FormProjectsProps> = ({ projects, setProjects, scrollToTop }) => {

    const [userDescription, setUserDescription] = useState<string>('');
    const [currentProjIndex, setCurrentProjIndex] = useState(0);
    const [generatedDesc, setGeneratedDesc] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(false);

    const handleProjectInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof ProjectItem) => {
        const { value } = e.target;
        setProjects(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }

    const generateAIDescription = async() => {
        if (userDescription === '') return;
    
        setLoading(true);
    
        try {
            const currentProject = projects[currentProjIndex];
            const text = `Project Name: ${currentProject.name}, Tech Stack: ${currentProject.techstack}, Description: ${userDescription}`;


            const response = await fetch('/api/generate-resume/projects-suggestion', {
                method: 'POST',
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                toast.error("Failed to Generate Suggestion");
                return;
            }

            const result = await response.json();
            const suggestion = result.suggestion;
            setGeneratedDesc(suggestion);
            setUserDescription(suggestion);

            toast.success("Generated Suggestion Successfully.");

        } catch (error) {
            toast.error("Error in Generating Suggestion")
        } finally {
            setLoading(false);
        }
    }

    const saveDescription = () => {
        setProjects(prev => {
          const updated = [...prev];
          updated[currentProjIndex] = { ...updated[currentProjIndex], description: generatedDesc };
          return updated;
        });
        setUserDescription('');
        setGeneratedDesc('');
    };

    const changeProject = (index: number) => {
        setCurrentProjIndex(index);
        scrollToTop();
    };

    const addProject = () => {
        setProjects(prev => [
          ...prev,
          {name: '', techstack: '', gitlink: '', year: '', description: ''}
        ]);
        setCurrentProjIndex(projects.length);
        scrollToTop();
    };
    
    const removeProject = () => {
        setProjects(prev => prev.filter((_, i) => i !== currentProjIndex));
        setCurrentProjIndex(prev => Math.max(0, prev - 1));
        scrollToTop();
    };



    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-xl sm:text-2xl border-b-2 pb-2'>Projects</h1>

            <div className='flex flex-col gap-6 sm:gap-10 px-4 sm:px-10'>
                {
                    projects.map((project, index) => (
                        <div key={index} className={`flex flex-col gap-3 sm:gap-2 w-full ${currentProjIndex === index ? '' : 'hidden'}`}>
                            <div className='text-sm sm:text-lg font-semibold rounded-full bg-slate-200 border-neutral-700 border-2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center'>
                                <h1 className='text-black'>{index+1}</h1>
                            </div>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Project Name * :</span>
                                <input 
                                    value={project.name}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 focus:bg-neutral-800 transition-colors p-2 sm:p-3'
                                    onChange={(e) => handleProjectInput(e, index, 'name')}
                                    placeholder='Enter project name'
                                    required
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Tech Stack * :</span>
                                <input 
                                    placeholder='E.g: React.js, Node.js, MongoDB'
                                    value={project.techstack}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 focus:bg-neutral-800 transition-colors p-2 sm:p-3'
                                    onChange={(e) => handleProjectInput(e, index, 'techstack')}
                                    required
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Git Link :</span>
                                <input 
                                    value={project.gitlink}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 focus:bg-neutral-800 transition-colors p-2 sm:p-3'
                                    onChange={(e) => handleProjectInput(e, index, 'gitlink')}
                                    placeholder='https://github.com/username/project'
                                    type='url'
                                />
                            </label>
                            <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 gap-2 sm:gap-0'>
                                <span className='text-sm sm:text-base'>Year * :</span>
                                <input 
                                    placeholder='E.g: Aug 2023 - Dec 2023'
                                    value={project.year}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 focus:bg-neutral-800 transition-colors p-2 sm:p-3'
                                    onChange={(e) => handleProjectInput(e, index, 'year')}
                                    required
                                />
                            </label>
                            
                            <GenerateAIDescriptionCard
                            userDescription={userDescription}
                            setUserDescription={setUserDescription}
                            generateAIDescription={generateAIDescription}
                            loading={loading}
                            generatedDesc={generatedDesc}
                            saveDescription={saveDescription}
                            />

                            <div className='mt-8'>
                                <h1>Description:</h1>
                                <textarea 
                                    value={project.description}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full mt-3 min-h-40'
                                    onChange={(e) => handleProjectInput(e, index, 'description')}
                                    placeholder='Your Project Description'
                                />
                            </div>

                            <FormSectionNavigationButtons
                            currentIndex={currentProjIndex}
                            totalItems={projects.length}
                            onPrev={() => changeProject(currentProjIndex - 1)}
                            onNext={() => changeProject(currentProjIndex + 1)}
                            onAdd={addProject}
                            onRemove={removeProject}
                            disablePrev={currentProjIndex === 0}
                            disableNext={currentProjIndex === projects.length - 1}
                            disableRemove={projects.length === 1}
                            />
                        </div>
                    ))
                }
                </div>
            </div>
    );
};

export default FormProjects;
