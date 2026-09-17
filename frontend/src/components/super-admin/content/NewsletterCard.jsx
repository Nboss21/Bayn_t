import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex flex-col">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
          <Mail className="w-[18px] h-[18px] text-[#6b7280]" />
        </div>
        <span className="text-[11px] font-medium text-white bg-[#5e7a50] px-2.5 py-1 rounded-full">
          128 subscribers
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#111827] mb-1">Newsletter</h3>

      {/* Description */}
      <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
        Manage the beauty industry mailing list, editorial digests, and guest artist announcements.
      </p>

      {/* Newsletter item */}
      <div className="flex items-center justify-between bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-3 py-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280]"></span>
          <span className="text-xs font-medium text-[#111827]">September Digest</span>
        </div>
        <span className="text-[11px] font-medium text-[#9ca3af]">
          Drafting
        </span>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-medium text-[#111827]">Manage Newsletter</span>
        <ArrowRight className="w-4 h-4 text-[#111827]" />
      </div>
    </div>
  );
}
