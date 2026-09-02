import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Full-bleed background image */}
      <img
        src="/about.jpg"
        alt="About Bayn Academy"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — uniform across the whole image */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-[68px] font-serif leading-[1.1] mb-6 tracking-tight text-[#4ecdc4]">
          Redefining Ethiopian<br />Beauty Artistry.
        </h1>
        <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed font-sans">
          Blending rich heritage with modern techniques to empower<br className="hidden md:block" />
          the next generation of makeup artists.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;

