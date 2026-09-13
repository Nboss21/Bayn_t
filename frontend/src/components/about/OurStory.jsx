import React from 'react';
import { ourStoryData } from '../../data/about/ourStoryData';

// SVG icons for the value cards
const icons = {
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  industry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M18 8h1a2 2 0 0 1 0 4h-1" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

const OurStory = () => {
  const { heading, paragraphs, image, values, mission } = ourStoryData;

  return (
    <>
      {/* ── Story hero band ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#c4956a' }}
      >
        {/* Woman photo — right-aligned, bleeds off top, fades out at the bottom */}
        <div
          className="absolute hidden md:block pointer-events-none"
          style={{ 
            right: 0, 
            top: '-6%', 
            width: '46%', 
            height: '115%',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'top center' }}
          />
        </div>

        {/* Content area */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-14 md:py-24 flex flex-col justify-center"
          style={{ minHeight: 'min(440px, 60vh)' }}>

          {/* Decorative line — sits above the card */}
          <div
            className="hidden md:block mb-3"
            style={{ width: '46%' }}
          >
            <div style={{ width: '48px', height: '1.5px', backgroundColor: 'rgba(255,255,255,0.55)' }} />
          </div>

          {/* Card */}
          <div
            className="w-full md:w-[46%] rounded-2xl px-6 sm:px-8 py-8 sm:py-9"
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <h2
              className="font-serif text-white mb-6"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.75rem)', lineHeight: 1.1, fontStyle: 'italic', fontWeight: 700 }}
            >
              {heading}
            </h2>

            <div className="space-y-4">
              {paragraphs.map((text, i) => (
                <p key={i} style={{ color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(0.78rem, 2vw, 0.82rem)', lineHeight: 1.75 }}>
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Extra space below card — matches the reference breathing room */}
          <div className="h-10 md:h-12" />
        </div>
      </section>

      {/* ── Value cards ── */}
      <section className="px-5 sm:px-6 py-14" style={{ backgroundColor: '#c4956a' }}>
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {values.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ backgroundColor: '#f5ede0', boxShadow: '0 2px 24px rgba(0,0,0,0.09)' }}
            >
              {/* Icon badge */}
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#f5ede0',
                  color: '#c4956a',
                }}
              >
                {icons[item.icon]}
              </div>
              <h3 style={{ color: '#1f1d1b', fontSize: 'clamp(0.78rem, 2vw, 0.82rem)', fontWeight: 600 }}>{item.title}</h3>
              <p style={{ color: '#7a6f67', fontSize: 'clamp(0.7rem, 1.8vw, 0.72rem)', lineHeight: 1.7 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission band ── */}
      <section
        className="text-center px-5 sm:px-6 py-20 md:py-24"
        style={{ backgroundColor: '#8b6340' }}
      >
        <p
          className="flex items-center justify-center gap-2 mb-10"
          style={{
            color: '#d4a96a',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '0.75rem' }}>✦</span>
          {mission.label}
        </p>
        <blockquote
          className="font-serif mx-auto max-w-[90%] md:max-w-[520px]"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
            lineHeight: 1.45,
          }}
        >
          {mission.quote}
        </blockquote>
      </section>
    </>
  );
};

export default OurStory;
