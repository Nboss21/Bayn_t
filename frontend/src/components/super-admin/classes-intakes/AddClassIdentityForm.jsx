import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function AddClassIdentityForm({ options = {} }) {
  const {
    defaultName = '',
    namePlaceholder = '',
    intakes = [],
    defaultIntake = '',
    intakePlaceholder = 'Select intake cohort...',
    instructors = [],
    defaultInstructor = '',
    instructorPlaceholder = 'Select lead master artist...',
  } = options;

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[#1a1a1a] font-semibold text-[14px] uppercase tracking-[0.05em] mb-1">
            1. Class Identity & Association
          </h2>
          <p className="text-[#6b7280] text-[14px]">
            Assign syllabus framework, cohort period, and lead academy artist.
          </p>
        </div>
        <div className="bg-[#f3f4f6] text-[#4b5563] text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          Step 1 of 3
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
            Class Name <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] focus:outline-none focus:border-[#d1d5db]"
            defaultValue={defaultName}
            placeholder={namePlaceholder}
          />
        </div>

        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
            Intake Cohort <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <select
              defaultValue={defaultIntake}
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer"
            >
              {defaultIntake === '' && (
                <option value="" disabled>{intakePlaceholder}</option>
              )}
              {intakes.map((intake) => (
                <option key={intake} value={intake}>{intake}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[#1a1a1a] text-[13px] font-medium mb-1.5">
            Primary Instructor (Lead Master Artist) <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <select
              defaultValue={defaultInstructor}
              className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[14px] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#d1d5db] cursor-pointer"
            >
              {defaultInstructor === '' && (
                <option value="" disabled>{instructorPlaceholder}</option>
              )}
              {instructors.map((instructor) => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}