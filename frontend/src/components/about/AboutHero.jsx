import React from 'react';

const AboutHero = () => {
  return (
    <section className="bg-[#1f1d1b] text-white min-h-screen flex flex-col justify-center pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto w-[90%]">
        <h1 className="text-5xl md:text-[72px] font-serif leading-[1.1] mb-8 tracking-tight text-[#f4f4f4]">
          Redefining Ethiopian<br />Beauty Artistry.
        </h1>
        <p className="text-[#a8a09a] max-w-lg text-sm md:text-base leading-relaxed">
          A premier training ground dedicated to elevating East African makeup standards
          through world-class instruction and hands-on artistry.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
