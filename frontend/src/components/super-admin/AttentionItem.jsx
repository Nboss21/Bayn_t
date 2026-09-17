import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttentionItem({ icon: Icon, title, description, badge, buttonText, iconBg, badgeStyle, link }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-[#f3f4f6] rounded-xl mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-semibold text-[#111827]">{title}</h4>
            {badge && (
              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-semibold rounded-full ${badgeStyle}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[#6b7280]">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => link && navigate(link)}
        className="px-4 py-2 text-sm font-medium text-[#111827] bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded-lg transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
