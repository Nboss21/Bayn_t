import React from 'react';

const actions = [
  "Review Applications",
  "View Students",
  "View Classes"
];

const QuickActions = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Quick actions</h3>
      <div className="flex flex-col space-y-1">
        {actions.map((action, index) => (
          <button key={index} className="flex items-center justify-between py-2 text-[14px] text-gray-700 hover:text-gray-900 w-full text-left">
            <span>{action}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
