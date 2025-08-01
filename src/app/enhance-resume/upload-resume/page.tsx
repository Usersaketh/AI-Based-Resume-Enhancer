"use client";

import Resume3DCard from "@/components/global/resume-card";
import { useEnhanceResumeStore } from "@/store/enhance-resume-store";
import { CloudUpload, FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const UploadResume: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState<string>("");
    const setResumeFile = useEnhanceResumeStore((state) => state.setResumeFile);
    const setResumeSuggestions = useEnhanceResumeStore((state) => state.setResumeSuggestions);
    const resumeFileBase64 = useEnhanceResumeStore((state) => state.resumeFileBase64);
    const setResumeFileBase64 = useEnhanceResumeStore((state) => state.setResumeFileBase64);
    const router = useRouter();

    // Auto-clear on component mount
    useEffect(() => {
        const autoClear = () => {
            setResumeFileBase64(null);
            setResumeSuggestions(null);
            setJobDescription("");
        };
        
        // Clear immediately on page load
        autoClear();
    }, [setResumeFileBase64, setResumeSuggestions]);

    // Convert PDF to base64 for Gemini
    const convertPdfToBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    // Remove the data URL prefix and return just the base64 data
                    const base64Data = result.split(',')[1];
                    resolve(base64Data);
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            fileReader.onerror = () => reject(new Error('Failed to read file'));
            fileReader.readAsDataURL(file);
        });
    };

    const generateSuggestions = async (file: File | null, jobDesc: string) => {
        if (!file) {
            toast.error("Please upload a resume.");
            return;
        }
        if (!jobDesc.trim()) {
            toast.error("Please enter a job description.");
            return;
        }
        if (jobDesc.trim().length < 50) {
            toast.error("Please provide a more detailed job description (minimum 50 characters).");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Analyzing your resume PDF with AI...");
        
        try {
            
            let pdfBase64;
            try {
                pdfBase64 = await convertPdfToBase64(file);
                if (!pdfBase64) {
                    throw new Error("No data generated from PDF");
                }
                console.log(`Generated base64 data from PDF (${pdfBase64.length} characters)`);
            } catch (pdfError) {
                console.error("PDF to base64 conversion failed:", pdfError);
                throw new Error("Failed to convert PDF. Please ensure it's a valid PDF file.");
            }

            
            
            const response = await fetch("/api/enhance-resume/generate-suggestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pdfBase64, jobDescription: jobDesc }),
            });

            
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch suggestions: ${errorText}`);
            }

            const result = await response.json();
            
            
            if (!result.suggestions) {
                throw new Error("No suggestions received from AI");
            }
            
            const suggestions = result.suggestions;
            

            // Store suggestions as a JSON string
            setResumeSuggestions(JSON.stringify({ suggestions }));
            console.log("Stored suggestions in store:", JSON.stringify({ suggestions }));

            toast.success("Resume analysis completed successfully!");
            
            router.push("/enhance-resume");
        } catch (error) {
            console.error("Detailed error in generateSuggestions:", error);
            const errorMessage = error instanceof Error ? error.message : "Error Generating Suggestions. Try Again.";
            toast.error(errorMessage);
        } finally {
            toast.dismiss(loadingToast);
            setLoading(false);
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            
            setResumeFile(file);
        },
        [setResumeFile]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        onDrop,
    });

    const handleAnalyze = () => {
        if (resumeFileBase64) {
            
            // Strip the data URL prefix if present (e.g., "data:application/pdf;base64,")
            const base64String = resumeFileBase64.base64.startsWith("data:application/pdf;base64,")
                ? resumeFileBase64.base64.split(",")[1]
                : resumeFileBase64.base64;

            // Convert base64 to Blob
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const file = new File([blob], resumeFileBase64.name, { type: "application/pdf" });

            generateSuggestions(file, jobDescription);
        } else {
            toast.error("No resume file found. Please upload a resume.");
        }
    };

    const handleRemoveFile = () => {
        setResumeFileBase64(null);
        setResumeFile(null);
        setResumeSuggestions(null);
        setJobDescription("");
        toast.success("All data cleared successfully!");
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative flex justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            
            <div className="relative z-10 w-full max-w-7xl px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Upload Your Resume
                    </h1>
                    <p className="text-lg text-gray-400">Get AI-powered insights to enhance your resume</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 w-full items-start">
                    <div className="w-full lg:w-1/2">
                        {!resumeFileBase64 ? (
                            <div
                                {...getRootProps()}
                                className={`relative overflow-hidden text-white px-8 flex flex-col items-center py-16 border-2 border-dashed cursor-pointer transition-all duration-300 rounded-2xl ${
                                    isDragActive 
                                        ? "border-blue-400 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-2xl shadow-blue-500/20 scale-105" 
                                        : "border-gray-600 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm hover:border-gray-500 hover:shadow-xl hover:shadow-purple-500/10"
                                }`}
                            >
                                <input {...getInputProps()} />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl"></div>
                                <CloudUpload className={`h-16 w-16 mb-4 transition-all duration-300 relative z-10 ${isDragActive ? 'text-blue-400 scale-110' : 'text-gray-400'}`} />
                                <div className="text-center relative z-10">
                                    {isDragActive ? (
                                        <div>
                                            <p className="text-xl font-semibold text-blue-400 mb-2">Drop your resume here!</p>
                                            <p className="text-gray-300">We&apos;ll analyze it instantly</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-xl font-semibold mb-2">Drop your resume here</p>
                                            <p className="text-gray-400 mb-3">or click to browse files</p>
                                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium">
                                                Choose File
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-4 relative z-10">PDF files only • Max 10MB</p>
                            </div>
                        ) : (
                            <div className="relative overflow-hidden text-white px-8 flex flex-col items-center py-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border-2 border-green-500/30 shadow-xl shadow-green-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 rounded-2xl"></div>
                                <div className="relative z-10 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                                        <FileText className="h-8 w-8 text-white" />
                                    </div>
                                    <p className="text-green-400 font-semibold text-sm mb-1">✓ UPLOADED SUCCESSFULLY</p>
                                    <p className="font-semibold text-xl mb-6 text-white">{resumeFileBase64.name}</p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={handleRemoveFile}
                                            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                                        </button>
                                        <div
                                            {...getRootProps()}
                                            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 cursor-pointer"
                                        >
                                            <input {...getInputProps()} />
                                            <CloudUpload className="h-4 w-4 mr-2" /> Replace
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6">
                        <div>
                            <label htmlFor="job-description" className="text-white font-semibold mb-3 block text-lg">
                                Job Description
                            </label>
                            <textarea
                                id="job-description"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here to get targeted recommendations..."
                                className="w-full p-4 rounded-xl bg-neutral-800/50 backdrop-blur-sm text-white border border-gray-600 focus:border-blue-400 focus:outline-none resize-none transition-all duration-300 hover:bg-neutral-800/70"
                                rows={8}
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !resumeFileBase64}
                            className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 shadow-xl ${
                                loading || !resumeFileBase64 
                                    ? "opacity-50 cursor-not-allowed" 
                                    : "hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Analyzing with AI...
                                </div>
                            ) : (
                                "🚀 Analyze Resume with AI"
                            )}
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default UploadResume;
