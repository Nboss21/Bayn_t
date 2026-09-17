import React from 'react';
import { FileText } from 'lucide-react';

export default function PaymentsHeaderSection() {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
      <div>
        <p className="text-[11px] font-bold text-[#6b7280] tracking-wider uppercase mb-1">
          FINANCE <span className="text-[#9ca3af] font-normal mx-0.5">/</span> PAYMENTS
        </p>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
          Payments
        </h1>
        <p className="text-sm text-[#6b7280] mt-1.5 leading-relaxed max-w-xl">
          Monitor student payment status and review payments that need attention.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto">
        {/* 24 recent payments badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f2ec] text-[#4b5563] text-xs font-medium border border-[#e2e4dc]">
          <FileText className="w-3.5 h-3.5 text-[#6b7280]" />
          <span><strong className="font-semibold text-[#111827]">24</strong> recent payments</span>
        </div>

        {/* 3 need attention badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdeee4] text-[#c45c2c] text-xs font-medium border border-[#fbdcd0]">
          <span className="w-2 h-2 rounded-full bg-[#d95d28] inline-block" />
          <span><strong className="font-bold text-[#b44e21]">3</strong> need attention</span>
        </div>
      </div>
    </div>
  );
}
