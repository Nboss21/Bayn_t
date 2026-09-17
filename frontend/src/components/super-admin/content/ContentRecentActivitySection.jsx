import React from 'react';

const activityItems = [
  {
    color: 'bg-[#f97316]',
    title: 'Gallery item updated',
    time: '10m ago',
    description: 'New bridal makeup image added to showcase gallery.',
    author: 'By D. Sterling',
  },
  {
    color: 'bg-[#f97316]',
    title: 'Program updated',
    time: '32m ago',
    description: 'Professional Makeup Artistry curriculum requirements revised.',
    author: 'By C. Vance',
  },
  {
    color: 'bg-[#f97316]',
    title: 'Course image updated',
    time: '1h ago',
    description: 'Bridal Makeup Mastery header picture was swapped.',
    author: 'By D. Sterling',
  },
  {
    color: 'bg-[#6b7280]',
    title: 'Newsletter draft created',
    time: '2h ago',
    description: 'September edition draft created with 2 masterclass spotlights.',
    author: 'By M. Moreau',
  },
];

export default function ContentRecentActivitySection() {
  return (
    <div className="flex-shrink-0 w-[300px]">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#111827]">Recent content activity</h2>
        <button className="text-xs font-medium text-[#6b7280] hover:text-[#111827] transition-colors cursor-pointer">
          Audit Log
        </button>
      </div>

      {/* Activity items */}
      <div className="space-y-5">
        {activityItems.map((item, i) => (
          <div key={i} className="flex gap-3">
            {/* Timeline dot */}
            <div className="flex flex-col items-center mt-1.5">
              <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`}></span>
              {i < activityItems.length - 1 && (
                <div className="w-px flex-1 bg-[#e5e7eb] mt-1"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-[#111827] leading-tight">{item.title}</span>
                <span className="text-[11px] text-[#9ca3af] shrink-0">{item.time}</span>
              </div>
              <p className="text-[12px] text-[#6b7280] leading-relaxed mt-0.5">{item.description}</p>
              <p className="text-[11px] text-[#9ca3af] mt-0.5">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
