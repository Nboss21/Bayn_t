import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AddClassTimetableForm() {
  const [days, setDays] = useState([
    { name: 'Monday', selected: true },
    { name: 'Tuesday', selected: false },
    { name: 'Wednesday', selected: true },
    { name: 'Thursday', selected: false },
    { name: 'Friday', selected: true },
  ]);

  const toggleDay = (dayName) => {
    setDays(days.map(d => 
      d.name === dayName ? { ...d, selected: !d.selected } : d
    ));
  };

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[#1a1a1a] font-semibold text-[14px] uppercase tracking-[0.05em] mb-1">
            2. Timetable & Facility Allocation
          </h2>
          <p className="text-[#6b7280] text-[14px]">
            Define weekly schedule, studio room, and session recurrence.
          </p>
        </div>
        <div className="bg-[#f3f4f6] text-[#4b5563] text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          Step 2 of 3
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-2.5">
            Class Days (Select recurring days) <span className="text-[#ef4444]">*</span>
          </label>
          <div className="flex gap-2.5">
            {days.map((day) => (
              <button
                key={day.name}
                type="button"
                onClick={() => toggleDay(day.name)}
                className={`px-4 py-2 rounded-md text-[13px] font-medium border transition-colors ${
                  day.selected
                    ? 'bg-[#aab89b] text-[#1a1a1a] border-[#aab89b]'
                    : 'bg-white text-[#4b5563] border-[#e5e7eb] hover:bg-gray-50'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Time Slot
            </label>
            <div className="relative">
              <select className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer">
                <option>Morning Session (09:00 - 13:00 GMT)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Classroom Studio Facility
            </label>
            <div className="relative">
              <select className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer">
                <option>Studio 101 — Kensington High Vanity Lab (Max 24)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Start Date
            </label>
            <input
              type="text"
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
              defaultValue="05/12/2025"
            />
          </div>
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              End Date (Estimated Completion)
            </label>
            <input
              type="text"
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
              defaultValue="08/22/2025"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
