import React from 'react';

export default function LivePreviewPanel() {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Live Report Preview</h2>
        </div>
        <div className="bg-[#E8F0E5] text-[#4E6154] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Ready to Generate
        </div>
      </div>

      <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Report Title</div>
            <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Attendance & Punctuality Audit</h3>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Scope</div>
            <div className="text-xs font-medium text-gray-800">All Active Cohorts</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Timeframe</div>
            <div className="text-xs font-medium text-gray-800">Sep 01 - Sep 30, 2026</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Calculated Sample:</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-900">146 Students across 8 Cohorts</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-3">
          <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Projected Summary Distribution</h4>
          <span className="text-[10px] text-gray-500">Estimated</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full flex rounded-full overflow-hidden mb-4 bg-gray-100">
          <div className="bg-[#B9E0A5]" style={{ width: '88%' }}></div>
          <div className="bg-[#F8D4C0]" style={{ width: '6%' }}></div>
          <div className="bg-[#FCE0B5]" style={{ width: '4%' }}></div>
          <div className="bg-[#BCE4F2]" style={{ width: '2%' }}></div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#B9E0A5]"></div>
            <span className="text-[10px] text-gray-600">Present (88%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F8D4C0]"></div>
            <span className="text-[10px] text-gray-600">Absent (6%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FCE0B5]"></div>
            <span className="text-[10px] text-gray-600">Late (&gt;15m) (4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#BCE4F2]"></div>
            <span className="text-[10px] text-gray-600">Excused (2%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
