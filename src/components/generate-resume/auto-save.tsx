'use client'
import { useEffect, useState } from 'react'
import { useGenerateResumeStore } from '@/store/generate-resume-store'

const AutoSave: React.FC = () => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const store = useGenerateResumeStore()

  useEffect(() => {
    const saveData = () => {
      setIsSaving(true)
      // Zustand with persist already auto-saves, but we can add visual feedback
      setTimeout(() => {
        setLastSaved(new Date())
        setIsSaving(false)
      }, 500)
    }

    // Trigger save whenever store data changes
    const unsubscribe = useGenerateResumeStore.subscribe(saveData)

    return () => unsubscribe()
  }, [])

  // Keyboard shortcut for manual save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        setLastSaved(new Date())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className='flex items-center gap-2 text-xs text-gray-500'>
      {isSaving ? (
        <div className='flex items-center gap-1'>
          <div className='w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
          <span>Saving...</span>
        </div>
      ) : lastSaved ? (
        <div className='flex items-center gap-1'>
          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
          <span>Saved at {formatTime(lastSaved)}</span>
        </div>
      ) : (
        <span>Auto-save enabled</span>
      )}
      <span className='text-gray-400'>• Press Ctrl+S to save</span>
    </div>
  )
}

export default AutoSave
