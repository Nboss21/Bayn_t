import React from 'react';

const UpcomingSchedule = ({ events = [] }) => {
  return (
    <div className="mb-32">
      <h3 className="text-[26px] font-serif text-[#1a1a1a] mb-14 tracking-tight">
        Upcoming Schedule
      </h3>

      <div className="flex flex-col gap-20">
        {events.map((event, index) => (
          <div key={event.id} className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Image */}
            <div className="w-full md:w-[45%]">
              <div className="rounded-[20px] overflow-hidden aspect-[1.4] w-full shadow-sm">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-[55%] flex flex-col items-start md:px-8">
              {/* Meta Top */}
              <div className="flex items-center gap-3 text-[12px] font-bold text-[#1a1a1a] mb-5">
                <span className="uppercase tracking-wide">{event.date}</span>
                <span className="w-4 h-[1px] bg-[#1a1a1a]"></span>
                <span className="uppercase tracking-wide">{event.category}</span>
              </div>
              
              <h4 className="text-[34px] md:text-[40px] font-serif text-[#1a1a1a] mb-4 leading-[1.1] tracking-tight">
                {event.title}
              </h4>
              
              <p className="text-[12px] font-medium text-[#4a4a4a] mb-8">
                {event.description}
              </p>
              
              <a href="#" className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a] pb-1.5 hover:text-[#4a4a4a] hover:border-[#4a4a4a] transition-colors">
                VIEW EVENT
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedule;
