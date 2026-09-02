import React from 'react';

const LocationIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5l7 7-7 7" />
  </svg>
);

const EventColumn = ({ event }) => {
  return (
    <a
      href="#"
      className="group block px-10 pt-8 pb-10 transition-colors duration-200 hover:bg-[#dde5d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d5c45]/40 cursor-pointer"
    >
      {/* Category tag */}
      <span className="border border-[#aab2a4] text-[9px] font-bold tracking-[0.18em] uppercase text-[#3d3d3d] px-3.5 py-1.5 rounded-[3px] inline-block mb-8 transition-colors duration-200 group-hover:border-[#7d5c45]/50 group-hover:text-[#7d5c45]">
        {event.category}
      </span>

      {/* Date + details */}
      <div className="flex items-start gap-5">
        {/* Date */}
        <div className="flex flex-col items-center min-w-[34px] select-none pt-0.5">
          <span className="text-[28px] font-serif leading-none text-[#7d5c45]">{event.day}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7d5c45] mt-0.5">{event.month}</span>
        </div>

        {/* Text details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-serif text-[#1c1c1c] leading-snug mb-2 group-hover:text-[#7d5c45] transition-colors duration-200">
            {event.title}
          </h3>
          <p className="text-[12px] text-[#1c1c1c]/55 leading-relaxed mb-4">{event.description}</p>
          <span className="flex items-center gap-1.5 text-[12px] text-[#1c1c1c]/55">
            <LocationIcon />
            {event.location}
          </span>
        </div>
      </div>

      {/* View event link */}
      <div className="flex items-center gap-1 mt-6 text-[11px] font-semibold uppercase tracking-widest text-[#7d5c45] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View event
        <ArrowIcon />
      </div>
    </a>
  );
};

export default EventColumn;
