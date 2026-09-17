import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';

export default function PublicProgramCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f3f4f6] rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#6b7280]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wide">PUBLIC PROGRAM INFORMATION</h3>
            <p className="text-sm text-[#6b7280] mt-0.5">Program information may appear on the public HOB website course catalog.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#fdf5ed] text-[#d97706] rounded-lg text-sm font-medium hover:bg-[#faebd7] transition-colors cursor-pointer">
          View public program
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
