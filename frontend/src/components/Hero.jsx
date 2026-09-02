import React from 'react';

const Hero = () => {
  return (
    <section className="bg-[#1f1d1b] text-white pt-40 pb-24 px-10 min-h-screen flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-[90%] pl-4 md:pl-10">
        <h1 className="text-6xl md:text-[80px] font-serif leading-[1.1] mb-8 tracking-tight text-[#f4f4f4]">
          MASTER YOUR<br />ARTISTRY
        </h1>
        <p className="text-[#d1d1d1] max-w-lg mb-10 text-base md:text-lg leading-relaxed font-sans">
          World-class training from industry expert artists. Your journey to becoming a professional makeup artist starts here.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <button className="bg-[#8f6340] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#a3724a] transition">
            Explore Courses
          </button>
          <button className="flex items-center space-x-3 group hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-white transition">
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[11px] uppercase tracking-[0.15em] font-medium text-gray-300 group-hover:text-white transition">
              Watch Academy Film
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

