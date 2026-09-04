import React from 'react';
import EventColumn from './EventColumn';

const UPCOMING = [
  {
    id: 1,
    category: 'Workshop',
    day: '24',
    month: 'OCT',
    title: 'Editorial Eye Techniques',
    description:
      'A deep dive into high-fashion editorial eye looks: color theory, and blending techniques.',
    location: 'Main Campus',
  },
  {
    id: 2,
    category: 'Intake',
    day: '01',
    month: 'NOV',
    title: 'Winter 2024 Cohort Orientation',
    description:
      'Welcoming our new class of professional makeup artists to the academy.',
    location: 'Online & Campus',
  },
];

const AcademyCalendar = () => {
  return (
    <div className="bg-[#e8ede0] rounded-[22px] overflow-hidden">

      {/* Header */}
      <div className="px-10 pt-10 pb-2">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1c1c]/60 mb-3">
          <span className="inline-block w-4 h-px bg-[#1c1c1c]/50" />
          Upcoming
        </p>
        <h2 className="text-[34px] font-serif text-[#1c1c1c] leading-tight">
          Academy Calendar
        </h2>
      </div>

      {/* Events — tag + details together per column, no divider */}
      <div className="grid grid-cols-2 divide-x divide-[#c0c9b8] mt-4">
        {UPCOMING.map((event) => (
          <EventColumn key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
};

export default AcademyCalendar;
