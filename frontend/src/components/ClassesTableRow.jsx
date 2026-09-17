import React from 'react';

const ClassesTableRow = ({ classItem }) => {
  const { program, intake, instructorFirst, instructorLast, scheduleDays, scheduleTime, enrolled, capacity, status } = classItem;

  const isFull = enrolled >= capacity;
  const seatsAvailable = capacity - enrolled;
  const progressPercent = (enrolled / capacity) * 100;

  // Progress bar color: dark yellow/olive for full, green for active
  const progressColor = isFull ? 'bg-[#c9a83c]' : 'bg-[#6b8a3e]';

  // Status badge styling
  const statusStyles = isFull
    ? 'text-[#c9a83c] border border-[#c9a83c]'
    : 'text-[#6b8a3e] border border-[#6b8a3e]';

  // Seats label
  const seatsLabel = isFull
    ? 'Full'
    : `${seatsAvailable} seat${seatsAvailable !== 1 ? 's' : ''} available`;

  const seatsColor = isFull ? 'text-[#c9a83c]' : 'text-[#6b8a3e]';

  // Parse schedule time for display (handle newline)
  const timeLines = scheduleTime.split('\n');

  return (
    <tr className="border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#fafafa] transition-colors">
      {/* Program */}
      <td className="py-5 px-4 text-[14px] text-[#111827] font-medium leading-snug">
        {program}
      </td>

      {/* Intake */}
      <td className="py-5 px-4 text-[14px] text-[#6b7280]">
        {intake}
      </td>

      {/* Instructor */}
      <td className="py-5 px-4 text-[14px] text-[#111827]">
        <span>{instructorFirst}</span>
        <br />
        <span>{instructorLast}</span>
      </td>

      {/* Schedule */}
      <td className="py-5 px-4 text-[14px] text-[#6b7280]">
        <span>{scheduleDays}</span>
        <br />
        {timeLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < timeLines.length - 1 && <br />}
          </span>
        ))}
      </td>

      {/* Students / Capacity */}
      <td className="py-5 px-4 min-w-[160px]">
        <div className="text-[14px] text-[#111827] font-medium mb-1.5">
          {enrolled} / {capacity} students
        </div>
        {/* Progress Bar */}
        <div className="w-full h-[6px] bg-[#e5e7eb] rounded-full overflow-hidden mb-1.5">
          <div
            className={`h-full rounded-full ${progressColor} transition-all`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={`text-[12px] ${seatsColor}`}>
          {seatsLabel}
        </div>
      </td>

      {/* Status */}
      <td className="py-5 px-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${statusStyles}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default ClassesTableRow;
