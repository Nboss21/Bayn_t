import React from 'react';

const ProgramHeaderPill = () => {
  return (
    <div className="bg-[#765339] rounded-[45px] sm:rounded-[65px] px-8 sm:px-12 py-12 sm:py-16 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal leading-tight mb-4">
        Our Programs
      </h1>
      <p className="text-white/80 text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto">
        Discover a curriculum rooted in Ethiopian culture and elevated by global
        standards. Whether you are starting your journey or refining your craft,
        find the path that elevates your artistry.
      </p>
    </div>
  );
};

export default ProgramHeaderPill;
