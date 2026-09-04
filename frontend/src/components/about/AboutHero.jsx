import React from 'react';
import { aboutHeroData } from '../../data/about/aboutHeroData';

const AboutHero = () => {
  const { image, heading, subtitle } = aboutHeroData;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Full-bleed background image */}
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — uniform across the whole image */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-[68px] font-serif leading-[1.1] mb-6 tracking-tight text-[#4ecdc4]">
          {heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
          ))}
        </h1>
        <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed font-sans">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
