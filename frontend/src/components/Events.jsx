import React from 'react';
import { Link } from 'react-router-dom';
import { events } from '../data/home/eventsData';

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Events = () => {
  return (
    <section className="bg-[#f0f4ea] py-24 px-10">
      <div className="max-w-6xl mx-auto w-[90%]">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1c1c1c] mb-4">Tagline</p>
          <h2 className="text-6xl md:text-7xl font-serif text-[#1c1c1c] mb-5">Events</h2>
          <p className="text-[#1c1c1c]/60 text-[15px] max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="flex flex-col">
              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-xl mb-5 relative overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-white/80 text-[#1c1c1c] text-[11px] font-bold px-3 py-1.5 rounded-md border border-[#d8d8d8]">
                  {event.category}
                </span>
              </div>

              {/* Date & Location */}
              <div className="flex items-center space-x-4 text-[#1c1c1c]/70 text-[13px] mb-3">
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
              <h3 className="text-[26px] font-serif text-[#1c1c1c] mb-3 leading-snug">{event.title}</h3>

              {/* Description */}
              <p className="text-[#1c1c1c]/60 text-[14px] leading-relaxed mb-6 flex-1">{event.description}</p>

              {/* Link */}
              <Link to="/events" className="text-[#1c1c1c] text-[14px] font-medium flex items-center group">
                View event
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-20">
          <Link to="/events" className="bg-white border border-gray-200 px-10 py-3 rounded-xl text-[14px] font-medium text-[#1c1c1c] hover:shadow-md transition">
            View all
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Events;
