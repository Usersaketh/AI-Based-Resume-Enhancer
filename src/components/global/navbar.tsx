'use client';

import { Sparkles, Brain, Bot, Menu, X } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed right-0 left-0 top-0 h-[4.5rem] px-4 bg-black/95 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-800 justify-between">
            {/* Logo */}
            <Link href={"/"} className='flex items-center text-xl sm:text-2xl lg:text-3xl mx-2 sm:mx-4 lg:mx-14 text-white font-bold cursor-pointer hover:opacity-80 transition-opacity'>
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">&nbsp;Resume</span>
                <span className="text-white">GPT</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-center flex-1">
                <Link href="/enhance-resume/upload-resume" 
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-3 lg:px-4 py-2 rounded-lg hover:bg-neutral-800">
                    <Sparkles className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="text-sm lg:text-base font-medium">Enhance Resume</span>
                </Link>
                <Link href="/generate-resume" 
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-3 lg:px-4 py-2 rounded-lg hover:bg-neutral-800">
                    <Brain className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="text-sm lg:text-base font-medium">Generate Resume</span>
                </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-neutral-800 rounded-lg transition-colors"
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-neutral-800 md:hidden">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link 
                            href="/enhance-resume/upload-resume" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-neutral-800"
                        >
                            <Sparkles className="h-5 w-5" />
                            <span className="text-base font-medium">Enhance Resume</span>
                        </Link>
                        <Link 
                            href="/generate-resume" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-neutral-800"
                        >
                            <Brain className="h-5 w-5" />
                            <span className="text-base font-medium">Generate Resume</span>
                        </Link>
                    </nav>
                </div>
            )}

            {/* Right side placeholder for balance (desktop only) */}
            <div className="hidden md:block w-[150px] lg:w-[200px] xl:w-[280px]"></div>
        </header>
    )
}

export default NavBar
