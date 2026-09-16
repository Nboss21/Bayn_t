import React from 'react';

export default function ClassRow({
  id,
  title,
  seatsAvailable,
  totalSeats,
  programInfo,
  schedule,
  time,
  instructor,
  instructorRole,
  isFull,
  isSelected,
  onSelect,
}) {
  const enrolled = totalSeats - seatsAvailable;
  const progressPercent = (enrolled / totalSeats) * 100;

  // Container border/background based on state
  let containerClasses =
    'border rounded-xl p-4 flex items-center transition-all mb-3';
  if (isFull) {
    containerClasses += ' border-[#e5e7eb] bg-[#fafafa] cursor-not-allowed';
  } else if (isSelected) {
    containerClasses += ' border-[#5a7a3a] bg-white shadow-sm cursor-pointer';
  } else {
    containerClasses += ' border-[#e5e7eb] bg-white hover:border-[#9ab87a] cursor-pointer';
  }

  return (
    <div
      className={containerClasses}
      onClick={() => !isFull && onSelect(id)}
    >
      {/* 5-column grid: CLASS | SCHEDULE | INSTRUCTOR | CAPACITY | STATUS */}
      <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr' }}>

        {/* CLASS */}
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className={`text-sm font-semibold ${isFull ? 'text-[#9ca3af]' : 'text-[#111827]'}`}>
              {title}
            </h3>
            {isFull ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#fef2f2] text-[#ef4444] border border-[#fecaca]">
                Full · 0 seats
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#f0fdf4] text-[#16a34a]">
                {seatsAvailable} {seatsAvailable === 1 ? 'seat' : 'seats'} available
              </span>
            )}
          </div>
          <p className={`text-xs ${isFull ? 'text-[#d1d5db]' : 'text-[#6b7280]'}`}>{programInfo}</p>
        </div>

        {/* SCHEDULE */}
        <div className="flex flex-col justify-center">
          <p className={`text-sm ${isFull ? 'text-[#9ca3af]' : 'text-[#111827]'}`}>{schedule}</p>
          <p className={`text-xs ${isFull ? 'text-[#d1d5db]' : 'text-[#6b7280]'}`}>{time}</p>
        </div>

        {/* INSTRUCTOR */}
        <div className="flex flex-col justify-center">
          <p className={`text-sm ${isFull ? 'text-[#9ca3af]' : 'text-[#111827]'}`}>{instructor}</p>
          <p className={`text-xs ${isFull ? 'text-[#d1d5db]' : 'text-[#6b7280]'}`}>{instructorRole}</p>
        </div>

        {/* CAPACITY */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className={isFull ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>
              {enrolled} of {totalSeats} enrolled
            </span>
            <span className={`font-medium ${isFull ? 'text-[#ef4444]' : 'text-[#16a34a]'}`}>
              {seatsAvailable} remaining
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isFull ? 'bg-[#ef4444]' : 'bg-[#4d7c0f]'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* STATUS — Radio Button */}
      <div className="ml-5 flex-shrink-0">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isFull
              ? 'border-[#d1d5db] bg-[#f3f4f6]'
              : isSelected
              ? 'border-[#4d7c0f] bg-[#4d7c0f]'
              : 'border-[#d1d5db] bg-white'
          }`}
        >
          {isSelected && !isFull && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>
    </div>
  );
}
