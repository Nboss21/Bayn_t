import React from 'react';

const NeedsAttentionItem = ({ countText, description, actionText, badgeText, badgeColor, badgeBg, badgeBorder, lineColor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute left-0 top-5 bottom-5 w-1 ${lineColor} rounded-r-md`}></div>
      <div className="pl-4 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-[15px] font-semibold text-gray-900">{countText}</h4>
          {badgeText && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${badgeBg} ${badgeColor} ${badgeBorder}`}>
              {badgeText}
            </span>
          )}
        </div>
        <p className="text-[13px] text-gray-500 max-w-2xl">{description}</p>
      </div>
      <button className="text-[13px] font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
        {actionText} <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
};

export default NeedsAttentionItem;
