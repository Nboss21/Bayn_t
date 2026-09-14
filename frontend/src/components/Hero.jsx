import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroData } from '../data/home/heroData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const Hero = () => {
  const { heading, subtitle, cta, socials } = heroData;
  const words = heading.split(' ');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const isReducedMotion = prefersReducedMotion();

  const fadeUp = (m) =>
    `transition-all duration-[900ms] ${EASE} ${m ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  const maskIn = (m) =>
    `inline-block transition-transform duration-[950ms] ${EASE} ${
      m ? 'translate-y-0' : 'translate-y-[115%]'
    }`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-espresso text-white">
      {/* Full-bleed background — poster image for fast paint/LCP */}
      <img
        src="/hero.webp"
        srcSet="/hero-650.webp 650w, /hero.webp 1297w"
        sizes="100vw"
        width={1297}
        height={1213}
        alt=""
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] ${EASE} ${
          mounted ? 'scale-100' : 'scale-[1.08]'
        }`}
      />

      {/* Floating video background (autoplay, muted, looping; static poster under reduced motion) */}
      {!isReducedMotion && (
        <video
          src="/hero.mp4"
          poster="/hero.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] ${EASE} ${
            mounted ? 'scale-100' : 'scale-[1.08]'
          }`}
        />
      )}

      {/* Readability overlay — heavier on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-espresso/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-espresso/30" />

      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-champagne/15 blur-[140px]"
      />

      {/* Faint script watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 bottom-8 select-none font-script text-[15rem] leading-none text-white/[0.04] motion-reduce:hidden"
      >
        Lumière
      </span>

      {/* Film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-8 pt-32 pb-24 md:px-20 lg:pt-24">
        {/* Eyebrow */}
        <p
          className={`mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne-light ${fadeUp(mounted)}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <span className="h-[1px] w-10 bg-champagne-light/80" />
          Lumière Makeup Academy
        </p>

        {/* Headline — staggered word reveal */}
        <h1 className="max-w-4xl font-display text-[clamp(3.25rem,9vw,7.5rem)] font-light leading-[0.98] tracking-[-0.01em]">
          {words.map((word, i) => {
            const isLast = i === words.length - 1;
            return (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-top">
                <span className={maskIn(mounted)} style={{ transitionDelay: `${0.3 + i * 0.16}s` }}>
                  {isLast ? (
                    <em className="relative font-light not-italic">
                      {word}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 h-[0.28em] w-full origin-left bg-champagne/30 transition-transform duration-[1100ms] ${EASE} ${
                          mounted ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ transitionDelay: '1s' }}
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-champagne transition-transform duration-700 ${EASE} ${
                          mounted ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ transitionDelay: '1.15s' }}
                      />
                    </em>
                  ) : (
                    word
                  )}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-8 max-w-md border-l-2 border-champagne/70 pl-5 text-base leading-relaxed text-white/75 ${fadeUp(mounted)}`}
          style={{ transitionDelay: '0.75s' }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div className={`mt-11 flex flex-wrap items-center gap-6 ${fadeUp(mounted)}`} style={{ transitionDelay: '0.95s' }}>
          <Link
            to={cta.to}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-champagne-light px-8 py-4 text-sm font-semibold text-espresso shadow-[0_10px_30px_-10px_rgba(201,162,39,0.55)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
          >
            {/* Espresso fill sweep */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-espresso transition-transform duration-400 ease-out group-hover:translate-x-0"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-champagne-light">
              {cta.label}
            </span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/about"
            className="group relative text-sm font-semibold text-white/70 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne-light after:transition-transform after:duration-300 hover:text-white hover:after:origin-left hover:after:scale-x-0"
          >
            Discover our story
          </Link>
        </div>
      </div>

      {/* Social rail (right) */}
      <div
        className={`absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 transition-opacity duration-1000 lg:flex ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1.2s' }}
      >
        <span className="h-16 w-px bg-white/25" aria-hidden="true" />
        {socials.map(({ label, href, path }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 text-white/55 hover:text-champagne-light hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d={path} />
            </svg>
          </a>
        ))}
        <span className="h-16 w-px bg-white/25" aria-hidden="true" />
      </div>

      {/* Scroll cue */}
      <div
        className={`absolute bottom-10 left-8 z-10 hidden items-center gap-4 text-white/50 transition-opacity duration-1000 md:flex lg:left-20 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1.45s' }}
      >
        <span className="h-px w-12 bg-white/40" aria-hidden="true" />
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;