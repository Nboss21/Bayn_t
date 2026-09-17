import React from 'react';

function statusDotClass(status) {
  if (status === 'Open') return 'bg-[#65a30d]';
  if (status === 'Upcoming') return 'bg-[#f59e0b]';
  if (status === 'Closed') return 'bg-[#9ca3af]';
  return 'bg-[#d1d5db]';
}

export default function ProgramOverviewCard({ program = null }) {
  const durationLabel = program ? `${program.duration} ${program.durationUnit.toLowerCase()}` : '—';
  const currentIntake = program?.currentIntake || '—';
  const level = program?.level || '—';
  const status = program?.status || null;

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Program overview</h2>
            <p className="text-sm text-[#6b7280] mt-1">Confirmation context and operational summary for this curriculum record.</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#f0f5ed] text-[#4d7c2a]">
            <span className={`w-1.5 h-1.5 ${statusDotClass(status)} rounded-full mr-1.5`}></span>
            Operational Context
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-5">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">LEVEL</p>
            <p className="text-[15px] font-semibold text-[#111827]">{level}</p>
            <p className="text-xs text-[#6b7280] mt-1.5">Standard certification</p>
          </div>

          <div className="bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-5">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">DURATION</p>
            <p className="text-[15px] font-semibold text-[#111827]">{durationLabel}</p>
            <p className="text-xs text-[#6b7280] mt-1.5">Full-time cohort pace</p>
          </div>

          <div className="bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-5">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">CURRENT INTAKE</p>
            <p className="text-[15px] font-semibold text-[#111827]">{currentIntake}</p>
            <p className="text-xs text-[#6b7280] mt-1.5">Cohort admissions active</p>
          </div>

          <div className="bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-5">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">STATUS</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 ${statusDotClass(status)} rounded-full`}></span>
              <p className="text-[15px] font-semibold text-[#111827]">{status || '—'}</p>
            </div>
            <p className="text-xs text-[#6b7280] mt-1.5">Visible to admissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}