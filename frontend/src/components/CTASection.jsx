import React from 'react';
import { ctaData } from '../data/home/ctaData';

const CTASection = () => {
  const { heading, description, cta } = ctaData;

  return (
    <section className="bg-[#d4bc45] py-20 px-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-[#1c1c1c] uppercase tracking-wide mb-6 leading-tight">
          {heading}
        </h2>
        <p className="text-[#1c1c1c]/75 text-[15px] max-w-md leading-relaxed mb-10">
          {description}
        </p>
        <a
          href={cta.href}
          className="border-2 border-[#1c1c1c] px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-widest text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#d4bc45] transition"
        >
          {cta.label}
        </a>
      </div>
    </section>
  );
};

export default CTASection;
