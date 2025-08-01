'use client';

import SuggestionCard from '@/components/enhance-resume/suggestion-card';
import { base64ToFile } from '@/lib/utils/fileUtils';
import { useEnhanceResumeStore } from '@/store/enhance-resume-store';
import { FileText, LoaderCircle, Brain, Target, TrendingUp, Download, Mail, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner'
import { downloadTextAsFile, formatCoverLetterForDownload, formatBenchmarkForDownload, formatDeepAnalysisForDownload } from '@/lib/utils/downloadUtils'

type Suggestion = {
    heading: string;
    description: string;
};

const EnhanceResume = () => {
    const resumeFileBase64 = useEnhanceResumeStore((state) => state.resumeFileBase64);
    const resumeSuggestions = useEnhanceResumeStore((state) => state.resumeSuggestions);
    
    const [activeTab, setActiveTab] = useState('basic');
    const [loading, setLoading] = useState(false);
    const [deepAnalysis, setDeepAnalysis] = useState<any>(null);
    const [benchmark, setBenchmark] = useState<any>(null);
    const [coverLetter, setCoverLetter] = useState<any>(null);

    const parseSuggestions = (jsonText: string | null): Suggestion[] => {
        if (!jsonText) {
            return [];
        }

        try {
            // If jsonText is already an object, use it directly
            let parsed: { suggestions: Suggestion[] };
            if (typeof jsonText === 'string') {
                const cleanedText = jsonText.replace(/```json|```/g, '').trim();
                parsed = JSON.parse(cleanedText);
            } else {
                parsed = jsonText;
            }

            if (parsed && Array.isArray(parsed.suggestions)) {
                return parsed.suggestions.map((item: { heading: string; description: string }) => ({
                    heading: item.heading,
                    description: item.description
                }));
            } else {
                return [];
            }
        } catch (error) {
            console.error("Failed to parse suggestions:", error);
            return [];
        }
    };

    // Parse the suggestions
    const suggestions = parseSuggestions(resumeSuggestions);

    // Convert base64 to File object
    const resumeFile = resumeFileBase64
        ? base64ToFile(resumeFileBase64.base64, resumeFileBase64.name, resumeFileBase64.type)
        : null;

    // Analysis Functions
    const performDeepAnalysis = async (analysisType: string) => {
        if (!resumeFileBase64) {
            toast.error("No resume found for analysis");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading(`Performing ${analysisType} analysis...`);

        try {
            const response = await fetch("/api/enhance-resume/deep-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pdfBase64: resumeFileBase64.base64,
                    analysisType
                }),
            });

            if (response.status === 429) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
                return;
            }

            if (response.status === 400) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
                return;
            }

            if (!response.ok) throw new Error('Analysis failed');
            
            const result = await response.json();
            setDeepAnalysis(result.deepAnalysisData);
            setActiveTab('deep'); // Switch to deep analysis tab
            toast.success('Analysis completed!');
        } catch (error: any) {
            console.error('Deep analysis error:', error);
            
            // Check for specific error types
            if (error.message?.includes('quota') || error.message?.includes('429')) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
            } else if (error.message?.includes('Invalid PDF') || error.message?.includes('400')) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
            } else {
                toast.error('Analysis failed. Please try again.');
            }
        } finally {
            toast.dismiss(loadingToast);
            setLoading(false);
        }
    };

    const performBenchmarking = async () => {
        if (!resumeFileBase64) {
            toast.error("No resume found for benchmarking");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Benchmarking against industry standards...");

        try {
            const response = await fetch("/api/enhance-resume/benchmark", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pdfBase64: resumeFileBase64.base64,
                    industry: "Technology", // This should be dynamic
                    experienceLevel: "Mid-level" // This should be dynamic
                }),
            });

            if (response.status === 429) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
                return;
            }

            if (response.status === 400) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
                return;
            }

            if (!response.ok) throw new Error('Benchmarking failed');
            
            const result = await response.json();
            setBenchmark(result.benchmarkData);
            setActiveTab('benchmark'); // Switch to benchmark tab
            toast.success('Benchmarking completed!');
        } catch (error: any) {
            console.error('Benchmarking error:', error);
            
            // Check for specific error types
            if (error.message?.includes('quota') || error.message?.includes('429')) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
            } else if (error.message?.includes('Invalid PDF') || error.message?.includes('400')) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
            } else {
                toast.error('Benchmarking failed. Please try again.');
            }
        } finally {
            toast.dismiss(loadingToast);
            setLoading(false);
        }
    };

    const generateCoverLetter = async () => {
        if (!resumeFileBase64) {
            toast.error("No resume found for cover letter generation");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Generating personalized cover letter...");

        try {
            const response = await fetch("/api/enhance-resume/cover-letter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pdfBase64: resumeFileBase64.base64,
                    companyName: "Target Company", // This should be dynamic
                    tone: "professional"
                }),
            });

            if (response.status === 429) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
                return;
            }

            if (response.status === 400) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
                return;
            }

            if (!response.ok) throw new Error('Cover letter generation failed');
            
            const result = await response.json();
            setCoverLetter(result.coverLetterData);
            setActiveTab('cover-letter'); // Switch to cover letter tab
            toast.success('Cover letter generated!');
        } catch (error: any) {
            console.error('Cover letter error:', error);
            
            // Check for specific error types
            if (error.message?.includes('quota') || error.message?.includes('429')) {
                toast.error('API quota exceeded. Please try again later or upgrade your plan.');
            } else if (error.message?.includes('Invalid PDF') || error.message?.includes('400')) {
                toast.error('Invalid PDF file. Please try uploading a different resume.');
            } else {
                toast.error('Cover letter generation failed. Please try again.');
            }
        } finally {
            toast.dismiss(loadingToast);
            setLoading(false);
        }
    };

    // Download functions
    const downloadDeepAnalysis = () => {
        if (!deepAnalysis) return;
        const content = formatDeepAnalysisForDownload(deepAnalysis);
        downloadTextAsFile(content, `resume-deep-analysis-${Date.now()}.txt`);
        toast.success('Deep analysis report downloaded successfully!');
    };

    const downloadBenchmarkReport = () => {
        if (!benchmark) return;
        const content = formatBenchmarkForDownload(benchmark);
        downloadTextAsFile(content, `resume-benchmark-report-${Date.now()}.txt`);
        toast.success('Benchmark report downloaded successfully!');
    };

    const downloadCoverLetterReport = () => {
        if (!coverLetter) return;
        const content = formatCoverLetterForDownload(coverLetter);
        downloadTextAsFile(content, `cover-letter-${Date.now()}.txt`);
        toast.success('Cover letter downloaded successfully!');
    };

    return (
        <div className='h-full flex flex-col gap-4 py-6 px-6 pb-5 bg-neutral-950'>
            {/* Enhanced Header with Action Buttons */}
            <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                    <h1 className='text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
                        Resume Enhancement Suite
                    </h1>
                    <span className='text-sm text-neutral-400 border border-neutral-600 px-3 py-2 rounded-full flex items-center gap-2 bg-neutral-800/50 w-fit'>
                        <FileText className='h-3 w-3' />
                        {resumeFile?.name || 'Resume Analysis'}
                    </span>
                </div>
                
                <div className='flex gap-3 flex-wrap'>
                    <button
                        onClick={() => performDeepAnalysis('ats-optimization')}
                        disabled={loading}
                        className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-blue-500/25'
                    >
                        <Target className='h-4 w-4' />
                        ATS Analysis
                    </button>
                    <button
                        onClick={performBenchmarking}
                        disabled={loading}
                        className='bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-green-500/25'
                    >
                        <TrendingUp className='h-4 w-4' />
                        Benchmark
                    </button>
                    <button
                        onClick={generateCoverLetter}
                        disabled={loading}
                        className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-purple-500/25'
                    >
                        <Mail className='h-4 w-4' />
                        Cover Letter
                    </button>
                </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className='flex border-b border-neutral-700 mb-6 bg-neutral-900/30 rounded-t-xl backdrop-blur-sm'>
                <button
                    onClick={() => setActiveTab('basic')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'basic' 
                            ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
                    }`}
                >
                    <Sparkles className='h-4 w-4 inline mr-2' />
                    Basic Suggestions
                </button>
                <button
                    onClick={() => setActiveTab('deep')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'deep' 
                            ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
                    }`}
                >
                    <Brain className='h-4 w-4 inline mr-2' />
                    Deep Analysis
                </button>
                <button
                    onClick={() => setActiveTab('benchmark')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'benchmark' 
                            ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
                    }`}
                >
                    <TrendingUp className='h-4 w-4 inline mr-2' />
                    Benchmarking
                </button>
                <button
                    onClick={() => setActiveTab('cover-letter')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'cover-letter' 
                            ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                            : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
                    }`}
                >
                    <Mail className='h-4 w-4 inline mr-2' />
                    Cover Letter
                </button>
            </div>

            {/* Enhanced Content Area */}
            <div className='flex-1 rounded-xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm shadow-2xl overflow-hidden'>
                {activeTab === 'basic' && (
                    <div className='h-full p-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800'>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className='text-xl font-semibold text-blue-400 flex items-center gap-2'>
                                <Sparkles className='h-5 w-5' />
                                Basic Resume Suggestions
                            </h2>
                        </div>
                        {suggestions.length > 0 ? (
                            <div className="space-y-4">
                                {suggestions.map((suggestion, index) => (
                                    <SuggestionCard 
                                        key={index}
                                        heading={suggestion.heading}
                                        description={suggestion.description}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-64 space-y-4'>
                                <div className='bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-8 rounded-2xl border border-neutral-700/50 backdrop-blur-sm'>
                                    <div className="flex flex-col items-center space-y-4">
                                        <LoaderCircle className='h-8 w-8 animate-spin text-blue-400'/>
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold text-neutral-300 mb-2">Analyzing Your Resume</h3>
                                            <p className="text-sm text-neutral-400 max-w-md">
                                                Our AI is carefully reviewing your resume to provide personalized suggestions...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'deep' && (
                    <div className='h-full p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold text-sky-400'>Deep Analysis Results</h2>
                            {deepAnalysis && (
                                <button
                                    onClick={downloadDeepAnalysis}
                                    className='bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm'
                                >
                                    <Download className='h-4 w-4' />
                                    Download Report
                                </button>
                            )}
                        </div>
                        {deepAnalysis ? (
                            <div className='space-y-4'>
                                {deepAnalysis.atsScore && (
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-green-400 mb-2'>ATS Score</h3>
                                        <p className='text-2xl font-bold text-white'>{deepAnalysis.atsScore}</p>
                                    </div>
                                )}
                                {deepAnalysis.keywordAnalysis && (
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-yellow-400 mb-2'>Keyword Analysis</h3>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <h4 className='text-sm font-medium text-green-300'>Present Keywords</h4>
                                                <div className='flex flex-wrap gap-1 mt-1'>
                                                    {deepAnalysis.keywordAnalysis.presentKeywords?.map((keyword: string, i: number) => (
                                                        <span key={i} className='bg-green-900 text-green-200 px-2 py-1 rounded text-xs'>
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className='text-sm font-medium text-red-300'>Missing Keywords</h4>
                                                <div className='flex flex-wrap gap-1 mt-1'>
                                                    {deepAnalysis.keywordAnalysis.missingKeywords?.map((keyword: string, i: number) => (
                                                        <span key={i} className='bg-red-900 text-red-200 px-2 py-1 rounded text-xs'>
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {deepAnalysis.overallRecommendations && (
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-blue-400 mb-2'>Recommendations</h3>
                                        <ul className='space-y-2'>
                                            {deepAnalysis.overallRecommendations.map((rec: string, i: number) => (
                                                <li key={i} className='text-neutral-300 flex items-start gap-2'>
                                                    <span className='text-blue-400 mt-1'>•</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-64 text-center'>
                                <Brain className='h-12 w-12 text-neutral-600 mb-4' />
                                <p className='text-neutral-400 mb-4'>No deep analysis performed yet</p>
                                <button
                                    onClick={() => performDeepAnalysis('comprehensive')}
                                    disabled={loading}
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50'
                                >
                                    Start Deep Analysis
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'benchmark' && (
                    <div className='h-full p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold text-sky-400'>Industry Benchmarking</h2>
                            {benchmark && (
                                <button
                                    onClick={downloadBenchmarkReport}
                                    className='bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm'
                                >
                                    <Download className='h-4 w-4' />
                                    Download Report
                                </button>
                            )}
                        </div>
                        {benchmark ? (
                            <div className='space-y-4'>
                                <div className='grid grid-cols-3 gap-4'>
                                    <div className='bg-neutral-800 p-4 rounded-lg text-center'>
                                        <h3 className='text-sm text-neutral-400'>Overall Score</h3>
                                        <p className='text-2xl font-bold text-white'>{benchmark.overallScore}</p>
                                    </div>
                                    <div className='bg-neutral-800 p-4 rounded-lg text-center'>
                                        <h3 className='text-sm text-neutral-400'>Industry Percentile</h3>
                                        <p className='text-2xl font-bold text-green-400'>{benchmark.industryBenchmark?.percentile}</p>
                                    </div>
                                    <div className='bg-neutral-800 p-4 rounded-lg text-center'>
                                        <h3 className='text-sm text-neutral-400'>Shortlist Probability</h3>
                                        <p className='text-2xl font-bold text-blue-400'>{benchmark.marketCompetitiveness?.likelyToGetShortlisted}</p>
                                    </div>
                                </div>
                                
                                {benchmark.salaryImpact && (
                                    <div className='bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 rounded-lg border border-green-800'>
                                        <h3 className='font-semibold text-green-400 mb-2'>Salary Impact Analysis</h3>
                                        <p className='text-lg font-bold text-white'>{benchmark.salaryImpact.estimatedSalaryRange}</p>
                                        <p className='text-sm text-green-300'>{benchmark.salaryImpact.improvementPotential}</p>
                                    </div>
                                )}

                                {benchmark.actionableRecommendations && (
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-yellow-400 mb-3'>Action Plan</h3>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <div>
                                                <h4 className='text-sm font-medium text-green-300 mb-2'>Immediate (0-1 week)</h4>
                                                <ul className='space-y-1'>
                                                    {benchmark.actionableRecommendations.immediate?.map((action: string, i: number) => (
                                                        <li key={i} className='text-xs text-neutral-300'>• {action}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className='text-sm font-medium text-yellow-300 mb-2'>Short-term (1-4 weeks)</h4>
                                                <ul className='space-y-1'>
                                                    {benchmark.actionableRecommendations.shortTerm?.map((action: string, i: number) => (
                                                        <li key={i} className='text-xs text-neutral-300'>• {action}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className='text-sm font-medium text-blue-300 mb-2'>Long-term (1-3 months)</h4>
                                                <ul className='space-y-1'>
                                                    {benchmark.actionableRecommendations.longTerm?.map((action: string, i: number) => (
                                                        <li key={i} className='text-xs text-neutral-300'>• {action}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-64 text-center'>
                                <TrendingUp className='h-12 w-12 text-neutral-600 mb-4' />
                                <p className='text-neutral-400 mb-4'>No benchmarking performed yet</p>
                                <button
                                    onClick={performBenchmarking}
                                    disabled={loading}
                                    className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50'
                                >
                                    Start Benchmarking
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'cover-letter' && (
                    <div className='h-full p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold text-sky-400'>AI-Generated Cover Letter</h2>
                            {coverLetter && (
                                <button 
                                    onClick={downloadCoverLetterReport}
                                    className='bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm'
                                >
                                    <Download className='h-4 w-4' />
                                    Download
                                </button>
                            )}
                        </div>
                        
                        {coverLetter ? (
                            <div className='space-y-6'>
                                <div className='bg-white text-black p-6 rounded-lg font-serif leading-relaxed'>
                                    <div className='whitespace-pre-line'>
                                        {coverLetter.coverLetter}
                                    </div>
                                </div>
                                
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-green-400 mb-2'>Key Highlights</h3>
                                        <ul className='space-y-1'>
                                            {coverLetter.keyHighlights?.map((highlight: string, i: number) => (
                                                <li key={i} className='text-sm text-neutral-300'>• {highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-blue-400 mb-2'>Personalized Elements</h3>
                                        <ul className='space-y-1'>
                                            {coverLetter.personalizedElements?.map((element: string, i: number) => (
                                                <li key={i} className='text-sm text-neutral-300'>• {element}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {coverLetter.alternativeVersions && (
                                    <div className='bg-neutral-800 p-4 rounded-lg'>
                                        <h3 className='font-semibold text-purple-400 mb-3'>Alternative Opening Styles</h3>
                                        <div className='space-y-3'>
                                            {Object.entries(coverLetter.alternativeVersions).map(([style, text]) => (
                                                <div key={style} className='border border-neutral-700 p-3 rounded'>
                                                    <h4 className='text-sm font-medium text-purple-300 mb-1 capitalize'>{style}</h4>
                                                    <p className='text-sm text-neutral-300'>{text as string}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-64 text-center'>
                                <Mail className='h-12 w-12 text-neutral-600 mb-4' />
                                <p className='text-neutral-400 mb-4'>No cover letter generated yet</p>
                                <button
                                    onClick={generateCoverLetter}
                                    disabled={loading}
                                    className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50'
                                >
                                    Generate Cover Letter
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhanceResume;
