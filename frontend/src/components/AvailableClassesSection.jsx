import React from 'react';
import ClassRow from './ClassRow';

const MOCK_CLASSES = [
  {
    id: 'pma-morning',
    title: 'PMA - Morning',
    seatsAvailable: 2,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '9:00 AM - 12:00 PM',
    instructor: 'Hana Alemu',
    instructorRole: 'Lead Instructor',
    isFull: false,
  },
  {
    id: 'pma-afternoon',
    title: 'PMA - Afternoon',
    seatsAvailable: 0,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '2:00 PM - 5:00 PM',
    instructor: 'Ruth Bekele',
    instructorRole: 'Lead Instructor',
    isFull: true,
  },
  {
    id: 'pma-evening',
    title: 'PMA - Evening',
    seatsAvailable: 1,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '5:30 PM - 8:30 PM',
    instructor: 'Selamawit Tesfaye',
    instructorRole: 'Lead Instructor',
    isFull: false,
  },
];

export default function AvailableClassesSection({ selectedClassId, onSelectClass }) {
  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId);

  return (
    <div className="border border-[#e5e7eb] rounded-2xl p-6 mb-6">
      {/* Section Header */}
      <h2 className="text-lg font-semibold text-[#111827] mb-1">Available Classes</h2>
      <p className="text-sm text-[#6b7280] mb-6">
        Classes shown below match the student's program (Professional Makeup Artistry) and September
        2026 intake. Select one available class.
      </p>

      {/* Table Column Headers */}
      <div
        className="grid gap-4 px-4 pb-3 mb-2 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest border-b border-[#f3f4f6]"
        style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 60px' }}
      >
        <div>CLASS</div>
        <div>SCHEDULE</div>
        <div>INSTRUCTOR</div>
        <div>CAPACITY</div>
        <div className="text-right">STATUS</div>
      </div>

      {/* Class Rows */}
      <div className="mt-3">
        {MOCK_CLASSES.map((cls) => (
          <React.Fragment key={cls.id}>
            <ClassRow
              {...cls}
              isSelected={selectedClassId === cls.id}
              onSelect={onSelectClass}
            />
            {cls.isFull && (
              <p className="text-xs text-[#9ca3af] -mt-1 mb-3 px-4">
                This class is at full capacity and cannot accept new enrollments.
              </p>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Info Box — shown when a class is selected */}
      {selectedClassId && selectedClass && (
        <div className="mt-4 bg-[#f4f7ed] border border-[#ccd9b0] rounded-xl p-4 text-sm text-[#4b5563] leading-relaxed">
          <p className="mb-1">
            Assigning Mekdes Tesfaye to{' '}
            <strong className="font-medium text-[#111827]">{selectedClass.title}</strong> will
            reserve 1 of {selectedClass.seatsAvailable} remaining seats in the September 2026
            cohort.
          </p>
          <p className="text-[#6b7280]">
            This action finalises the student's enrollment record. The student and assigned
            instructor will be notified by the registrar office after assignment is confirmed.
          </p>
        </div>
      )}
    </div>
  );
}
