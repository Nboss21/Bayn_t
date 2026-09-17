import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses as allCourses } from '../data/home/coursesData';
import Reveal from './Reveal';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = allCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="bg-paper py-28 md:py-32">
      <div className="mx-auto w-[95%] max-w-6xl">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal delay={0}>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
                <span className="h-[1px] w-10 bg-champagne/80" />
                Our Programs
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-ink md:text-6xl">
                Explore Our <em className="text-champagne not-italic">Courses</em>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 max-w-md text-ink/60">
                Find the perfect program for your goals.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <Link
              to="/programs"
              className="inline-flex items-center gap-3 border border-espresso/20 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-espresso hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              See All
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {currentCourses.map((course, i) => (
            <Reveal key={course.id} delay={200 + i * 80}>
              <Link
                to="/programs"
                className="group block transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative mb-6 h-72 overflow-hidden rounded-2xl bg-blush/50 md:h-80">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transitionTimingFunction: EASE }}
                  />
                  <div className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm backdrop-blur-sm">
                    {course.tag}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl text-ink transition-colors duration-300 group-hover:text-champagne">
                  {course.title}
                </h3>
                <p className="text-sm font-medium text-bronze">{course.price}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-ink/60 transition hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="mx-4 flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                    currentPage === i + 1
                      ? 'bg-espresso text-cream'
                      : 'text-ink/60 hover:bg-cream'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-ink/60 transition hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Courses;
