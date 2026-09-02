import React from 'react';
import LegalHeader from '../components/legal/LegalHeader';
import TableOfContents from '../components/legal/TableOfContents';
import LegalContent from '../components/legal/LegalContent';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen relative">
      {/* Header spacing for absolute navbar */}
      <div className="absolute top-0 left-0 right-0 h-[100px]"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <LegalHeader />
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mt-8">
          <aside className="w-full md:w-[320px] shrink-0">
            <TableOfContents />
          </aside>
          
          <div className="flex-1 border-t border-[#e4ebd9] md:border-none pt-8 md:pt-0">
            <LegalContent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

