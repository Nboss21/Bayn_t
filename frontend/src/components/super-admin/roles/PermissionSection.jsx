import React from 'react';

export default function PermissionSection({ icon: Icon, title, subtitle, items }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm mb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#e5e7eb] bg-[#fafaf9]">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#6b7280]" />
          <h3 className="text-[11px] font-bold text-[#111827] uppercase tracking-wider">{title}</h3>
        </div>
        <span className="text-[11px] text-[#9ca3af]">{subtitle}</span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-[#f3f4f6]">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between px-5 py-4">
            <div className="pr-8">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[14px] font-bold text-[#111827]">{item.name}</h4>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f3f4f6] text-[#4b5563] border border-[#e5e7eb]">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[#6b7280]">{item.description}</p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${item.view ? 'bg-[#2563eb]' : 'border border-[#d1d5db] bg-white'
                  }`}>
                  {item.view && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] font-medium text-[#111827]">View</span>
              </label>

              {item.manageDisabled ? (
                <div className="w-[72px] flex items-center justify-end text-[12px] text-[#9ca3af]">
                  N/A
                </div>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer w-[72px]">
                  <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${item.manage ? 'bg-[#2563eb]' : 'border border-[#d1d5db] bg-white'
                    }`}>
                    {item.manage && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-medium text-[#111827]">Manage</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
