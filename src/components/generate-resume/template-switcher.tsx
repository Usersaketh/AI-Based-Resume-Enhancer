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
    <div className='flex items-center gap-2 mb-4 mt-2'>
      <span className='text-sm font-medium text-gray-600'>Switch Template:</span>
      <div className='flex gap-4'>
        {resumeTemplates.filter(template => !template.disable).map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplateSwitch(template.url)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              template.url === current
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {template.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSwitcher
