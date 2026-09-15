import SectionCard from './SectionCard';

export default function ActivityHistory({ applicant }) {
  return (
    <SectionCard title="Activity History">
      <div className="relative pl-3">
        {applicant.activities.map((activity) => (
          <div key={activity.id} className={`relative ${!activity.isLast ? 'pb-6' : ''}`}>
            {!activity.isLast && (
              <div className="absolute left-[5px] top-2 bottom-[-8px] w-px bg-gray-200"></div>
            )}
            <div className="flex gap-4">
              <div className="relative mt-1 z-10 flex-shrink-0">
                <div className={`w-3 h-3 rounded-full border-2 ${activity.active ? 'border-[#16a34a] bg-white' : 'border-gray-300 bg-white'}`}></div>
              </div>
              <div>
                <p className={`text-[13px] ${activity.active ? 'text-[#1a1a1a]' : 'text-gray-600'}`}>{activity.title}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{activity.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

