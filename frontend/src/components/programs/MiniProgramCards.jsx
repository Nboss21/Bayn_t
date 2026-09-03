import React from 'react';
import { pathData } from '../../data/home/pathData';

const MiniProgramCard = ({ image, duration, label, courseName }) => {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="w-full aspect-[4/3] bg-[#f5f5f5] rounded-[2px] mb-4 relative overflow-hidden">
        {image ? (
          <img src={image} alt={courseName} className="w-full h-full object-cover" />
        ) : null}
         <div className="absolute top-2 left-2 flex gap-1">
             <span className="bg-[#f5eeb6] text-[9px] font-bold uppercase px-2 py-0.5 rounded-[2px]">{label}</span>
         </div>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-[#e9e6dc] text-[#333] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-[2px]">
          {duration}
        </span>
        <span className="bg-[#e9e6dc] text-[#333] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-[2px]">
          {label}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-serif text-[18px] text-[#1c1c1c] font-normal leading-snug mb-3 font-bold">
        {courseName}
      </h4>

      {/* Link */}
      <a href="#" className="text-[#a87b52] text-[11px] font-semibold tracking-wider flex items-center hover:text-[#8a5f3f] transition-colors">
        View Details <span className="ml-1">→</span>
      </a>
    </div>
  );
};

const MiniProgramCards = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 max-w-[1240px] mx-auto w-full border-t border-gray-100 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl mx-auto">
        {pathData.programs.slice(4).map((program) => (
          <MiniProgramCard
            key={program.id}
            image={program.image}
            duration={program.duration}
            label={program.level}
            courseName={program.title}
          />
        ))}
      </div>
    </section>
  );
};

export default MiniProgramCards;
