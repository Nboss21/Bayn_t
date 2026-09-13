import React from 'react';
import ProgramCardButton from './ProgramCardButton';

const HorizontalProgramCard = ({
  duration = '12 WEEKS',
  level = 'BEGINNER',
  title = 'Professional\nMakeup\nArtistry',
  description = 'Our foundational course designed to take you from a passion for beauty to a confident, working professional. Master color theory, facial',
  link = '#',
  image,
  className = '',
}) => {
  return (
    <div className={`bg-[#f5f4ef] overflow-hidden rounded-[2px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-6 sm:p-8 lg:p-12 lg:pr-16 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex flex-row items-center justify-end relative ${className}`}>
      {/* Background Image on left */}
      {image && (
        <div className="absolute left-0 top-0 bottom-0 w-[45%] h-full hidden sm:block">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      {/* Content aligned to right side with ample left empty space */}
      <div className="w-full sm:w-[280px] md:w-[42%] lg:w-[300px] flex flex-col relative z-10">
        {/* Metadata */}
        <div className="text-[#a67c4e] text-[10.5px] sm:text-[11px] font-medium tracking-[0.18em] uppercase mb-3">
          {duration} <span className="mx-1">•</span> {level}
        </div>

        {/* Heading */}
        <h3 className="font-serif text-[26px] sm:text-[30px] lg:text-[32px] text-[#1c1c1c] font-normal leading-[1.12] mb-4 whitespace-pre-line">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#666666] text-[11.5px] sm:text-[12px] leading-[1.6] mb-6">
          {description}
        </p>

        {/* Action Button */}
        <div>
          <ProgramCardButton to={link} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HorizontalProgramCard;
