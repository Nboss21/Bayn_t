import React from 'react';

const TABS = ['Workshop', 'Intake'];

const EventFilterTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-3 mb-10">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-5 py-1.5 rounded border text-[11px] font-semibold uppercase tracking-widest transition-colors ${
            activeTab === tab
              ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
              : 'bg-white/70 text-[#1c1c1c]/70 border-[#c8c8c0] hover:border-[#1c1c1c]/40 hover:text-[#1c1c1c]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default EventFilterTabs;
