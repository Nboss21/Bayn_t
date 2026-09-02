import React from 'react';
import Hero from '../components/Hero';
import PassionSection from '../components/PassionSection';
import TeachersSection from '../components/TeachersSection';
import PathSection from '../components/PathSection';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import TestimonialSection from '../components/TestimonialSection';
import Events from '../components/Events';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div>
      <Hero />
      <PassionSection />
      <PathSection />
      <Courses />
      <TeachersSection />
      <Gallery />
      <TestimonialSection />
      <Events />
      <CTASection />
    </div>
  );
};


export default Home;
