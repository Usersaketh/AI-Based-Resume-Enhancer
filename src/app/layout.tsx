import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import NavBar from '@/components/global/navbar';

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeGPT",
  description: "AI-Powered Resume Enhancement and Generation Tool",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <div className="flex flex-col h-screen overflow-hidden">
          <NavBar />
          <div className='h-screen pt-20'>
            {children}
          </div>
        </div>
        <Toaster 
          theme="dark" 
          position="top-right"
          richColors 
          expand 
          closeButton
        />
      </body>
    </html>
  );
}
