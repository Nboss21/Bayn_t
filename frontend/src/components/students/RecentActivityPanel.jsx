import React from 'react';

function ActivityItem({ activity, isLast }) {
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <div className="absolute left-[3px] top-2 -bottom-2 w-px bg-[#e5e7eb]" />
      )}
      <div className="relative mt-1.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]" />
      </div>
      <div>
        <p className="text-[13px] text-[#374151] leading-tight">
          {activity.description}
        </p>
        <p className="text-[12px] text-[#9ca3af] mt-0.5">{activity.date}</p>
      </div>
    </div>
  );
}

export default function RecentActivityPanel({ activities }) {
  return (
    <div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-4">Recent Activity</h3>
      <div>
        {activities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
