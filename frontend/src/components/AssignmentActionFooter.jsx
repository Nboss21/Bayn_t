import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssignmentActionFooter({ selectedClass }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-[#e5e7eb] px-8 py-4 flex items-center justify-between z-20">
      {/* Left — Selected class info */}
      <div>
        {selectedClass ? (
          <>
            <p className="text-sm text-[#374151]">
              Selected class:{' '}
              <strong className="font-semibold text-[#111827]">{selectedClass.title}</strong>
            </p>
            <p className="text-xs text-[#6b7280] mt-0.5">
              Starts 1 Sep 2026 · Instructor: {selectedClass.instructor} ·{' '}
              {selectedClass.seatsAvailable} seats remaining
            </p>
          </>
        ) : (
          <p className="text-sm text-[#9ca3af]">Select a class to continue</p>
        )}
      </div>

      {/* Right — Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!selectedClass}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            selectedClass
              ? 'bg-[#c6dbb6] text-[#1a2e0f] hover:bg-[#b5cca4] cursor-pointer'
              : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
          }`}
        >
          Assign to Class
        </button>
      </div>
    </div>
  );
}
