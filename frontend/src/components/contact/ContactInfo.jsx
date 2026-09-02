import React from 'react';

const ContactInfo = () => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="font-serif text-[42px] leading-tight text-[#1a1a1a] mb-6">
        Get in Touch.
      </h1>
      <p className="text-[#333333] text-[14px] leading-[1.6] mb-10 max-w-[280px]">
        Whether you have questions about our programs, admissions, or just want to say hello, we're here to help you start your journey in professional makeup artistry.
      </p>

      <div className="mb-6 flex items-start gap-3">
        <div className="pt-1 text-[#333333]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-[20px] text-[#1a1a1a] mb-1">Academy Location</h3>
          <p className="text-[#4d4d4d] text-[13px] leading-[1.4]">
            Bole Road, Next to XYZ Building<br/>
            Addis Ababa, Ethiopia
          </p>
        </div>
      </div>

      <div className="mb-10 flex items-start gap-3">
        <div className="pt-1 text-[#333333]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-[20px] text-[#1a1a1a] mb-1">Contact</h3>
          <p className="text-[#4d4d4d] text-[13px] leading-[1.4]">
            +251 911 234 567<br/>
            hello@ethiobeautyacademy.com
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-[#e5e5e5] w-full h-[250px]"></div>
      </div>
    </div>
  );
};

export default ContactInfo;
