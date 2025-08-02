import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import NavBar from '@/components/global/navbar';

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeGPT - AI-Powered Resume Enhancement & Generation",
  description: "Create professional resumes with AI assistance. Enhance existing resumes or generate new ones with our advanced AI technology.",
  keywords: ["resume", "AI", "career", "job application", "resume builder", "resume enhancement", "professional resume"],
  authors: [{ name: "ResumeGPT Team" }],
  creator: "ResumeGPT",
  publisher: "ResumeGPT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ResumeGPT - AI-Powered Resume Enhancement",
    description: "Create professional resumes with AI assistance. Enhance existing resumes or generate new ones with our advanced AI technology.",
    url: "https://resumegpt.ai",
    siteName: "ResumeGPT",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeGPT - AI-Powered Resume Enhancement",
    description: "Create professional resumes with AI assistance",
    creator: "@resumegpt",
  },
  alternates: {
    canonical: "https://resumegpt.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body className={font.className}>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className='flex-1 pt-20'>
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
