import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-[#d4bc45] py-20 px-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-[#1c1c1c] uppercase tracking-wide mb-6 leading-tight">
          Begin Your Journey With Luxe
        </h2>
        <p className="text-[#1c1c1c]/75 text-[15px] max-w-md leading-relaxed mb-10">
          Limited enrollments strictly reserved for Fall 2026. Submit your design portfolio and portfolio interview application today.
        </p>
        <a
          href="#"
          className="border-2 border-[#1c1c1c] px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-widest text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#d4bc45] transition"
        >
          Apply Now — Fall 2026
        </a>
      </div>
    </section>
  );
};

export default CTASection;
