import ResumeTemplate from '@/components/generate-resume/resume-template'
import { resumeTemplates } from '@/lib/constant'


type Props = {}

const GenerateResume = () => {
  return (
    <div className='p-5 flex flex-col h-full'>
        <h1 className='text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
            Generate Resume
        </h1>
        <h1 className='text-xl mt-1 ml-2'>
            Resume Templates <span className='text-sm text-green-500'>- Multiple templates now available!</span>
        </h1>


        <div className='mt-8 p-5 w-full overflow-y-scroll overflow-hidden'>
            {/* Render Templates */}
            <div className='grid grid-cols-4 gap-7'>
                {
                    resumeTemplates.map((template, index) => (
                        <ResumeTemplate key={index} title={template.title} img={template.img} url={template.url} disable={template.disable}/>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default GenerateResume
