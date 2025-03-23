import NavBar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from 'lucide-react';
import { FlipWords } from "@/components/global/flip-words";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Image Section */}
      <section className="h-screen w-full min-h-[100vh] bg-neutral-950 rounded-md relative  flex flex-col items-center ">
      <div className="flex items-center justify-center gap-10 my-10 mt-40">
            <Link href={"/enhance-resume/upload-resume"}>
          <Button
            className="p-6 text-xl w-full sm:w-fit flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500 hover:cursor-pointer">
            <Sparkles className="h-5 w-5 mr-[-8px]" /> Enhance Resume
          </Button>
            </Link>
            <Link href={"/generate-resume"}>
          <Button 
            className="p-6 text-xl w-full sm:w-fit flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500 hover:cursor-pointer">
            <Brain className="h-5 w-5 mr-[-8px]" /> Generate Resume
          </Button>
            </Link>
          </div>
          <h1 className="text-4xl text-white md:text-6xl bg-clip-text text-transparent font-sans font-bold mt-24 text-center">
            <FlipWords words={["Enhance","Generate"]}/>
            &nbsp;Your Resume With Our <br /><span className="text-red-400">Resume-Revamp</span>
          </h1>
      </section>

    </main>
  );
}

