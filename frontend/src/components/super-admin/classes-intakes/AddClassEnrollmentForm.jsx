import React, { useState } from 'react';

export default function AddClassEnrollmentForm() {
  const [isWaitlistActive, setIsWaitlistActive] = useState(true);
  const [publishingState, setPublishingState] = useState('upcoming'); // 'upcoming', 'inSession', 'draft'
  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[#1a1a1a] font-semibold text-[14px] uppercase tracking-[0.05em] mb-1">
            3. Enrollment & Cohort Status
          </h2>
          <p className="text-[#6b7280] text-[14px]">
            Cap the classroom seats, regulate automated waitlist, and choose publication state.
          </p>
        </div>
        <div className="bg-[#f3f4f6] text-[#4b5563] text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          Step 3 of 3
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-7">
        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-2">
            Max Student Capacity (Seats)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="w-[80px] border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
              defaultValue="20"
            />
            <span className="text-[13px] text-[#6b7280] leading-snug w-[140px]">
              Standard ratio is 1:20 vanity mirrors.
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-2">
            Automated Waitlist Pool
          </label>
          <div className="flex items-center gap-3 mt-1.5">
            <div 
              className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${isWaitlistActive ? 'bg-[#7b8a66]' : 'bg-gray-300'}`}
              onClick={() => setIsWaitlistActive(!isWaitlistActive)}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isWaitlistActive ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
            <span className="text-[14px] text-[#1a1a1a]">Accept waitlist once seats cap</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[#1a1a1a] text-[13px] font-medium mb-3">
          Initial Publishing State
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div 
            onClick={() => setPublishingState('upcoming')}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${publishingState === 'upcoming' ? 'border-[#9ba987] bg-[#f8faf6] shadow-[0_0_0_1px_#9ba987]' : 'border-[#e5e7eb] hover:border-[#d1d5db]'}`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[14px] font-semibold text-[#1a1a1a]">Upcoming</span>
              <div className={`w-4 h-4 rounded-full bg-white ${publishingState === 'upcoming' ? 'border-[5px] border-[#8a9a79]' : 'border border-[#d1d5db]'}`}></div>
            </div>
            <p className="text-[12px] text-[#6b7280] leading-snug">
              Visible for candidate admissions enrollment.
            </p>
          </div>

          <div 
            onClick={() => setPublishingState('inSession')}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${publishingState === 'inSession' ? 'border-[#9ba987] bg-[#f8faf6] shadow-[0_0_0_1px_#9ba987]' : 'border-[#e5e7eb] hover:border-[#d1d5db]'}`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[14px] font-semibold text-[#1a1a1a]">In Session</span>
              <div className={`w-4 h-4 rounded-full bg-white ${publishingState === 'inSession' ? 'border-[5px] border-[#8a9a79]' : 'border border-[#d1d5db]'}`}></div>
            </div>
            <p className="text-[12px] text-[#6b7280] leading-snug">
              Commenced directly with immediate attendance tracking.
            </p>
          </div>

          <div 
            onClick={() => setPublishingState('draft')}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${publishingState === 'draft' ? 'border-[#9ba987] bg-[#f8faf6] shadow-[0_0_0_1px_#9ba987]' : 'border-[#e5e7eb] hover:border-[#d1d5db]'}`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[14px] font-semibold text-[#1a1a1a]">Draft</span>
              <div className={`w-4 h-4 rounded-full bg-white ${publishingState === 'draft' ? 'border-[5px] border-[#8a9a79]' : 'border border-[#d1d5db]'}`}></div>
            </div>
            <p className="text-[12px] text-[#6b7280] leading-snug">
              Hidden from public portals and registrar roster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
