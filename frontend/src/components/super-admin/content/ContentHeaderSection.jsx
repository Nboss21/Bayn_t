import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ContentHeaderSection() {
  return (
    <div className="mb-6">
      {/* Title Row */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold text-[#111827] leading-tight">Content</h1>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4b5563]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280]"></span>
            3 updates ready
          </span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#d1d5db] rounded-lg text-sm font-medium text-[#111827] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer">
          <ExternalLink className="w-4 h-4" />
          Preview Website
        </button>
      </div>
      {/* Subtitle */}
      <p className="text-sm text-[#6b7280]">
        Manage the editorial imagery and programmatic content shown across the public HOB website.
      </p>
    </div>
  );
}
