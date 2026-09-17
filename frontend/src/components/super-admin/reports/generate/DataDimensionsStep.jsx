import React, { useState } from 'react';

export default function DataDimensionsStep() {
  const [unexcused, setUnexcused] = useState(true);
  const [aggregate, setAggregate] = useState(true);
  const [granularity, setGranularity] = useState('detailed');

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-[#E8F0E5] text-[#4E6154] flex items-center justify-center text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Data Dimensions & Breakdown</h2>
            <p className="text-xs text-gray-500 mt-1">Select specific student attributes and attendance metrics to include in calculation.</p>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-1">
          Step 2 of 3
        </div>
      </div>

      <div className="ml-10 space-y-4 mb-6">
        <div 
          onClick={() => setUnexcused(!unexcused)}
          className="flex gap-4 p-4 rounded-xl bg-[#F8F9FA] cursor-pointer"
        >
          <div className="mt-0.5 shrink-0">
            <div className={`w-4 h-4 rounded shadow-sm border flex items-center justify-center ${unexcused ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
              {unexcused && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Unexcused vs Excused Absences</h3>
            <p className="text-xs text-gray-500 mt-0.5">Categorize health dispensations and masterclass absences distinctly.</p>
          </div>
        </div>

        <div 
          onClick={() => setAggregate(!aggregate)}
          className="flex gap-4 p-4 rounded-xl bg-[#F8F9FA] cursor-pointer"
        >
          <div className="mt-0.5 shrink-0">
            <div className={`w-4 h-4 rounded shadow-sm border flex items-center justify-center ${aggregate ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
              {aggregate && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Aggregate Summary KPI Totals</h3>
            <p className="text-xs text-gray-500 mt-0.5">Append header benchmark indicators (average attendance rate, cohort quartile medians).</p>
          </div>
        </div>
      </div>

      <div className="ml-10">
        <label className="block text-xs font-bold text-gray-700 mb-3">Report Granularity & Level of Detail</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setGranularity('executive')}
            className={`p-4 rounded-xl border ${granularity === 'executive' ? 'bg-[#F4F7F9] border-transparent' : 'bg-[#F8F9FA] border-transparent hover:border-gray-200'} cursor-pointer flex gap-3`}
          >
            <div className="mt-1 shrink-0">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${granularity === 'executive' ? 'border-blue-500' : 'bg-white border-gray-300'}`}>
                {granularity === 'executive' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Executive Summary Only</h3>
              <p className="text-xs text-gray-500 mt-0.5">High-level cohort totals, pie charts, and compliance flags.</p>
            </div>
          </div>
          
          <div 
            onClick={() => setGranularity('detailed')}
            className={`p-4 rounded-xl border ${granularity === 'detailed' ? 'bg-[#F4F7F9] border-transparent' : 'bg-[#F8F9FA] border-transparent hover:border-gray-200'} cursor-pointer flex gap-3`}
          >
            <div className="mt-1 shrink-0">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${granularity === 'detailed' ? 'border-blue-500' : 'bg-white border-gray-300'}`}>
                {granularity === 'detailed' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Detailed Student Roster Breakdown</h3>
              <p className="text-xs text-gray-500 mt-0.5">Full individual breakdown row-by-row for all 146 learners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
