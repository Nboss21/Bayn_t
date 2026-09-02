import React from 'react';

const EnrollmentCTA = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-20 max-w-[1240px] mx-auto w-full">
      <div className="bg-[#b38865] rounded-[32px] sm:rounded-[44px] md:rounded-[52px] py-16 sm:py-24 flex flex-col items-center justify-center text-center shadow-sm">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-8">
          Enrollment Now Open
        </h2>
        
        <button className="bg-[#eec15b] hover:bg-[#d8ae52] text-[#1c1c1c] px-8 py-3.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-colors shadow-sm">
          Apply Now
        </button>
      </div>
    </section>
  );
};

export default EnrollmentCTA;
