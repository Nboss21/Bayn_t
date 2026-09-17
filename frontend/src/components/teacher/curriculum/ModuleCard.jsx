import React from 'react';
import { Check, ChevronDown, Circle } from 'lucide-react';

const ModuleCard = ({ module, expanded, onToggle }) => {
  const { number, title, status, description, lessonsCount, completedLessonsCount, lessons } = module;
  
  const isInProgress = status === 'in_progress';
  const isCompleted = status === 'completed';
  const isUpcoming = status === 'upcoming';
  
  return (
    <div className={`border rounded-xl transition-colors ${
      isInProgress ? 'bg-[#F2F6ED] border-[#CFDEC0]' : 'bg-white border-gray-200'
    }`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[13px] font-semibold flex-shrink-0 ${
            isInProgress ? 'bg-[#CFDEC0] text-[#4A5D37]' : 'bg-[#F5F5F5] text-gray-600'
          }`}>
            {number}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-[15px] font-semibold text-[#1A1A1A]">{title}</h4>
              
              {isCompleted && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-[#F5F5F5] text-gray-700 text-[11px] font-medium rounded-full">
                  <Check className="w-3 h-3" /> Completed
                </span>
              )}
              {isInProgress && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium">
                  <span className="px-2 py-0.5 bg-[#CFDEC0] text-[#4A5D37] rounded-full">In progress</span>
                  <span className="text-gray-500">&middot; Currently Teaching</span>
                </span>
              )}
              {isUpcoming && (
                <span className="px-2 py-0.5 bg-[#F5F5F5] text-gray-500 text-[11px] font-medium rounded-full">
                  Upcoming
                </span>
              )}
            </div>
            
            <p className="text-[13px] text-gray-500">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 ml-4">
          <div className="text-right">
            <div className="text-[13px] font-medium text-[#1A1A1A]">{lessonsCount} lessons</div>
            {isInProgress && completedLessonsCount != null && (
              <div className="text-[11px] text-gray-500">{completedLessonsCount} completed</div>
            )}
          </div>
          
          <button
            onClick={onToggle}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              isInProgress 
                ? 'bg-[#CFDEC0] hover:bg-[#c2d3b2] text-[#2A381C]' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {isCompleted ? 'Review Module' : isInProgress ? 'View Lessons' : 'Preview Module'}
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50 rounded-b-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Lessons</span>
            <span className="text-[11px] text-gray-400">({lessonsCount} total)</span>
          </div>
          <div className="space-y-1">
            {lessons.map((lesson, i) => (
              <div key={lesson.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors">
                <span className="text-[11px] font-bold text-gray-400 w-5">{String(i + 1).padStart(2, '0')}</span>
                {lesson.completed ? (
                  <Check className="w-4 h-4 text-[#4A5D37]" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
                <span className={`text-[13px] ${lesson.completed ? 'text-[#1A1A1A] font-medium' : 'text-gray-600'}`}>
                  {lesson.title}
                </span>
                {lesson.completed && (
                  <span className="ml-auto text-[11px] text-[#4A5D37] font-medium">Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;