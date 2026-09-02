import React, { useState } from 'react';

const GalleryHero = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const filters = ['ALL', 'STUDENT WORK', 'BRIDAL', 'TRAINING', 'EVENTS'];

  return (
    <div className="w-full flex flex-col items-center py-12 px-4 bg-[#fdfbf8]">
      <div className="bg-[#7d5635] rounded-[100px] w-full max-w-[800px] py-16 px-6 text-center flex flex-col items-center shadow-sm">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Beauty in practice
        </h1>
        <p className="text-white/90 text-[11px] md:text-xs max-w-lg leading-relaxed">
          A curated exhibition of technique, culture, and transformation from the studios of<br className="hidden md:block" /> Ethio Beauty Academy.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mt-8 w-full max-w-[800px]">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition border ${
              activeFilter === filter 
                ? 'bg-[#d9ecd3] text-[#2c3f25] border-[#d9ecd3]' 
                : 'bg-transparent text-gray-500 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryHero;
