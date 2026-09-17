import React from 'react';
import { Clock } from 'lucide-react';

export default function ProgramInformationCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Program information</h2>
            <p className="text-sm text-[#6b7280] mt-1">Core identification, curriculum outline, and learning level.</p>
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wider bg-[#f3f4f6] text-[#6b7280] uppercase">
            PRIMARY
          </span>
        </div>

        <div className="space-y-6">
          {/* Program Name */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">
              Program name <span className="text-[#dc2626]">*</span>
            </label>
            <input
              type="text"
              defaultValue="Professional Makeup Artistry"
              className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm"
            />
            <div className="flex items-center mt-2.5 text-[#6b7280] text-sm">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Use the name students will see when choosing a program.</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">
              Description <span className="text-[#dc2626]">*</span>
            </label>
            <textarea
              rows={4}
              defaultValue="Professional training in makeup artistry, beauty techniques, and professional practice."
              className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm resize-none"
            />
            <div className="flex items-center justify-between mt-2.5 text-[#6b7280] text-xs">
              <span>Keep the description focused on core skills, techniques, and career outcomes.</span>
              <span>88 chars</span>
            </div>
          </div>

          {/* Level & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Level <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 border border-[#d1d5db] rounded-lg text-[#111827] appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm bg-white cursor-pointer">
                  <option>Intermediate</option>
                  <option>Beginner</option>
                  <option>Advanced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Duration <span className="text-[#dc2626]">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue="12"
                  className="w-20 px-3 py-2.5 border border-[#d1d5db] rounded-lg text-[#111827] text-center focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm"
                />
                <div className="relative flex-1">
                  <select className="w-full pl-4 pr-10 py-2.5 border border-[#d1d5db] rounded-lg text-[#111827] appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm bg-white cursor-pointer">
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>Years</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#6b7280] mt-2.5">Enter the expected program length.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
