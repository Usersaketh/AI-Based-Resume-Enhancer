"use client";

import Resume3DCard from "@/components/global/resume-card";
import { useEnhanceResumeStore } from "@/store/enhance-resume-store";
import { CloudUpload, FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import PDFToText from "react-pdftotext";

const UploadResume: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState<string>("");
    const setResumeFile = useEnhanceResumeStore((state) => state.setResumeFile);
    const setResumeSuggestions = useEnhanceResumeStore((state) => state.setResumeSuggestions);
    const resumeFileBase64 = useEnhanceResumeStore((state) => state.resumeFileBase64);
    const setResumeFileBase64 = useEnhanceResumeStore((state) => state.setResumeFileBase64);
    const router = useRouter();

    const generateSuggestions = async (file: File | null, jobDesc: string) => {
        if (!file) {
            toast.error("Please upload a resume.");
            return;
        }
        if (!jobDesc) {
            toast.error("Please enter a job description.");
            return;
        }

        setLoading(true);
        try {
            console.log("Extracting text from file:", file.name);
            let text;
            try {
                text = await PDFToText(file);
            } catch (pdfError) {
                console.error("PDF extraction failed:", pdfError);
                throw new Error("Failed to extract text from PDF. Please ensure it's a text-based PDF (not scanned).");
            }

            console.log("Extracted text:", text);
            console.log("Sending request to API with text and jobDescription:", { text, jobDescription: jobDesc });
            const response = await fetch("/api/enhance-resume/generate-suggestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, jobDescription: jobDesc }),
            });

            console.log("API response:", response);
            console.log("API response status:", response.status);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch suggestions from route: ${errorText}`);
            }

            const result = await response.json();
            console.log("API response JSON:", result);
            const suggestions = result.suggestions;
            console.log("API response suggestions:", suggestions);

            // Store suggestions as a JSON string
            setResumeSuggestions(JSON.stringify({ suggestions }));
            console.log("Stored suggestions in store:", JSON.stringify({ suggestions }));

            console.log("Generated Suggestions Successfully:", suggestions);
            router.push("/enhance-resume");
        } catch (error) {
            console.error("Detailed error in generateSuggestions:", error);
            const errorMessage = error instanceof Error ? error.message : "Error Generating Suggestions. Try Again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            console.log("File dropped:", file.name);
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
            console.log("Converting base64 to File:", resumeFileBase64.name);
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
        toast.success("Resume file removed.");
    };

    return (
        <div className="w-full h-full bg-neutral-950 bg-dot-white/[0.1] relative flex items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 1500 }} />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex justify-center gap-40 items-center w-full">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-500">
                        Upload Your Resume
                    </h1>
                    <p className="font-bold text-slate-500 mb-12">Note: We are not storing your resume in any database.</p>

                    {!resumeFileBase64 ? (
                        <div
                            {...getRootProps()}
                            className={`text-white px-10 flex flex-col items-center py-14 border-2 bg-black border-dashed cursor-pointer ${
                                isDragActive ? "border-sky-500" : "border-gray-300"
                            } rounded-lg`}
                        >
                            <input {...getInputProps()} />
                            <CloudUpload className="h-12 w-12 mb-2" />
                            <p>Drop your resume here or choose a file.</p>
                        </div>
                    ) : (
                        <div className="text-white px-10 flex flex-col items-center py-14 bg-neutral-900 rounded-lg border-2 border-gray-300">
                            <FileText className="h-12 w-12 mb-2 text-sky-500" />
                            <p className="text-center">
                                Uploaded: <span className="font-semibold">{resumeFileBase64.name}</span>
                            </p>
                            <button
                                onClick={handleRemoveFile}
                                className="mt-3 flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                            >
                                <Trash2 className="h-5 w-5 mr-2" /> Remove File
                            </button>
                        </div>
                    )}

                    <div className="mt-6 w-full max-w-md">
                        <label htmlFor="job-description" className="text-white font-semibold mb-2 block">
                            Job Description
                        </label>
                        <textarea
                            id="job-description"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here..."
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-gray-300 focus:border-sky-500 focus:outline-none resize-y"
                            rows={4}
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className={`mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:from-sky-600 hover:to-teal-600"
                        }`}
                    >
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </div>
                <div>
                    <Resume3DCard />
                </div>
            </div>
        </div>
    );
};

export default UploadResume;
