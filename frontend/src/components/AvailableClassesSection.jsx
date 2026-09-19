import React from 'react';
import ClassRow from './ClassRow';

export default function AvailableClassesSection({ classes = [], selectedClassId, onSelectClass, application }) {
  const selectedClass = classes.find((item) => String(item.id) === String(selectedClassId));
  const programName = application?.program?.name || 'the student’s program';
  const intakeName = application?.intake?.name || 'the selected intake';

  return (
    <div className="border border-[#e5e7eb] rounded-2xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-[#111827] mb-1">Available Classes</h2>
      <p className="text-sm text-[#6b7280] mb-6">Classes below are loaded from the database for {programName} and {intakeName}.</p>

      <div className="grid gap-4 px-4 pb-3 mb-2 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest border-b border-[#f3f4f6]" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 60px' }}>
        <div>CLASS</div><div>SCHEDULE</div><div>INSTRUCTOR</div><div>CAPACITY</div><div className="text-right">STATUS</div>
      </div>

      <div className="mt-3">
        {classes.map((item) => (
          <React.Fragment key={item.id}>
            <ClassRow {...item} isSelected={String(selectedClassId) === String(item.id)} onSelect={onSelectClass} />
            {item.isFull && <p className="text-xs text-[#9ca3af] -mt-1 mb-3 px-4">This class is at full capacity and cannot accept new enrollments.</p>}
          </React.Fragment>
        ))}
        {!classes.length && <p className="py-10 text-center text-sm text-[#6b7280]">No classes are available for this program and intake.</p>}
      </div>

      {selectedClass && !selectedClass.isFull && (
        <div className="mt-4 bg-[#f4f7ed] border border-[#ccd9b0] rounded-xl p-4 text-sm text-[#4b5563] leading-relaxed">
          <p className="mb-1">Assigning <strong className="font-medium text-[#111827]">{application?.applicant_name || 'this student'}</strong> to <strong className="font-medium text-[#111827]">{selectedClass.title}</strong> will reserve one of {selectedClass.seatsAvailable} remaining seats.</p>
          <p className="text-[#6b7280]">The student and assigned instructor will be notified after assignment is confirmed.</p>
        </div>
      )}
    </div>
  );
}
