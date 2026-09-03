import React from 'react';

const EventsArchive = () => {
  return (
    <div className="mb-24 pt-8 border-t border-[#1a1a1a]/10">
      <div className="mb-14 mt-4">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#1a1a1a] uppercase">Archive</span>
      </div>
      
      {/* Archive Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-28">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="group cursor-pointer">
            <div className="flex justify-between items-center border-b border-[#1a1a1a]/20 pb-3 mb-5 group-hover:border-[#1a1a1a] transition-colors">
              <span className="text-[10px] font-bold text-[#1a1a1a] tracking-[0.1em] uppercase">Oct 2024</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a] transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <h5 className="text-[22px] font-serif text-[#1a1a1a] leading-[1.2] pr-4">
              [Insert Past Events Archive Title]
            </h5>
          </div>
        ))}
      </div>

      {/* Newsletter Box */}
      <div className="bg-[#f4efe5] rounded-[32px] p-12 md:p-20 text-center flex flex-col items-center justify-center max-w-[850px] mx-auto shadow-sm">
        <div className="mb-5 text-[#1a1a1a]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </div>
        <h2 className="text-[40px] md:text-[46px] font-serif text-[#1a1a1a] mb-5 tracking-tight leading-[1.1]">
          Never Miss an Event
        </h2>
        <p className="text-[13px] text-[#4a4a4a] mb-10 max-w-[420px] leading-[1.7]">
          Sign up to our newsletter for exclusive updates on new masterclasses, workshops, and academy news.
        </p>
        <button className="bg-[#f2c94c] hover:bg-[#eab308] transition-colors text-[#1a1a1a] text-[10px] font-bold tracking-[0.15em] uppercase px-9 py-4 rounded-full">
          STAY IN THE LOOP
        </button>
      </div>
    </div>
  );
};

export default EventsArchive;
