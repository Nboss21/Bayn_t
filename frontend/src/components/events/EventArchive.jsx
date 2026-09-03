import React from 'react';
import EventArchiveItem from './EventArchiveItem';

const ARCHIVE = [
  { id: 1, date: 'Sept 2024', title: 'Skincare Foundations Workshop' },
  { id: 2, date: 'Aug 2024',  title: 'Summer Bridal Showcase' },
  { id: 3, date: 'Jul 2024',  title: 'Industry Networking Night' },
  { id: 4, date: 'Jun 2024',  title: 'Graduation Ceremony Class of 2026' },
];

const EventArchive = () => {
  return (
    <div className="mt-10 pb-20">
      {/* — ARCHIVE label */}
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1c1c]/60 mb-8">
        <span className="inline-block w-4 h-px bg-[#1c1c1c]/50" />
        Archive
      </p>

      {/* 4-column grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ARCHIVE.map((item) => (
          <EventArchiveItem key={item.id} date={item.date} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default EventArchive;
