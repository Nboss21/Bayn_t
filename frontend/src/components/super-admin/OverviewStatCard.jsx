import React from 'react';

export default function OverviewStatCard({ title, value, subtitle, badge, subtitleDot }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f3f4f6]">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xs font-semibold text-[#6b7280] tracking-widest uppercase">{title}</h3>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#ffccb3] text-[#d97706]">
            {badge}
          </span>
        )}
      </div>
      <div className="text-4xl font-bold text-[#111827] mb-2">{value}</div>
      <div className="flex items-center gap-2">
        {subtitleDot && <div className={`w-1.5 h-1.5 rounded-full ${subtitleDot}`} />}
        <p className="text-sm text-[#6b7280]">{subtitle}</p>
      </div>
    </div>
  );
}
