import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CourseImagesCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex flex-col">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="14" height="12" rx="2" stroke="#6b7280" strokeWidth="1.5"/>
            <circle cx="6.5" cy="7.5" r="1.5" fill="#6b7280"/>
            <path d="M2 13L6 9L9 12L12 9L16 13" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[11px] font-medium text-[#6b7280] bg-[#f3f4f6] px-2.5 py-1 rounded-full">
          4 program images
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#111827] mb-1">Course Images</h3>

      {/* Description */}
      <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
        Upload and crop high-fidelity hero banners and classroom environment photos for course pages.
      </p>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="aspect-square bg-[#e5e7eb] rounded-md bg-[repeating-conic-gradient(#d1d5db_0%_25%,transparent_0%_50%)] bg-[length:8px_8px]"></div>
        <div className="aspect-square bg-[#e5e7eb] rounded-md bg-[repeating-conic-gradient(#d1d5db_0%_25%,transparent_0%_50%)] bg-[length:8px_8px]"></div>
        <div className="aspect-square bg-[#e5e7eb] rounded-md bg-[repeating-conic-gradient(#d1d5db_0%_25%,transparent_0%_50%)] bg-[length:8px_8px]"></div>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-medium text-[#111827]">Manage Images</span>
        <ArrowRight className="w-4 h-4 text-[#111827]" />
      </div>
    </div>
  );
}
