import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReportsHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Reports</h1>
        <p className="text-sm text-[#6b7280] mt-1">
          View key school activity and generate operational reports.
        </p>
      </div>

      <button 
        onClick={() => navigate('/super-admin/reports/generate')}
        className="inline-flex items-center justify-center gap-2 bg-[#1c1d1f] hover:bg-[#000000] text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Generate Report</span>
      </button>
    </div>
  );
}
