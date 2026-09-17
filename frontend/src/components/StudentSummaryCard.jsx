import React from 'react';

export default function StudentSummaryCard() {
  return (
    <div className="border border-[#e5e7eb] rounded-2xl overflow-hidden mb-6 mt-6">
      {/* Top section: avatar + name + status indicator */}
      <div className="px-6 pt-6 pb-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[15px] font-semibold text-[#4b5563] flex-shrink-0">
            MT
          </div>
          <div>
            {/* Name + Approved badge */}
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-xl font-semibold text-[#111827]">Mekdes Tesfaye</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                Approved
              </span>
            </div>
            {/* Application metadata */}
            <div className="flex items-center gap-2 text-sm text-[#6b7280] flex-wrap">
              <span>
                Application ID:{' '}
                <span className="font-medium text-[#374151]">HOB-2026-0142</span>
              </span>
              <span className="text-[#d1d5db]">·</span>
              <span>
                Program:{' '}
                <span className="font-medium text-[#374151]">Professional Makeup Artistry</span>
              </span>
              <span className="text-[#d1d5db]">·</span>
              <span>
                Intake:{' '}
                <span className="font-medium text-[#374151]">September 2026</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Ready indicator */}
        <div className="text-right flex-shrink-0">
          <div className="flex items-center justify-end gap-1.5 text-sm text-[#374151] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] flex-shrink-0" />
            <span className="font-medium">Ready for Class Assignment</span>
          </div>
          <p className="text-xs text-[#9ca3af]">Application approved · Tuition paid in full</p>
        </div>
      </div>

      {/* Bottom row: meta fields */}
      <div className="grid grid-cols-4 gap-6 px-6 py-4 border-t border-[#f3f4f6] bg-white">
        <div>
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">
            EMAIL
          </p>
          <p className="text-sm text-[#111827]">mekdes.tesfaye@example.com</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">
            PHONE
          </p>
          <p className="text-sm text-[#111827]">+251 91 234 5678</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">
            APPLICATION DATE
          </p>
          <p className="text-sm text-[#111827]">12 Aug 2026</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">
            PAYMENT
          </p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#f0fdf4] text-[#16a34a]">
            Paid · 18,500 ETB
          </span>
        </div>
      </div>
    </div>
  );
}
