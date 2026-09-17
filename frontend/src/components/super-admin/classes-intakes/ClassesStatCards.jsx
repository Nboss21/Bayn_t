import React from 'react';

export default function ClassesStatCards({
  statCards = [],
  active = 0,
  upcoming = 0,
  atCapacity = 0,
}) {
  const values = { active, upcoming, atCapacity };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((card) => (
        <div key={card.key} className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-[11px] font-semibold text-[#6b7280] tracking-widest uppercase">{card.label}</h3>
            {card.badgeText ? (
              <div className="flex items-center gap-1.5 bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#fde68a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></div>
                {card.badgeText}
              </div>
            ) : (
              <div className={`w-2 h-2 rounded-full ${card.dotClass}`}></div>
            )}
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-[#111827]">{values[card.key]}</span>
            <span className="text-[13px] text-[#6b7280] font-medium">{card.suffix}</span>
          </div>
        </div>
      ))}
    </div>
  );
}