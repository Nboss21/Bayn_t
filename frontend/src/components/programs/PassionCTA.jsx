import React from 'react';

const PassionCTA = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1c1c1c] font-normal leading-tight tracking-tight mb-8 sm:mb-12 max-w-2xl">
          Ready to turn your passion into a profession?
        </h2>

        {/* Explore Button */}
        <div className="w-full">
          <a
            href="#explore"
            className="w-full block bg-[#dfb94d] hover:bg-[#d4ad36] text-[#1a1a1a] font-bold text-[12px] sm:text-[13px] tracking-[0.16em] uppercase py-3.5 sm:py-4 px-6 text-center transition-colors shadow-xs"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default PassionCTA;
