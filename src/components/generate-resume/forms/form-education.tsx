import { Education, EducationItem } from '@/lib/types';
import { CirclePlus } from 'lucide-react';


interface FormEducationProps {
    education: Education;
    setEducation: (updater: (prev: Education) => Education) => void;
}

const FormEducation: React.FC<FormEducationProps> = ({education, setEducation}) => {

    const handleEducationInput = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof EducationItem) => {
        const { value } = e.target;
        setEducation(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addEducation = () => {
        setEducation(prev => [
            ...prev,
            { name: '', course: '', score: '', duration: '' }
        ]);
    }

    const removeEducation = (index: number) => {
        setEducation(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-xl sm:text-2xl border-b-2 pb-2'>Education Details</h1>
            {
                education.map((edu, index) => (
                    <div key={index} className='flex flex-col mb-6 sm:mb-10 px-4 sm:px-10'>
                        <div className='flex flex-col'>
                            <div className='flex gap-3 sm:gap-4 items-center mb-4'>
                                <div className='text-sm sm:text-lg font-semibold rounded-full bg-slate-200 border-neutral-700 border-2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0'>
                                    <h1 className='text-black'>{index+1}</h1>
                                </div>
                                <button
                                onClick={() => removeEducation(index)}
                                 className={`text-red-400 p-1 px-2 sm:px-3 rounded-lg hover:bg-neutral-900 text-sm ${index === 0 && 'hidden'}`}>
                                    Remove
                                </button>
                            </div>
                                <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 m-1 gap-2 sm:gap-0'>
                                    <span className='text-sm sm:text-base'>Course :</span>
                                    <input
                                    value={edu.course}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                    onChange={(e) => handleEducationInput(e, index, 'course')}
                                    />
                                </label>
                                <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 m-1 gap-2 sm:gap-0'>
                                    <span className='text-sm sm:text-base'>School Name :</span>
                                    <input 
                                    value={edu.name}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                    onChange={(e) => handleEducationInput(e, index, 'name')}
                                    />
                                </label>
                                <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 m-1 gap-2 sm:gap-0'>
                                    <span className='text-sm sm:text-base'>Score :</span>
                                    <input
                                    placeholder='E.g: CGPA: 8.2/10'
                                    value={edu.score}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                    onChange={(e) => handleEducationInput(e, index, 'score')}
                                    />
                                </label>
                                <label className='w-full sm:w-4/5 flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 m-1 gap-2 sm:gap-0'>
                                    <span className='text-sm sm:text-base'>Duration :</span>
                                    <input 
                                    placeholder='E.g: 2020-2024'
                                    value={edu.duration}
                                    className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-3/5 p-2 sm:p-3'
                                    onChange={(e) => handleEducationInput(e, index, 'duration')}
                                    />
                                </label>
                        </div>
                    </div>
                ))
            }
            <div className='flex ml-4 sm:ml-10'>
                <button
                    onClick={addEducation}
                    className='bg-neutral-900 border-2 p-2 sm:p-3 rounded-lg flex items-center hover:opacity-90 disabled:cursor-default disabled:opacity-50 w-fit text-sm sm:text-base'
                >
                    <CirclePlus className='h-4 w-4 sm:h-5 sm:w-5' />
                    <p className='ml-1 sm:ml-2'>Add Education</p>
                </button>
            </div>
        </div>
    )
}

export default FormEducation
