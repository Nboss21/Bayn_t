import React from 'react';

const TeachersHero = () => {
  return (
    <div className="w-full flex flex-col items-center text-center max-w-[800px] mx-auto z-10 py-16 px-8 bg-[#7c5b43] rounded-[40px] text-white">
      <h1 className="font-serif text-4xl md:text-5xl mb-4">
        Meet Our Instructors
      </h1>
      <p className="font-sans text-[14px] leading-relaxed max-w-[500px]">
        Our faculty consists of renowned Ethiopian makeup artists who blend traditional beauty concepts with editorial techniques. They don't just teach; they inspire.
      </p>
    </div>
  );
};

export default TeachersHero;
