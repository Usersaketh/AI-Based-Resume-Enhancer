// Smart text formatting utilities

export const formatBulletPoints = (text: string): string => {
  if (!text) return text
  
  const lines = text.split('\n')
  const formattedLines = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return line
    
    // Check if line already starts with bullet point
    const bulletPatterns = ['-', '•', '*', '→', '▸', '◦']
    const hasExistingBullet = bulletPatterns.some(bullet => trimmed.startsWith(bullet))
    
    if (!hasExistingBullet && trimmed.length > 0) {
      return `• ${trimmed}`
    }
    
    return line
  })
  
  return formattedLines.join('\n')
}

export const cleanText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim()
}

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, l => l.toUpperCase())
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const formatUrl = (url: string): string => {
  if (!url) return ''
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export const getCharacterLimits = () => ({
  name: 50,
  phone: 20,
  email: 50,
  city: 30,
  state: 30,
  linkedin: 100,
  github: 100,
  jobDescription: 500,
  projectDescription: 300,
  achievementDescription: 150,
  skillName: 30,
  courseName: 100,
  institutionName: 100,
  companyName: 100,
  jobTitle: 100,
  projectName: 100,
  certificateTitle: 100
})

export const getFieldSuggestions = (fieldType: string, templateType: string) => {
  const suggestions: Record<string, Record<string, string[]>> = {
    jobDescription: {
      modern: [
        'Led cross-functional teams to deliver innovative solutions',
        'Implemented scalable architecture patterns resulting in 40% performance improvement',
        'Collaborated with stakeholders to define product roadmap and technical strategy'
      ],
      elegant: [
        'Orchestrated comprehensive project initiatives while maintaining exceptional quality standards',
        'Cultivated strategic partnerships that enhanced organizational capabilities',
        'Demonstrated thought leadership through innovative problem-solving approaches'
      ],
      standard: [
        'Developed and maintained web applications using modern frameworks',
        'Worked with team members to implement new features and fix bugs',
        'Participated in code reviews and followed best practices'
      ]
    },
    skills: {
      modern: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'],
      elegant: ['Strategic Planning', 'Project Management', 'Data Analysis', 'Leadership'],
      standard: ['JavaScript', 'HTML/CSS', 'SQL', 'Git', 'Agile Methodologies']
    }
  }
  
  return suggestions[fieldType]?.[templateType] || []
}
