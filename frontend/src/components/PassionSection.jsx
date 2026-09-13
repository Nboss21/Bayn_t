import React from 'react';
import { Link } from 'react-router-dom';
import { passionData } from '../data/home/passionData';
import ImageReveal from './ImageReveal';
import Reveal from './Reveal';

const PassionSection = () => {
  const { image, heading, description, cta } = passionData;

  return (
    <section className="relative bg-cream py-28 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_30%,rgba(201,162,39,0.08),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-[95%] max-w-6xl flex flex-col items-center gap-14 md:flex-row md:gap-20">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2">
          <ImageReveal
            src={image.src}
            alt={image.alt}
            className="aspect-[4/5] w-full md:aspect-[3/4]"
          />
        </div>

        {/* Right Column - Content */}
        <div className="flex w-full flex-col items-start text-left md:w-1/2">
          <Reveal delay={0}>
            <div
              className="mb-8 inline-flex rounded-xl bg-champagne/10 p-3 text-champagne"
              aria-hidden
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.75 3.486a2.25 2.25 0 00-1.5 0L3.393 6.94a2.25 2.25 0 00-1.144 1.95v6.22a2.25 2.25 0 001.144 1.95L11.25 20.51a2.25 2.25 0 001.5 0l7.857-3.447a2.25 2.25 0 001.144-1.95v-6.22a2.25 2.25 0 00-1.144-1.95L12.75 3.486zM11.64 5.378a.75.75 0 01.72 0l7.25 3.18-7.25 3.18-7.25-3.18 7.25-3.18zM4.143 8.89l7.107 3.118v7.411l-7.107-3.118V8.89zm8.607 10.53v-7.411l7.107-3.118v7.411l-7.107-3.118z" />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0}>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
              <span className="h-[1px] w-10 bg-champagne/80" />
              About Lumière
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mb-8 font-display text-5xl font-light leading-[1.05] tracking-[-0.01em] text-ink md:text-[62px]">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mb-10 max-w-[420px] text-base leading-relaxed text-ink/70">
              {description}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <Link
              to={cta.to}
              className="group relative inline-flex items-center gap-3 font-semibold text-bronze after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-0"
            >
              <span>{cta.label}</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PassionSection;