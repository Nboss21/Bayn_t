import React from 'react';
import { Link } from 'react-router-dom';
import { heroData } from '../data/home/heroData';

const Hero = () => {
  const { heading, subtitle, cta, socials } = heroData;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">
      {/* Full-bleed background image */}
      <img
        src="/hero.png"
        alt="Makeup artistry"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — heavier on the left so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

      {/* Main content */}
      <div className="relative z-10 w-full px-8 md:px-20 pt-32 pb-24 flex flex-col justify-center min-h-screen">

        {/* Heading */}
        <h1 className="text-6xl md:text-[82px] font-serif leading-[1.08] mb-6 tracking-[0.02em] max-w-lg">
          {heading}
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 max-w-sm mb-10 text-base md:text-lg leading-relaxed font-sans">
          {subtitle}
        </p>

        {/* CTA */}
        <div>
          <Link to={cta.to} className="bg-[#8f6340] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#a3724a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-block">
            {cta.label}
          </Link>
        </div>
      </div>

      {/* Social icons — right edge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5">
        {socials.map(({ label, href, path }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d={path} />
            </svg>
          </a>
        ))}
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1.5 text-white/40 animate-[float_2.5s_ease-in-out_infinite] motion-reduce:animate-none">
        <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mb-3">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
