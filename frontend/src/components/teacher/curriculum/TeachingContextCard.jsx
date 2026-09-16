import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const TeachingContextCard = ({ teachingContext, onViewModule }) => {
  return (
    <div className="bg-[#F0F4EC] rounded-2xl p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Current Teaching Context</span>
          <span className="bg-[#CFDEC0] text-[#4A5D37] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">{teachingContext.statusText}</span>
        </div>
        
        <div className="mb-2">
          <span className="text-[15px] font-bold text-[#1A1A1A] mr-3">Module {teachingContext.moduleNumber}</span>
          <span className="text-[22px] font-semibold text-[#1A1A1A]">{teachingContext.moduleTitle}</span>
        </div>
        
        <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
          {teachingContext.description}
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-gray-700" />
            <span className="text-[14px] font-semibold text-[#1A1A1A]">
              Lesson {teachingContext.lessonCurrent} of {teachingContext.lessonTotal}{' '}
              <span className="font-normal text-gray-600">{teachingContext.lessonStatusText}</span>
            </span>
          </div>
          <div className="text-[13px] text-gray-500 mt-0.5">
            Up Next: <span className="text-gray-800">{teachingContext.upNext}</span>
          </div>
        </div>
        
        <button
          onClick={() => onViewModule(teachingContext.actionModuleNumber)}
          className="flex items-center gap-2 bg-[#CFDEC0] hover:bg-[#c2d3b2] text-[#2A381C] px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap"
        >
          {teachingContext.actionText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TeachingContextCard;