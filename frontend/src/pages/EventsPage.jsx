import React from 'react';
import EventsHero from '../components/events/EventsHero';
import FeaturedEvent from '../components/events/FeaturedEvent';
import UpcomingSchedule from '../components/events/UpcomingSchedule';
import EventsArchive from '../components/events/EventsArchive';
import { events } from '../data/home/eventsData';

const EventsPage = () => {
  return (
    <div className="bg-[#f1f3ea] min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-[950px] mx-auto">
        <EventsHero />
        <FeaturedEvent event={events[0]} />
        <UpcomingSchedule events={events.slice(1)} />
        <EventsArchive />
      </div>
    </div>
  );
};

export default EventsPage;
