import React from 'react';
import AcademyCalendar from '../components/events/AcademyCalendar';
import EventArchive from '../components/events/EventArchive';

const EventsPage = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32 px-10">
      <div className="max-w-5xl mx-auto w-[90%]">
        <AcademyCalendar />
        <EventArchive />
      </div>
    </div>
  );
};

export default EventsPage;
