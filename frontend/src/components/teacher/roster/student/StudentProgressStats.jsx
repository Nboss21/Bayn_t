import React from 'react';

const NeedsAttentionDot = () => (
  <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#B45309]">
    <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block" />
    Needs attention
  </span>
);

const StatCard = ({ label, value, suffix, note, needsAttention, barColor }) => (
  <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex-1">
    <div className="flex items-center justify-between mb-3">
      <p className="text-[13px] text-gray-400 font-medium">{label}</p>
      {needsAttention && <NeedsAttentionDot />}
    </div>
    <div className="flex items-baseline gap-3 mb-3">
      <span className="text-[40px] font-bold text-[#2F4F3A] leading-none">{value}%</span>
      {note && <span className="text-[13px] text-gray-400">{note}</span>}
    </div>
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${barColor}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const StudentProgressStats = ({ attendance, marks, sessionsLogged }) => {
  return (
    <div className="flex gap-4 mb-6">
      <StatCard
        label="Current attendance"
        value={attendance}
        note={`${sessionsLogged} sessions logged`}
        needsAttention
        barColor={attendance >= 90 ? 'bg-[#4A7C59]' : 'bg-[#D4A373]'}
      />
      <StatCard
        label="Current overall marks"
        value={marks}
        needsAttention
        barColor={marks >= 80 ? 'bg-[#4A7C59]' : 'bg-[#D4A373]'}
      />
    </div>
  );
};

export default StudentProgressStats;