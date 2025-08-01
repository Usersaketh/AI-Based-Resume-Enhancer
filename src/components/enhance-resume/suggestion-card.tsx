import { Sparkles, ArrowRight } from 'lucide-react';


type Suggestion = {
    heading: string;
    description: string;
}

// Function to parse and render markdown-like formatting
const parseDescription = (text: string) => {
  // First, clean up the text by removing extra formatting
  let cleanedText = text
    // Remove any ** markdown formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Fix double colons
    .replace(/::+/g, ':')
    // Clean up bullet points - convert all to consistent format
    .replace(/^[\*\-•]\s*/gm, '• ');

  // Split by lines and process each line
  const lines = cleanedText.split('\n').filter(line => line.trim() !== '');
  const elements: JSX.Element[] = [];
  let key = 0;

  // Check if this is Resume Match Score content (contains score and detailed analysis)
  const isResumeMatchScore = text.includes('Score:') && (text.includes('Match Quality') || text.includes('Shortlisting Probability') || text.includes('Top 3'));

  if (isResumeMatchScore) {
    // Special handling for Resume Match Score
    let currentSection = '';
    let inStrengthsOrGaps = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) continue;

      // Handle score line
      if (line.match(/^Score:\s*\d+\/10/)) {
        const scoreMatch = line.match(/Score:\s*(\d+\/10)/);
        const score = scoreMatch ? scoreMatch[1] : '';
        
        elements.push(
          <div key={key++} className="mb-4">
            <div className="text-3xl font-bold text-blue-400 mb-3">
              Score: <span className="text-white">{score}</span>
            </div>
          </div>
        );
        continue;
      }

      // Handle sections like "Top 3 Strengths:", "Top 3 Gaps:", "Shortlisting Probability:", etc.
      if (line.match(/^(Top 3 Strengths|Top 3 Gaps|Shortlisting Probability|Match Quality):/)) {
        const sectionTitle = line.replace(/:.*$/, '');
        const content = line.replace(/^[^:]+:\s*/, '').trim();
        
        elements.push(
          <div key={key++} className="mb-3 mt-4">
            <div className="font-bold text-blue-300 text-lg mb-2">{sectionTitle}:</div>
            {content && (
              <div className="text-neutral-200 leading-relaxed pl-2">{content}</div>
            )}
          </div>
        );
        
        inStrengthsOrGaps = sectionTitle.includes('Strengths') || sectionTitle.includes('Gaps');
        continue;
      }

      // Handle bullet points (starts with •)
      if (line.startsWith('•')) {
        const bulletText = line.replace(/^•\s*/, '').trim();
        elements.push(
          <div key={key++} className="flex items-start mb-2 pl-4">
            <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
            <span className="text-neutral-200 leading-relaxed flex-1">{bulletText}</span>
          </div>
        );
        continue;
      }

      // Handle numbered points or items that should be bullet points
      if (line.match(/^\d+\.\s/) || (inStrengthsOrGaps && line.length > 10)) {
        const bulletText = line.replace(/^\d+\.\s*/, '').trim();
        elements.push(
          <div key={key++} className="flex items-start mb-2 pl-4">
            <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
            <span className="text-neutral-200 leading-relaxed flex-1">{bulletText}</span>
          </div>
        );
        continue;
      }

      // Regular paragraph
      elements.push(
        <div key={key++} className="text-neutral-200 leading-relaxed mb-3">
          {line}
        </div>
      );
    }
  } else {
    // Regular parsing for other suggestions (keep existing logic)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;

      // Handle section headers (any line ending with just a colon)
      if (line.match(/^[^:]+:\s*$/) && !line.startsWith('•')) {
        const headerText = line.replace(/:+\s*$/, '').trim();
        elements.push(
          <div key={key++} className="mb-2 mt-4">
            <div className="font-bold text-blue-300 text-lg">{headerText}</div>
          </div>
        );
        continue;
      }

      // Handle bullet points (starts with •)
      if (line.startsWith('•')) {
        const bulletText = line.replace(/^•\s*/, '').trim();
        elements.push(
          <div key={key++} className="flex items-start mb-2 pl-4">
            <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
            <span className="text-neutral-200 leading-relaxed flex-1">{bulletText}</span>
          </div>
        );
        continue;
      }

      // Regular paragraph
      elements.push(
        <div key={key++} className="text-neutral-200 leading-relaxed mb-3">
          {line}
        </div>
      );
    }
  }

  return elements;
};

const SuggestionCard: React.FC<Suggestion> = ({heading, description}) => {
  return (
    <div className='flex gap-4 justify-start mb-8 w-full relative group'>
      <div className='absolute w-[2px] h-full rounded-xl left-[18px] top-1 bg-gradient-to-b from-blue-400 to-purple-500' />
      <div className='absolute w-[2px] h-14 rounded-xl left-[18px] -bottom-12 bg-gradient-to-b from-purple-500 to-transparent' />
      <div className='p-3 z-50 rounded-full border-2 border-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 h-fit shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-200'>
          <Sparkles className='h-5 w-5 text-white'/>
      </div>
      <div className='rounded-xl text-sm shadow-xl border border-neutral-700 bg-gradient-to-br from-neutral-900/80 to-neutral-800/50 backdrop-blur-sm flex-1 group-hover:border-blue-500/30 transition-all duration-200'>
        <h1 className='bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-xl text-lg p-4 font-semibold border-b border-neutral-700 text-blue-400 flex items-center gap-2'>
          <ArrowRight className='h-4 w-4' />
          {heading}
        </h1>
        <div className='text-neutral-200 px-6 py-5 text-[15px] leading-[1.7] rounded-b-xl'>
          {parseDescription(description)}
        </div>
      </div>
    </div>
  )
}

export default SuggestionCard
