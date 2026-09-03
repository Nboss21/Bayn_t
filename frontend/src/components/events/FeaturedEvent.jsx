import React from 'react';

const FeaturedEvent = ({ event }) => {
  if (!event) return null;

  return (
    <div className="bg-[#d2dbc6] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-12 lg:gap-24 items-center mb-24">
      {/* Left Image */}
      <div className="w-full md:w-[45%]">
        <div className="aspect-square rounded-[24px] overflow-hidden shadow-sm">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-[55%]">
        <div className="flex flex-col gap-6 items-start">
          {/* Metadata */}
          <div className="flex items-center gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-3 pr-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#1a1a1a] shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#1a1a1a]">{event.date}</span>
              <span className="text-[11px] text-[#4a4a4a]">{event.location}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-[46px] font-serif text-[#1a1a1a] tracking-tight leading-tight mt-2">
            {event.title}
          </h2>

          {/* Details */}
          <div className="flex items-center gap-3 text-[12px] text-[#4a4a4a] mb-2 font-medium">
            <span>{event.category}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#1a1a1a]"></span>
            <span>{event.description.substring(0, 50)}...</span>
          </div>

          {/* Button */}
          <button className="bg-[#f2c94c] hover:bg-[#eab308] transition-colors text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3.5 rounded-full">
            RSVP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
