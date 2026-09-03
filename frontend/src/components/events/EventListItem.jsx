import React from 'react';

const LocationIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EventListItem = ({ day, month, title, description, location }) => {
  return (
    <div className="flex items-start gap-8 py-10 border-b border-[#d5d9d0] last:border-b-0">
      {/* Date */}
      <div className="flex flex-col items-center min-w-[48px] text-center select-none">
        <span className="text-[36px] font-serif leading-none text-[#1c1c1c]">{day}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/60 mt-0.5">{month}</span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[22px] font-serif text-[#1c1c1c] leading-snug mb-2">{title}</h3>
        <p className="text-[13px] text-[#1c1c1c]/60 leading-relaxed mb-4 max-w-sm">{description}</p>
        <span className="flex items-center gap-1.5 text-[13px] text-[#1c1c1c]/60">
          <LocationIcon />
          {location}
        </span>
      </div>
    </div>
  );
};

export default EventListItem;
