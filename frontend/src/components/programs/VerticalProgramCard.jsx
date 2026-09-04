import React from 'react';
import ProgramCardButton from './ProgramCardButton';

const VerticalProgramCard = ({
  duration = '8 WEEKS',
  level = 'INTERMEDIATE',
  title = 'Bridal Mastery',
  description = 'Specialize in the lucrative bridal industry. Learn to create long-lasting, timeless looks that honor Ethiopian traditions while incorporating modern global trends.',
  link = '#',
  image,
  className = '',
  maxDescWidth = 'max-w-none',
}) => {
  return (
    <div
      className={`bg-[#f5f4ef] overflow-hidden rounded-[2px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col justify-end transition-all ${className}`}
    >
      {/* Image at the top */}
      {image && (
        <div className="w-full flex-grow relative min-h-[160px] sm:min-h-[200px]">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}

      {/* Content Block at bottom */}
      <div className="flex flex-col p-6 sm:p-8 lg:p-10 z-10 bg-[#f5f4ef]">
        {/* Metadata */}
        <div className="text-[#a67c4e] text-[10.5px] sm:text-[11px] font-medium tracking-[0.18em] uppercase mb-3">
          {duration} <span className="mx-1">•</span> {level}
        </div>

        {/* Heading */}
        <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] text-[#1c1c1c] font-normal leading-snug mb-3">
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-[#666666] text-[11.5px] sm:text-[12px] leading-[1.6] mb-6 ${maxDescWidth}`}
        >
          {description}
        </p>

        {/* Action button */}
        <div className="w-full">
          <ProgramCardButton to={link} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default VerticalProgramCard;
