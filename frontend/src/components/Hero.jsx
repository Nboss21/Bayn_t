import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">
      {/* Full-bleed background image */}
      <img
        src="/hero.png"
        alt="Makeup artistry"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — heavier on the left so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

      {/* Main content */}
      <div className="relative z-10 w-full px-8 md:px-20 pt-32 pb-24 flex flex-col justify-center min-h-screen">

        {/* Enrollment badge */}
        <div className="mb-6 inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-white/80 w-fit backdrop-blur-sm bg-white/5">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Enrollment Open Fall 2026
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-[82px] font-serif leading-[1.05] mb-6 tracking-tight max-w-lg">
          MASTER YOUR<br />ARTISTRY
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 max-w-sm mb-10 text-base md:text-lg leading-relaxed font-sans">
          World-class training from industry expert artists. Your journey to becoming a professional makeup artist starts here.
        </p>

        {/* CTA */}
        <div>
          <button className="bg-[#8f6340] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#a3724a] transition">
            Explore Courses
          </button>
        </div>
      </div>

      {/* Social icons — right edge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5">
        {[
          {
            label: 'Facebook',
            path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
          },
          {
            label: 'Twitter',
            path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
          },
          {
            label: 'Instagram',
            path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 2 2 7.8 2z',
          },
        ].map(({ label, path }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d={path} />
            </svg>
          </a>
        ))}
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1.5 text-white/40">
        <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mb-3">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
