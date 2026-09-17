import React from 'react';

const activities = [
  {
    id: 1,
    title: 'New staff account created',
    description: 'Sandra Example was added as a Registrar.',
    time: '10 min ago',
    dotColor: 'bg-[#a3e635]', // Light green dot
  },
  {
    id: 2,
    title: 'Program updated',
    description: 'Professional Makeup Artistry was updated.',
    time: '32 min ago',
    dotColor: 'bg-[#d1d5db]',
  },
  {
    id: 3,
    title: 'Class capacity updated',
    description: 'PMA Morning changed to 18 of 20 students.',
    time: '1 hr ago',
    dotColor: 'bg-[#d1d5db]',
  },
  {
    id: 4,
    title: 'Payment status updated',
    description: 'A payment was marked as received.',
    time: '2 hrs ago',
    dotColor: 'bg-[#d1d5db]',
  },
  {
    id: 5,
    title: 'Content updated',
    description: 'A gallery item was updated.',
    time: '3 hrs ago',
    dotColor: 'bg-[#d1d5db]',
  }
];

export default function RecentActivitySection() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f3f4f6]">
      <h2 className="text-lg font-bold text-[#111827] mb-1">Recent activity</h2>
      <p className="text-sm text-[#6b7280] mb-6">Platform events across all ateliers.</p>
      
      <div className="relative pl-3 border-l-2 border-[#f3f4f6] space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative">
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full ${activity.dotColor} border-2 border-white ring-1 ring-white`} />
            
            <div className="pl-2">
              <h4 className="text-sm font-semibold text-[#111827] mb-0.5">{activity.title}</h4>
              <p className="text-sm text-[#6b7280] mb-1">{activity.description}</p>
              <span className="text-[11px] text-[#9ca3af] font-medium">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
