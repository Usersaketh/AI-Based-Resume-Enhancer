'use client'
import { useRouter, usePathname } from 'next/navigation'
import { resumeTemplates } from '@/lib/constant'

interface TemplateSwitcherProps {
  currentTemplate?: string
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ currentTemplate }) => {
  const router = useRouter()
  const pathname = usePathname()
  
  // Auto-detect current template if not provided
  const getCurrentTemplate = () => {
    if (currentTemplate) return currentTemplate
    if (pathname.includes('modern-template')) return '/generate-resume/resume-templates/modern-template/'
    if (pathname.includes('double-column-template')) return '/generate-resume/resume-templates/double-column-template/'
    if (pathname.includes('elegant-template')) return '/generate-resume/resume-templates/elegant-template/'
    return '/generate-resume/resume-templates/standard-template/'
  }

  const current = getCurrentTemplate()

  const handleTemplateSwitch = (templateUrl: string) => {
    router.push(templateUrl)
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center mb-1 gap-2 sm:gap-6 sm:mb-2 sm:mt-2'>
      <span className='text-sm font-medium text-gray-600 flex-shrink-0'>Switch Template:</span>
      <div className='flex gap-3 flex-wrap sm:gap-6'>
        {resumeTemplates.filter(template => !template.disable).map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplateSwitch(template.url)}
            className={`px-3 sm:px-3 py-1 text-xs rounded-full transition-colors flex-shrink-0 ${
              template.url === current
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className='hidden sm:inline'>{template.title}</span>
            <span className='sm:hidden'>{template.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSwitcher
