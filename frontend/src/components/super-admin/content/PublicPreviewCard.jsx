import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

export default function PublicPreviewCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex flex-col">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#eef6fb] flex items-center justify-center">
          <Globe className="w-[18px] h-[18px] text-[#3b82f6]" />
        </div>
        <span className="text-[11px] font-medium text-[#6b7280] bg-[#f3f4f6] px-2.5 py-1 rounded-full">
          Last published Sep 7, 2026
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#111827] mb-1">Public Preview & Domain Sync</h3>

      {/* Description */}
      <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
        Inspect the staging environment before changes propagate to houseofbeauty.ac.uk. Changes staged now include 3 pending editorial updates.
      </p>

      {/* Domain status */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
          <span className="text-xs font-medium text-[#111827] font-mono">staging.houseofbeauty.ac.uk</span>
        </div>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-medium text-[#111827]">Open Staging Preview</span>
        <ExternalLink className="w-4 h-4 text-[#111827]" />
      </div>
    </div>
  );
}
