import { Sparkles, Brain, Bot } from 'lucide-react';
import Link from 'next/link'


const NavBar = () => {
    return (
        <header className="fixed right-0 left-0 top-0 h-[4.5rem] px-4 bg-black/95 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-800 justify-between">
            {/* Logo */}
            <Link href={"/"} className='flex items-center text-2xl lg:text-3xl mx-4 lg:mx-14 text-white font-bold cursor-pointer hover:opacity-80 transition-opacity'>
                <Bot className="h-7 w-7 lg:h-8 lg:w-8 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">&nbsp;Resume</span>
                <span className="text-white">GPT</span>
            </Link>
            
            {/* Centered Navigation Links */}
            <nav className="flex items-center gap-8 justify-center flex-1">
                <Link href="/enhance-resume/upload-resume" 
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-neutral-800">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-base font-medium">Enhance Resume</span>
                </Link>
                <Link href="/generate-resume" 
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-neutral-800">
                    <Brain className="h-5 w-5" />
                    <span className="text-base font-medium">Generate Resume</span>
                </Link>
            </nav>

            {/* Right side placeholder for balance */}
            <div className="w-[200px] lg:w-[280px]"></div>
        </header>
    )
}

export default NavBar
