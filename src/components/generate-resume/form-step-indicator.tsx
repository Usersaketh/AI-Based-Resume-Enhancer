// components/StepIndicator.tsx
import { BadgeCheck, Check, CircleCheck, CircleDashed, Dot } from 'lucide-react';


interface StepIndicatorProps {
  currentStep: number;
  latestStep: number;
  steps: string[];
  onStepClick: (index: number) => void;
}

const FormStepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, latestStep, steps, onStepClick }) => {
  return (
   <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center mb-2 sm:mb-4'>
    <h1 className='text-xs sm:text-sm font-medium'>Step {currentStep} of {steps.length}</h1>
    <div className='flex gap-2 sm:gap-4 flex-wrap justify-center'>
        {
            steps.map((step, index) => (
                <div key={index} className='relative group'>
                    <div
                    key={index}
                    onClick={(e) => {
                        if(index+1 === currentStep || index+1 > latestStep){
                            e.preventDefault();
                        }else{
                            onStepClick(index+1);
                        }
                    }}
                    className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full

                    ${currentStep === index+1 ? "border-2 border-pink-500" : 
                        (currentStep > index+1  || index + 1 <= latestStep) ?
                        "bg-pink-500 cursor-pointer transition ease-in-out hover:scale-125":
                        "bg-gray-500 cursor-not-allowed"
                    }
            
                    flex items-center justify-center 
                    ` }>
                        {
                            currentStep === index+1 && <p className='h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-pink-300'></p>
                        }
                    </div>
                    {
                        currentStep != index+1 && <p className='absolute -top-16 -left-12 bg-neutral-900 border-neutral-700 shadow-lg shadow-slate-700 text-slate-100 w-28 h-12 text-center rounded-lg text-sm hidden group-hover:flex items-center justify-center border-2 '>{step}</p>
                    }
                    
                </div>

            ))
        }
    </div>
   </div>   
  );
};

export default FormStepIndicator;
