import React from 'react';

export default function GenerateReportHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Generate Report</h1>
        <span className="bg-[#F4DDC4] text-[#A66023] text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
          Draft Configuration
        </span>
        <span className="bg-[#F0F0F0] text-gray-600 text-[10px] font-mono px-2 py-1 rounded tracking-widest uppercase">
          ID: REP-2026-080
        </span>
      </div>
      
      <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-4">
        <p className="text-gray-500 text-sm max-w-3xl">
          Configure parameters, cohort filters, data dimensions, and export formatting for operational atelier school reporting.
        </p>
        
        <div className="bg-[#F4F2EE] px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-gray-100">
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-xs font-medium text-gray-800">BABTAC Accredited Output</span>
        </div>
      </div>
    </div>
  );
}
