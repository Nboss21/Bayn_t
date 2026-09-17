import React from 'react';
import { Link } from 'react-router-dom';
import { pathData } from '../data/home/pathData';
import ImageReveal from './ImageReveal';
import Reveal from './Reveal';

const PathSection = () => {
  const { heading, sectionLabel, mainProgram, programs } = pathData;

  return (
    <section className="relative bg-gradient-to-br from-espresso via-espresso-soft to-espresso py-28 text-cream md:py-32">
      <div className="grain-overlay grain-overlay--soft" aria-hidden />

      <div className="relative mx-auto w-[95%] max-w-7xl">
        {/* Header Area */}
        <div className="mb-16 md:mb-20">
          <Reveal delay={0}>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne-light">
              <span className="h-[1px] w-10 bg-champagne-light/80" />
              Lumière Makeup Academy
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-cream md:text-[64px]">
              {heading.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}</React.Fragment>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex items-center gap-6">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne-light">
                <span className="h-[1px] w-10 bg-champagne-light/80" />
                {sectionLabel}
              </p>
              <div className="h-px flex-1 bg-cream/20" />
            </div>
          </Reveal>
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-16 md:flex-row md:gap-20 lg:gap-24">
          {/* Left Column (Main Program) */}
          <div className="flex flex-col md:w-1/2">
            <Reveal delay={240}>
              <ImageReveal
                src={mainProgram.image}
                alt={mainProgram.imageAlt}
                className="aspect-[4/3] w-full shadow-lg"
              />
            </Reveal>

            <div className="mb-5 mt-6 flex items-center gap-4">
              <span className="rounded bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-cream">
                {mainProgram.tag}
              </span>
              <span className="text-xs font-bold text-cream">
                {mainProgram.duration}
              </span>
            </div>

            <h4 className="mb-3 font-display text-3xl font-light leading-tight text-cream md:text-4xl">
              {mainProgram.title}
            </h4>

            <p className="mb-8 font-sans text-sm leading-relaxed text-cream/80">
              {mainProgram.description}
            </p>

            <Link
              to="/programs"
              className="group relative inline-flex w-fit items-center gap-3 text-sm font-semibold text-champagne-light after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne-light after:transition-transform after:duration-300 hover:text-cream hover:after:origin-left hover:after:scale-x-0"
            >
              <span>View details</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
          </div>

          {/* Right Column (List of Programs) */}
          <div className="flex flex-col space-y-10 md:w-1/2 md:space-y-12">
            {programs.slice(0, 3).map((program, i) => (
              <Reveal key={program.id} delay={320 + i * 80}>
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <ImageReveal
                    src={program.image}
                    alt={program.imageAlt}
                    className="h-40 w-40 shrink-0 rounded-2xl sm:h-48 sm:w-48"
                  />
                  <div className="flex h-full flex-col justify-center py-2">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wide text-cream sm:text-xs">
                        {program.tag}
                      </span>
                      <span className="text-[10px] font-bold text-cream sm:text-xs">
                        {program.duration}
                      </span>
                    </div>
                    <h4 className="mb-4 font-display text-2xl font-light leading-tight text-cream sm:text-3xl">
                      {program.title}
                    </h4>
                    <Link
                      to="/programs"
                      className="group relative inline-flex w-fit items-center gap-3 text-sm font-semibold text-champagne-light after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne-light after:transition-transform after:duration-300 hover:text-cream hover:after:origin-left hover:after:scale-x-0"
                    >
                      <span>View details</span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathSection;