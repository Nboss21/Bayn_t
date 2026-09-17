import React from 'react';

export default function AddClassPreviewSidebar({ preview = {} }) {
  const {
    title = '',
    subtitle = '',
    educator = '',
    schedule = '',
    weeklyHours = '',
    studio = '',
    cohortDuration = '',
    capacityLabel = 'Studio Capacity Limit',
    capacityEnrolled = 0,
    capacityLimit = 20,
    capacityNote = '',
  } = preview;

  const pct = capacityLimit > 0 ? Math.min(100, Math.round((capacityEnrolled / capacityLimit) * 100)) : 0;
  const capacityLabelValue = capacityLimit > 0 ? `${capacityEnrolled} / ${capacityLimit} Enrolled` : 'Not configured yet';

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#6b7280] font-semibold text-[12px] uppercase tracking-wider">
          LIVE TIMETABLE PREVIEW
        </h2>
        <span className="bg-[#f0f9f4] text-[#168a4a] border border-[#a2deb7] text-[11px] font-medium px-2 py-0.5 rounded-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#168a4a]"></span>
          Validated
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-[#1a1a1a] text-[17px] font-semibold mb-1">
          {title}
        </h3>
        <p className="text-[#6b7280] text-[13px]">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Assigned Educator</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium">{educator}</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Schedule</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right">{schedule}</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Weekly Commitment</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium">{weeklyHours}</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Assigned Studio</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right">{studio}</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Cohort Duration</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right leading-tight">
            {cohortDuration}
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#1a1a1a] text-[14px] font-semibold">{capacityLabel}</span>
          <span className="text-[#1a1a1a] text-[13px] font-semibold">{capacityLabelValue}</span>
        </div>
        <div className="w-full bg-[#e5e7eb] h-[5px] rounded-full mb-3">
          <div className="bg-[#aab89b] h-[5px] rounded-full" style={{ width: `${pct}%` }}></div>
        </div>
        {capacityNote && (
          <p className="text-[12px] text-[#6b7280] leading-relaxed">
            {capacityNote}
          </p>
        )}
      </div>
    </div>
  );
}