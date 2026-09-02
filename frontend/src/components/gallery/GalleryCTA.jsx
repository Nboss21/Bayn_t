import React from 'react';

const GalleryCTA = () => {
  return (
    <div className="w-full flex justify-center py-20 px-4 bg-white pb-32">
      <div className="bg-[#f2f1ec] w-full max-w-[1000px] py-24 px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
          Ready to Create?
        </h2>
        <p className="text-[#4a4a4a] text-[13px] md:text-sm mb-10 leading-relaxed">
          Transform your passion for beauty into a professional career.<br className="hidden md:block" /> Applications for the next intake are now open.
        </p>
        <button className="bg-[#eec15b] text-[#1c1c1c] px-8 py-3 rounded-sm text-[11px] font-bold uppercase tracking-wider hover:bg-[#d5ad52] transition">
          Join Our Community
        </button>
      </div>
    </div>
  );
};

export default GalleryCTA;
