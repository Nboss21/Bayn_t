import React from 'react';

const statData = [
  {
    label: '# OF ALL ALUMS',
    value: '18',
    sub: 'Active Students YoY',
  },
  {
    label: 'OVERALL CLASS AT TENDANCE',
    value: '92%',
    sub: 'Average healthy',
  },
  {
    label: 'ASSESSMENT AVERAGE',
    value: '83%',
    sub: 'In-class testing',
  },
  {
    label: 'ACADEMIC STATUS',
    customContent: (
      <div className="flex items-center gap-2 mt-1">
        <span className="bg-[#D4EDDA] text-[#2F6B43] text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
          96% On Track
        </span>
        <span className="bg-[#FEF0C7] text-[#B45309] text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
          2 At-risk
        </span>
      </div>
    ),
  },
];

const RosterStatsBar = () => {
  return (
    <div className="grid grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden mb-6 bg-white">
      {statData.map((stat, i) => (
        <div
          key={i}
          className={`px-6 py-5 ${i < statData.length - 1 ? 'border-r border-gray-200' : ''}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            {stat.label}
          </p>
          {stat.customContent ? (
            <>
              <p className="text-[24px] font-semibold text-[#1A1A1A]">&nbsp;</p>
              {stat.customContent}
            </>
          ) : (
            <>
              <p className="text-[24px] font-semibold text-[#1A1A1A]">{stat.value}</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{stat.sub}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RosterStatsBar;

