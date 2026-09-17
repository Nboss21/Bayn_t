import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentsNeedsAttentionSection() {
  const navigate = useNavigate();

  const attentionItems = [
    {
      initials: 'MT',
      avatarBg: 'bg-[#f5ebd7] text-[#966b3b]',
      name: 'Mekdes Tesfaye',
      program: 'Professional Makeup Artistry',
      badgeText: 'Payment pending',
      badgeStyle: 'bg-[#fce5d8] text-[#b85b2e]',
      initiatedDate: 'Sep 7, 2026',
      amount: 'ETB 25,000',
    },
    {
      initials: 'SA',
      avatarBg: 'bg-[#e6e7e1] text-[#4b5563]',
      name: 'Saron Alemu',
      program: 'Bridal Makeup Mastery',
      badgeText: 'Needs verification',
      badgeStyle: 'bg-[#fce5d8] text-[#b85b2e]',
      initiatedDate: 'Sep 6, 2026',
      amount: 'ETB 20,000',
    },
    {
      initials: 'HE',
      avatarBg: 'bg-[#dce3d6] text-[#3e5f41]',
      name: 'Hana Example',
      program: 'Professional Makeup Artistry',
      badgeText: 'Information incomplete',
      badgeStyle: 'bg-[#e5e7e0] text-[#5c6156]',
      initiatedDate: 'Sep 5, 2026',
      amount: 'ETB 25,000',
    },
  ];

  return (
    <div className="mb-10">
      {/* Title & Badge */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-[#111827]">
          Needs attention
        </h2>
        <span className="px-3 py-1 rounded-full bg-[#fdeee4] text-[#cb6a39] text-xs font-semibold border border-[#fbdcd0]">
          3 payments need review
        </span>
      </div>

      {/* Main card list wrapper */}
      <div className="bg-[#f7f8f4] rounded-2xl p-3 sm:p-4 border border-[#e5e7dc] space-y-3">
        {attentionItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#f0f2ea] sm:bg-[#f2f4ec] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#ebedd6]"
          >
            {/* Left: Avatar + Name + Badge + Program */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${item.avatarBg}`}
              >
                {item.initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-[#111827]">
                    {item.name}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.badgeStyle}`}
                  >
                    {item.badgeText}
                  </span>
                </div>
                <p className="text-xs text-[#6b7280] mt-0.5">
                  {item.program}
                </p>
              </div>
            </div>

            {/* Right: Initiated date + Amount + Review button */}
            <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 border-t md:border-t-0 pt-3 md:pt-0 border-[#e2e4da]">
              <div className="text-right">
                <span className="block text-[11px] text-[#9ca3af]">Initiated</span>
                <span className="text-xs font-semibold text-[#374151]">
                  {item.initiatedDate}
                </span>
              </div>

              <div className="text-sm font-extrabold text-[#111827]">
                {item.amount}
              </div>

              <button 
                onClick={() => navigate('/super-admin/payments/PAY-8840')}
                className="px-4 py-2 rounded-lg bg-[#b4c3aa] hover:bg-[#a4b499] text-[#1f3120] font-semibold text-xs flex items-center gap-1 transition-colors shadow-2xs"
              >
                <span>Review</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
