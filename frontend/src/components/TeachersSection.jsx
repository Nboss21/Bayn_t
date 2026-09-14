import React from 'react';
import { Link } from 'react-router-dom';
import { teachers } from '../data/home/teachersData';
import Reveal from './Reveal';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const TeachersSection = () => {
  return (
    <div className="w-full">
      {/* Top Header Area */}
      <div className="bg-paper px-10 py-20">
        <div className="mx-auto flex w-[95%] max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal delay={0}>
            <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-ink md:text-[62px]">
              Learn from the <em className="text-champagne not-italic">Best</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/teachers"
              className="group inline-flex w-full items-center gap-3 border-b border-bronze/30 pb-3 font-semibold text-bronze transition hover:text-ink md:w-auto md:justify-end"
            >
              <span>Meet All Teachers</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Teachers Grid Area */}
      <div className="bg-cream px-10 py-24">
        <div className="mx-auto w-[95%] max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher, i) => (
              <Reveal key={teacher.id} delay={240 + i * 120}>
                <div className="group">
                  <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-2xl bg-blush transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ transitionTimingFunction: EASE }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="mb-1 font-display text-lg font-medium text-ink">{teacher.name}</h3>
                    <p className="mb-4 text-sm text-ink/60">{teacher.role}</p>
                    <Link
                      to="/teachers"
                      className="relative inline-block text-[13px] font-semibold text-bronze after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-bronze after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-0"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersSection;
