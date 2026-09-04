import React from 'react';

const FAQContactCTA = () => {
  return (
    <div className="bg-[#dfc06a] rounded-[6px] px-8 py-12 text-center mt-4">
      <h3 className="font-serif text-[22px] text-[#1c1c1c] mb-3">
        Still have questions?
      </h3>
      <p className="text-[13px] text-[#1c1c1c]/70 leading-relaxed mb-7 max-w-xs mx-auto">
        Our admissions team is here to help you navigate your journey into professional makeup artistry.
      </p>
      <a
        href="#"
        className="inline-block border border-[#8b5e3c] text-[#8b5e3c] text-[11px] font-bold uppercase tracking-[0.18em] px-7 py-2.5 rounded-[3px] hover:bg-[#8b5e3c] hover:text-white transition-colors duration-200"
      >
        Contact Us
      </a>
    </div>
  );
};

export default FAQContactCTA;
