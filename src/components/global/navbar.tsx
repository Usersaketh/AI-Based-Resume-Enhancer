import { HeartHandshake, MenuIcon } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server';

type Props = {}

const NavBar = async () => {
    const user = await currentUser();
    
  return (
    <header className="fixed right-0 left-0 top-0 h-[4.5rem] px-4 bg-black backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
        {/* logo */}
        <Link href={"/"} className='text-3xl mx-14 text-white font-bold cursor-pointer'>Resume-Revamp</Link>
        {/* nav button */}
        <div className="flex items-center gap-4">
            <div className='flex items-center gap-1'>
                <HeartHandshake className='h-5 w-5' />
                <h1>Hello! {user?.firstName}</h1>
            </div>
            {
                user ? 
                <Link
                    href="/dashboard"
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] hover:opacity-80"
                    >
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl border border-white">
                        Dashboard
                    </span>
                </Link>
                :

                <SignInButton>
                    <button
                        className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] hover:opacity-80"
                        >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Get Started
                        </span>
                    </button>
                </SignInButton>
            }
        </div>
    </header>
  )
}

export default NavBar