import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AddClassTimetableForm({ options = {} }) {
  const {
    days = [],
    defaultDays = [],
    timeSlots = [],
    defaultTimeSlot = '',
    timeSlotPlaceholder = 'Select time slot...',
    studios = [],
    defaultStudio = '',
    studioPlaceholder = 'Select studio facility...',
    startDateDefault = '',
    endDateDefault = '',
  } = options;

  const [selectedDays, setSelectedDays] = useState(
    defaultDays.length ? defaultDays : days.map((d) => d.name),
  );

  const toggleDay = (dayName) => {
    setSelectedDays((prev) =>
      prev.includes(dayName) ? prev.filter((d) => d !== dayName) : [...prev, dayName],
    );
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
          <div className="flex flex-wrap gap-2.5">
            {days.map((dayName) => {
              const selected = selectedDays.includes(dayName);
              return (
                <button
                  key={dayName}
                  type="button"
                  onClick={() => toggleDay(dayName)}
                  className={`px-4 py-2 rounded-md text-[13px] font-medium border transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#aab89b] text-[#1a1a1a] border-[#aab89b]'
                      : 'bg-white text-[#4b5563] border-[#e5e7eb] hover:bg-gray-50'
                  }`}
                >
                  {dayName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Time Slot
            </label>
            <div className="relative">
              <select
                defaultValue={defaultTimeSlot}
                className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer"
              >
                {defaultTimeSlot === '' && (
                  <option value="" disabled>{timeSlotPlaceholder}</option>
                )}
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Classroom Studio Facility
            </label>
            <div className="relative">
              <select
                defaultValue={defaultStudio}
                className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer"
              >
                {defaultStudio === '' && (
                  <option value="" disabled>{studioPlaceholder}</option>
                )}
                {studios.map((studio) => (
                  <option key={studio} value={studio}>{studio}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              Start Date
            </label>
            <input
              type="text"
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
              defaultValue={startDateDefault}
            />
          </div>
          <div>
            <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
              End Date (Estimated Completion)
            </label>
            <input
              type="text"
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
              defaultValue={endDateDefault}
            />
          </div>
        </div>
      </div>
    </div>
  );
}