import React from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '../data/home/galleryData';
import Reveal from './Reveal';
import ImageReveal from './ImageReveal';

const Gallery = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-6 md:py-32 md:px-10 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 h-[480px] w-[480px] rounded-full bg-champagne/10 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <Reveal className="flex flex-col items-center">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
            <span className="h-[1px] w-10 bg-champagne/80" />
            Our Work
            <span className="h-[1px] w-10 bg-champagne/80" />
          </p>
          <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-ink md:text-6xl">
            The <em className="not-italic text-champagne">Gallery</em>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
            Real work from our students, instructors, and academy events.
          </p>
        </Reveal>

        {/* Masonry columns */}
        <div className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          {/* Column 1 */}
          <Reveal delay={120} className="flex flex-col gap-6">
            <ImageReveal
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              rounded="rounded-2xl"
              className="aspect-[3/4] w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
              />
            </ImageReveal>
          </Reveal>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <Reveal delay={200}>
              <ImageReveal
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                rounded="rounded-2xl"
                className="aspect-[4/5] w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
                />
              </ImageReveal>
            </Reveal>
            <Reveal delay={280}>
              <ImageReveal
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                rounded="rounded-2xl"
                className="aspect-square w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
                />
              </ImageReveal>
            </Reveal>
            <Reveal delay={360}>
              <ImageReveal
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                rounded="rounded-2xl"
                className="aspect-[4/5] w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
                />
              </ImageReveal>
            </Reveal>
          </div>

          {/* Column 3 */}
          <Reveal delay={240} className="flex flex-col gap-6">
            <ImageReveal
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              rounded="rounded-2xl"
              className="aspect-[4/3] w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
              />
            </ImageReveal>
            <ImageReveal
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
              rounded="rounded-2xl"
              className="aspect-[4/5] w-full ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(34,23,18,0.35)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
              />
            </ImageReveal>
          </Reveal>
        </div>

        {/* View More */}
        <Reveal delay={120} className="mt-14">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-espresso/20 px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-espresso hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            View Gallery
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
        </Reveal>
      </div>
    </section>
  );
};

export default Gallery;