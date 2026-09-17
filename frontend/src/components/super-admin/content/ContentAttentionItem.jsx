import React from 'react';

const statusConfig = {
  'Ready for Review': {
    bg: 'bg-[#fef2f2]',
    text: 'text-[#dc2626]',
    border: 'border-[#fecaca]',
  },
  'Draft': {
    bg: 'bg-[#f3f4f6]',
    text: 'text-[#4b5563]',
    border: 'border-[#e5e7eb]',
  },
  'Ready to Publish': {
    bg: 'bg-[#f0fdf4]',
    text: 'text-[#16a34a]',
    border: 'border-[#bbf7d0]',
  },
};

const iconConfig = {
  gallery: (
    <div className="w-9 h-9 rounded-lg bg-[#fef2f2] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="2" width="14" height="12" rx="2" stroke="#dc2626" strokeWidth="1.5"/>
        <circle cx="5.5" cy="6.5" r="1.5" fill="#dc2626"/>
        <path d="M1 12L5 8L8 11L11 8L15 12" stroke="#dc2626" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  program: (
    <div className="w-9 h-9 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3C3 2.44772 3.44772 2 4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3Z" stroke="#6b7280" strokeWidth="1.5"/>
        <path d="M5.5 5.5H10.5M5.5 8.5H8.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  ),
  website: (
    <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M8 2C8 2 11 5 11 8C11 11 8 14 8 14" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M8 2C8 2 5 5 5 8C5 11 8 14 8 14" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M2 8H14" stroke="#16a34a" strokeWidth="1.5"/>
      </svg>
    </div>
  ),
};

export default function ContentAttentionItem({ type, title, status, description, lines }) {
  const config = statusConfig[status] || statusConfig['Draft'];

  return (
    <div className="flex items-start gap-4 py-5 border-b border-[#f3f4f6] last:border-b-0">
      {/* Icon */}
      {iconConfig[type]}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-[#111827]">{title}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
            {status}
          </span>
        </div>
        {lines.map((line, i) => (
          <p key={i} className="text-[13px] text-[#6b7280] leading-relaxed">
            {line}
          </p>
        ))}
      </div>

      {/* Review button */}
      <button className="px-4 py-2 text-sm font-medium text-[#111827] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors shrink-0 self-center cursor-pointer">
        Review
      </button>
    </div>
  );
}
