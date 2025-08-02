import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from 'lucide-react';
import { FlipWords } from "@/components/global/flip-words";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mb-8 sm:pb-0">
      {/* Hero Section */}
      <section className="w-full h-full rounded-md relative flex flex-col items-center">
        
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl px-6 pt-12">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400 mb-6 leading-tight px-2">
            <FlipWords words={["Enhance", "Generate", "Optimize"]} />
            <br />
            Your Resume With 
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 bg-clip-text text-transparent"> AI Power</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Create ATS-optimized, professional resumes in minutes or get personalized suggestions to enhance your existing resume. 
            <span className="text-white font-semibold"> No sign-up required</span> • Powered by advanced AI technology.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 px-4">
            <Link href="/enhance-resume/upload-resume">
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 min-w-[200px] sm:min-w-[220px] h-12">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Enhance Resume
              </Button>
            </Link>
            <Link href="/generate-resume">
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 min-w-[200px] sm:min-w-[220px] h-12">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Generate Resume
              </Button>
            </Link>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 sm:p-6 hover:bg-neutral-800/50 transition-all duration-300">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-3 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">AI Enhancement</h3>
              <p className="text-xs sm:text-sm text-neutral-400">Get personalized, actionable feedback to improve your resume&apos;s ATS compatibility and impact</p>
            </div>
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 sm:p-6 hover:bg-neutral-800/50 transition-all duration-300">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 mb-3 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Smart Generation</h3>
              <p className="text-xs sm:text-sm text-neutral-400">Create professional resumes from scratch with AI-powered content suggestions and templates</p>
            </div>
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 sm:p-6 hover:bg-neutral-800/50 transition-all duration-300">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 mb-3 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">ATS Optimized</h3>
              <p className="text-xs sm:text-sm text-neutral-400">Ensure your resume passes through Applicant Tracking Systems with copyable recommendations</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

