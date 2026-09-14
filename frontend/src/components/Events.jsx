import React from 'react';
import { Link } from 'react-router-dom';
import { events } from '../data/home/eventsData';
import Reveal from './Reveal';
import ImageReveal from './ImageReveal';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const CalendarIcon = () => (
  <svg className="h-4 w-4 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="h-4 w-4 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Events = () => {
  return (
    <section className="relative overflow-hidden bg-paper py-28 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-[95%] max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal delay={0}>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
              <span className="h-[1px] w-10 bg-champagne/80" />
              Academy Life
              <span className="h-[1px] w-10 bg-champagne/80" />
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-ink md:text-6xl">
              An <em className="text-champagne not-italic">Events</em> Calendar
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
              Intimate workshops, live sessions and open days crafted for the curious and the committed.
            </p>
          </Reveal>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={200 + i * 100} className="h-full">
              <article className="flex h-full flex-col">
                <ImageReveal
                  src={event.image}
                  alt={event.title}
                  rounded="rounded-2xl"
                  className="mb-5 aspect-[4/3] w-full"
                >
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm backdrop-blur-sm">
                    {event.category}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10"
                  />
                </ImageReveal>

                {/* Date & Location */}
                <div className="mb-3 flex items-center space-x-4 text-[13px] text-ink/60">
                  <span className="flex items-center space-x-1.5">
                    <CalendarIcon />
                    <span>{event.date}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <LocationIcon />
                    <span>{event.location}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 font-display text-2xl font-light leading-snug text-ink">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">
                  {event.description}
                </p>

                {/* Link */}
                <Link
                  to="/events"
                  className="group relative w-fit font-semibold text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-0"
                >
                  View event
                  <svg
                    className="ml-1.5 inline-block h-4 w-4 text-champagne transition-transform duration-300 group-hover:translate-x-1"
                    style={{ transitionTimingFunction: EASE }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        {/* View All Button */}
        <Reveal delay={400}>
          <div className="mt-20 flex justify-center">
            <Link
              to="/events"
              className="rounded-full border border-espresso/20 px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-espresso hover:text-cream"
            >
              View all
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Events;