import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume-Revamp",
  description: "AI-Powered Resume Enhancement Tool",
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
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
