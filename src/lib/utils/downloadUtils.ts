// Utility functions for downloading analysis reports and cover letters

export const downloadTextAsFile = (content: string, filename: string, type: 'txt' | 'md' = 'txt') => {
  const blob = new Blob([content], { type: `text/${type === 'txt' ? 'plain' : 'markdown'}` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatCoverLetterForDownload = (coverLetter: any) => {
  const { coverLetter: letter, keyHighlights, personalizedElements, alternativeVersions } = coverLetter;
  
  let content = `COVER LETTER\n${'='.repeat(50)}\n\n`;
  content += `${letter}\n\n`;
  
  if (keyHighlights?.length > 0) {
    content += `KEY HIGHLIGHTS\n${'-'.repeat(20)}\n`;
    keyHighlights.forEach((highlight: string, i: number) => {
      content += `${i + 1}. ${highlight}\n`;
    });
    content += '\n';
  }
  
  if (personalizedElements?.length > 0) {
    content += `PERSONALIZED ELEMENTS\n${'-'.repeat(25)}\n`;
    personalizedElements.forEach((element: string, i: number) => {
      content += `${i + 1}. ${element}\n`;
    });
    content += '\n';
  }
  
  if (alternativeVersions) {
    content += `ALTERNATIVE OPENING STYLES\n${'-'.repeat(30)}\n`;
    Object.entries(alternativeVersions).forEach(([style, text]) => {
      content += `${style.toUpperCase()}:\n${text}\n\n`;
    });
  }
  
  return content;
};

export const formatBenchmarkForDownload = (benchmark: any) => {
  let content = `RESUME BENCHMARK REPORT\n${'='.repeat(50)}\n\n`;
  
  content += `OVERALL SCORE: ${benchmark.overallScore}\n`;
  content += `INDUSTRY PERCENTILE: ${benchmark.industryBenchmark?.percentile}\n`;
  content += `SHORTLIST PROBABILITY: ${benchmark.marketCompetitiveness?.likelyToGetShortlisted}\n\n`;
  
  if (benchmark.salaryImpact) {
    content += `SALARY IMPACT ANALYSIS\n${'-'.repeat(25)}\n`;
    content += `Estimated Salary Range: ${benchmark.salaryImpact.estimatedSalaryRange}\n`;
    content += `Improvement Potential: ${benchmark.salaryImpact.improvementPotential}\n\n`;
  }
  
  if (benchmark.actionableRecommendations) {
    content += `ACTION PLAN\n${'-'.repeat(15)}\n`;
    
    if (benchmark.actionableRecommendations.immediate?.length > 0) {
      content += `IMMEDIATE (0-1 week):\n`;
      benchmark.actionableRecommendations.immediate.forEach((action: string, i: number) => {
        content += `${i + 1}. ${action}\n`;
      });
      content += '\n';
    }
    
    if (benchmark.actionableRecommendations.shortTerm?.length > 0) {
      content += `SHORT-TERM (1-4 weeks):\n`;
      benchmark.actionableRecommendations.shortTerm.forEach((action: string, i: number) => {
        content += `${i + 1}. ${action}\n`;
      });
      content += '\n';
    }
    
    if (benchmark.actionableRecommendations.longTerm?.length > 0) {
      content += `LONG-TERM (1-3 months):\n`;
      benchmark.actionableRecommendations.longTerm.forEach((action: string, i: number) => {
        content += `${i + 1}. ${action}\n`;
      });
      content += '\n';
    }
  }
  
  return content;
};

export const formatDeepAnalysisForDownload = (deepAnalysis: any) => {
  let content = `DEEP RESUME ANALYSIS REPORT\n${'='.repeat(50)}\n\n`;
  
  if (deepAnalysis.atsScore) {
    content += `ATS SCORE: ${deepAnalysis.atsScore}\n\n`;
  }
  
  if (deepAnalysis.keywordAnalysis) {
    content += `KEYWORD ANALYSIS\n${'-'.repeat(20)}\n`;
    
    if (deepAnalysis.keywordAnalysis.presentKeywords?.length > 0) {
      content += `Present Keywords: ${deepAnalysis.keywordAnalysis.presentKeywords.join(', ')}\n`;
    }
    
    if (deepAnalysis.keywordAnalysis.missingKeywords?.length > 0) {
      content += `Missing Keywords: ${deepAnalysis.keywordAnalysis.missingKeywords.join(', ')}\n`;
    }
    content += '\n';
  }
  
  if (deepAnalysis.overallRecommendations?.length > 0) {
    content += `RECOMMENDATIONS\n${'-'.repeat(20)}\n`;
    deepAnalysis.overallRecommendations.forEach((rec: string, i: number) => {
      content += `${i + 1}. ${rec}\n`;
    });
    content += '\n';
  }
  
  return content;
};
