import React from 'react';

const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5l7 7-7 7" />
  </svg>
);

const EventArchiveItem = ({ date, title }) => {
  return (
    <a
      href="#"
      className="group block pt-4 border-t border-[#d4d4cc] hover:border-[#7d5c45]/40 transition-colors duration-200 focus-visible:outline-none"
    >
      <p className="flex items-center gap-1.5 text-[12px] text-[#1c1c1c]/50 mb-3 group-hover:text-[#7d5c45]/70 transition-colors duration-200">
        {date}
        <ArrowIcon />
      </p>
      <h4 className="text-[17px] font-serif text-[#1c1c1c] leading-snug group-hover:text-[#7d5c45] transition-colors duration-200">
        {title}
      </h4>
    </a>
  );
};

export default EventArchiveItem;
