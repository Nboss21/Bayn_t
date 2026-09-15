import React from 'react';

const ClassesHeader = () => {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-2">
        <span className="text-[#6b7280]">Registrar</span>
        <span className="text-[#6b7280]">/</span>
        <span className="font-medium text-[#111827]">Classes</span>
      </div>

      {/* Title */}
      <h1 className="text-[28px] font-semibold text-[#111827] tracking-tight mb-1">
        Classes
      </h1>

      {/* Subtitle */}
      <p className="text-[15px] text-[#6b7280]">
        View classes, schedules, instructors, and enrollment capacity.
      </p>
    </div>
  );
};

export default ClassesHeader;
