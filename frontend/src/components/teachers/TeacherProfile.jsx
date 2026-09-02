import React from 'react';

const TeacherProfile = ({ name, role, description, quote, experience, icon, imageLeft, placeholderColor }) => {
  return (
    <div className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 w-full`}>
      {/* Image Placeholder */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className={`w-full max-w-[420px] aspect-[4/5] ${placeholderColor || 'bg-white'} shadow-sm border border-gray-100/50`}></div>
      </div>
      
      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        {/* Accent Line */}
        <div className="w-8 h-[1px] bg-[#b48a66] mb-6"></div>
        
        {/* Name */}
        <h2 className="font-serif text-[42px] text-[#1c1c1c] mb-2">{name}</h2>
        
        {/* Role */}
        <h3 className="font-sans text-[11px] tracking-[0.15em] text-[#b48a66] uppercase font-medium mb-6">
          {role}
        </h3>
        
        {/* Description */}
        <p className="font-sans text-[14px] leading-[1.8] text-[#4a4a4a] mb-8 max-w-[400px]">
          {description}
        </p>
        
        {/* Quote */}
        <div className="border-l-[3px] border-[#d4e4d6] pl-5 mb-8 max-w-[400px]">
          <p className="font-sans text-[13px] italic leading-[1.7] text-[#1c1c1c]">
            {quote}
          </p>
        </div>
        
        {/* Experience */}
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-sans text-[12px] text-[#1c1c1c]">{experience}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
