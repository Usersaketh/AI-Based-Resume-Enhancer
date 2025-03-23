'use client';

import SuggestionCard from '@/components/enhance-resume/suggestion-card';
import { base64ToFile } from '@/lib/fileUtils';
import { useEnhanceResumeStore } from '@/store/enhance-resume-store';
import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

const PdfViewer = dynamic(() => import('@/components/enhance-resume/pdf-viewer'), { ssr: false });

type Suggestion = {
    heading: string;
    description: string;
};

const EnhanceResume = () => {
    const resumeFileBase64 = useEnhanceResumeStore((state) => state.resumeFileBase64);
    const resumeSuggestions = useEnhanceResumeStore((state) => state.resumeSuggestions);

    console.log("Raw resumeSuggestions from store:", resumeSuggestions);

    const parseSuggestions = (jsonText: string | null): Suggestion[] => {
        if (!jsonText) {
            console.log("No suggestions found in store.");
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

            console.log("Parsed suggestions:", parsed);

            if (parsed && Array.isArray(parsed.suggestions)) {
                return parsed.suggestions.map((item: { heading: string; description: string }) => ({
                    heading: item.heading,
                    description: item.description
                }));
            } else {
                console.log("Parsed data does not have the expected 'suggestions' key or it is not an array.");
                return [];
            }
        } catch (error) {
            console.error("Failed to parse suggestions:", error);
            return [];
        }
    };

    // Parse the suggestions
    const suggestions = parseSuggestions(resumeSuggestions);
    console.log("Final suggestions array:", suggestions);

    // Convert base64 to File object
    const resumeFile = resumeFileBase64
        ? base64ToFile(resumeFileBase64.base64, resumeFileBase64.name, resumeFileBase64.type)
        : null;

    return (
        <div className='h-full flex gap-3 py-3 px-5 pb-5'>
            {/* Suggestions Viewer */}
            <div className='w-2/4 xl:w-3/5 rounded-xl border-2 p-4 border-neutral-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700'>
                <div className='p-3 rounded-xl mb-10 border-b-2 pb-2'>
                    <p className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-slate-500'>
                        Enhanced Resume Suggestions<br />
                        <span className='text-[14px] text--300 font-normal border-[2px] border-dotted border-sky-500/50 p-1 rounded-lg'>@{resumeFile?.name}</span>
                    </p>
                </div>
                {/* Render Suggestions */}
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <SuggestionCard 
                            key={index}
                            heading={suggestion.heading}
                            description={suggestion.description}
                        />
                    ))
                ) : (
                    <p className='text-neutral-500 text-sm'>No suggestions available. Please try again.</p>
                )}
            </div>

            {/* PDF Viewer */}
            <div className='w-2/4 xl:w-2/5 h-full'>
                {resumeFile ? (
                    <PdfViewer resumeFile={resumeFile} />
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <h1 className='bg-neutral-800 p-3 px-5 rounded-lg font-semibold text-neutral-500 flex items-center'>
                            <LoaderCircle className='h-5 w-5 mr-1 animate-spin'/>
                            Loading Your Resume
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhanceResume;