import React, { useState } from 'react';

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-4 h-4 shrink-0 text-[#1c1c1c]/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const FAQAccordionItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#d4a843] rounded-[4px] overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start gap-4 px-5 py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-serif italic text-[#1c1c1c] text-[14px] leading-snug">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 pb-5 text-[13px] text-[#1c1c1c]/80 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQAccordionItem;
