import React from 'react';

const LegalHeader = () => {
  return (
    <div className="flex justify-center pt-32 pb-12">
      <div className="py-16 px-16 text-center w-full max-w-4xl mx-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#738273] mb-4 font-semibold">
          Legal Information
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-[#2a362a] mb-6 leading-tight">
          Privacy Policy & Terms of Use
        </h1>
        <p className="text-sm text-[#738273]">
          Last updated: October 24, 2024
        </p>
      </div>
    </div>
  );
};

export default LegalHeader;

