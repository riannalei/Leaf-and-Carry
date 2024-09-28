import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Recursive as RecursiveFont } from 'next/font/google'; 
import { Inter } from "next/font/google";
import "./globals.css";

const recursiveFont = RecursiveFont({ subsets: ["latin"] });  

export const metadata: Metadata = {
  title: "Leaf&Carry",
  description: "leaf and carry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursiveFont.className}> 
      
        <Navbar />

        <main className='flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]'>
          <div className='flex-1 flex flex-col h-full'>
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
