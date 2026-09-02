import React from 'react';

const ProgramCard = ({ title, description, duration, level, image, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col sm:flex-row p-4 border cursor-pointer transition-colors duration-200 relative ${
        isSelected 
          ? 'bg-[#f6f9f6] border-[#a0b2a1]' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Checkbox icon top right */}
      <div className="absolute top-6 right-6">
        {isSelected ? (
          <div className="w-[22px] h-[22px] rounded-full border-[1.5px] border-[#6b826d] bg-transparent flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#6b826d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-[22px] h-[22px] rounded-full border-[1.5px] border-gray-300"></div>
        )}
      </div>

      <div className="w-full sm:w-[180px] h-[180px] flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-8 flex flex-col justify-center pr-12">
        <h3 className="text-[22px] font-serif text-[#111111] mb-2 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 mb-5 leading-relaxed font-light">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-500 border border-gray-300 bg-white">
            {duration}
          </span>
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-500 border border-gray-300 bg-white">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
