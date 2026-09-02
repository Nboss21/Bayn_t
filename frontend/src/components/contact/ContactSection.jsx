import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section className="bg-white pt-32 pb-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto bg-[#dae5d2] rounded-[50px] p-8 md:p-14 lg:p-20 flex flex-col md:flex-row gap-10 lg:gap-16">
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          <ContactInfo />
        </div>
        
        {/* Right Column */}
        <div className="flex-1 flex flex-col">
          <div className="bg-[#e5e5e5] w-full h-[220px] mb-8"></div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

