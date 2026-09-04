import React from 'react';
import image1 from '../../assets/image/image 1.jpg';

const EventsHero = () => {
  return (
    <div className="mb-20">
      {/* Top Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-[#1a1a1a]"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#1a1a1a]">UPCOMING</span>
        </div>
        <h1 className="text-5xl md:text-[56px] font-serif text-[#1a1a1a] tracking-tight">
          Academy Calendar
        </h1>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
        {/* Text Side */}
        <div className="md:w-[45%]">
          <h2 className="text-4xl md:text-[46px] font-serif text-[#1a1a1a] leading-[1.1] mb-6">
            Events at Our<br />Academy
          </h2>
          <p className="text-[13px] text-[#4a4a4a] leading-[1.8] max-w-[380px]">
            Join us for exclusive masterclasses, industry networking events, and practical workshops designed to elevate your professional makeup artistry career.
          </p>
        </div>

        {/* Image Side */}
        <div className="md:w-[55%] relative">
          <div className="rounded-[24px] overflow-hidden aspect-[4/3] w-full shadow-sm">
            <img 
              src={image1} 
              alt="Makeup Event" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white hover:bg-white/60 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white hover:bg-white/60 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHero;
