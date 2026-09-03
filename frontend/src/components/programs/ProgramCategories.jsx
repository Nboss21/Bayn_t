import React from 'react';

const categories = [
  'All Programs',
  'Makeup Artistry',
  'Skincare',
  'Business of Beauty',
];

const ProgramCategories = ({ activeCategory = 'All Programs', onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-7 sm:my-8">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory && onSelectCategory(category)}
            className={`bg-[#deb841] hover:bg-[#d4ad36] text-[#1a1a1a] font-bold text-[12px] sm:text-[13px] px-3.5 py-1.5 transition-all shadow-xs cursor-pointer ${
              isActive ? 'ring-1 ring-[#1a1a1a]/20 opacity-100' : 'opacity-95 hover:opacity-100'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default ProgramCategories;
