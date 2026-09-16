import React from 'react';

const StatCard = ({ title, dotColor, number, suffixText, pillStyle, isHighlighted, highlightColors }) => {
  if (isHighlighted) {
    return (
      <div className={`border rounded-xl p-4 flex flex-col justify-between ${highlightColors.card}`}>
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${highlightColors.title}`}>{title}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
        </div>
        <div className="flex justify-between items-end">
          <span className={`text-[28px] font-semibold leading-none ${highlightColors.number}`}>{number}</span>
          <span className={`text-[12px] font-medium mb-1 ${highlightColors.subtitle}`}>{suffixText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{title}</span>
        {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>}
      </div>
      <div className="flex justify-between items-end">
        <span className="text-[28px] font-semibold leading-none text-[#1A1A1A]">{number}</span>
        {pillStyle ? (
          <div className={`px-2 py-0.5 rounded text-[11px] font-semibold mb-1 ${pillStyle}`}>
            {suffixText}
          </div>
        ) : (
          <span className="text-[12px] text-gray-400 font-medium mb-1">{suffixText}</span>
        )}
      </div>
    </div>
  );
};

const TeacherAttendanceStats = () => {
  return (
    <div className="grid grid-cols-6 gap-4 mb-8">
      <StatCard 
        title="Total" 
        number="18" 
        suffixText="Students" 
      />
      <StatCard 
        title="Present" 
        dotColor="bg-[#12B76A]" 
        number="12" 
        suffixText="66.7%" 
        pillStyle="bg-[#ECFDF3] text-[#027A48]"
      />
      <StatCard 
        title="Absent" 
        dotColor="bg-[#F04438]" 
        number="2" 
        suffixText="11.1%" 
        pillStyle="bg-[#FEF3F2] text-[#B42318]"
      />
      <StatCard 
        title="Late" 
        dotColor="bg-[#F79009]" 
        number="1" 
        suffixText="5.5%" 
        pillStyle="bg-[#FFFAEB] text-[#B54708]"
      />
      <StatCard 
        title="Excused" 
        dotColor="bg-[#2E90FA]" 
        number="0" 
        suffixText="0.0%" 
        pillStyle="bg-[#EFF8FF] text-[#175CD3]"
      />
      <StatCard 
        title="Unmarked" 
        dotColor="bg-[#F79009]" 
        number="3" 
        suffixText="Pending"
        isHighlighted={true}
        highlightColors={{
          card: 'bg-[#FFFAEB] border-[#FEDF89]',
          title: 'text-[#B54708]',
          number: 'text-[#B54708]',
          subtitle: 'text-[#B54708]'
        }}
      />
    </div>
  );
};

export default TeacherAttendanceStats;

