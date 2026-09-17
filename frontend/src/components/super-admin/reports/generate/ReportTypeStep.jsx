import React, { useState } from 'react';

export default function ReportTypeStep() {
  const [selectedType, setSelectedType] = useState('attendance');
  const [timeframe, setTimeframe] = useState('current');

  const reportTypes = [
    {
      id: 'attendance',
      title: 'Attendance & Engagement',
      description: 'Absence trends, studio seat clock-ins, time loss tallies, and tutor sign-offs.',
      checked: true
    },
    {
      id: 'academic',
      title: 'Academic Performance & Grades',
      description: 'Practical makeup technique scores, theory modules, and portfolio reviews.',
      checked: false
    },
    {
      id: 'capacity',
      title: 'Cohort Capacity & Studio Utilization',
      description: 'Mirror station occupancy, classroom load balancing, and educator ratios.',
      checked: false
    },
    {
      id: 'tuition',
      title: 'Tuition & Fee Payment Compliance',
      description: 'Kit deposit receipts, installment schedules, and bursary disbursements.',
      checked: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-[#E8F0E5] text-[#4E6154] flex items-center justify-center text-xs font-bold shrink-0">
            1
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Report Type & Data Domain</h2>
            <p className="text-xs text-gray-500 mt-1">Choose the core operational subject, historical timeframe, and calculation baseline</p>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-1">
          Step 1 of 3
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ml-10">
        {reportTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-4 rounded-xl border ${selectedType === type.id ? 'border-transparent bg-[#F4F7F9]' : 'border-gray-100 bg-white hover:border-gray-200'} cursor-pointer flex gap-3 transition-colors`}
          >
            <div className="mt-1">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedType === type.id ? 'border-blue-500' : 'border-gray-300'}`}>
                {selectedType === type.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">{type.title}</h3>
                {selectedType === type.id && (
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs text-gray-600 mb-2">Program Scope</label>
          <div className="relative">
            <select className="w-full appearance-none bg-[#F4F4F4] border border-transparent rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer">
              <option>All Academic Programs (Global Overview)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-2">Cohort / Intake Intake</label>
          <div className="relative">
            <select className="w-full appearance-none bg-[#F4F4F4] border border-transparent rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer">
              <option>All Active Cohorts (8 Cohorts, 146 Students)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10">
        <label className="block text-xs text-gray-600 mb-3">Historical Timeframe</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Current Term / Month', 'Last 30 Days', 'Academic Year 2025-2026', 'Custom Date Range'].map((tf, i) => (
            <button 
              key={tf}
              onClick={() => setTimeframe(i === 0 ? 'current' : tf.toLowerCase().replace(/ /g, '-'))}
              className={`px-4 py-1.5 rounded-full text-xs font-medium ${timeframe === (i === 0 ? 'current' : tf.toLowerCase().replace(/ /g, '-')) ? 'bg-[#556B59] text-white' : 'bg-[#F4F4F4] text-gray-600 hover:bg-gray-200'} transition-colors`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase text-gray-500 font-semibold mb-2">Period Start Date</label>
            <input 
              type="text" 
              defaultValue="09/01/2026"
              className="w-full bg-[#F4F4F4] border border-transparent rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-gray-500 font-semibold mb-2">Period End Date</label>
            <input 
              type="text" 
              defaultValue="09/30/2026"
              className="w-full bg-[#F4F4F4] border border-transparent rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
