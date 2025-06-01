'use client';
import Image from 'next/image'
 
import React, { ReactNode, Suspense } from "react";
import Card from "@/src/components/atoms/Card";

interface SplitLayoutProps {
  leftContent?: ReactNode;  
  rightContent?: ReactNode;  
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ leftContent, rightContent }) => {
  return (
       <Suspense fallback={<p>Loading feed...</p>}>
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left side */}
      <div className="bg-indigo-900 w-full md:w-1/2 h-64 md:h-screen flex items-center justify-center  flex-col-reverse align-middle rounded-2xl mb-2 font-bold">
         <Image
      src="/img/logo.png"
      width={100}
      height={100}
      alt="logotag"
    />
        {leftContent ?? <h1 className="text-white text-3xl">Default Left Content</h1>}
      </div>
      
      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Card className="!rounded-2xl !m-5 w-full max-w-md">
          {rightContent ?? <p>No right content provided</p>}
        </Card>
      </div>
    </div>
    </Suspense>
  );
};

export default SplitLayout;
