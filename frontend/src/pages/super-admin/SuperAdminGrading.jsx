import React from 'react';
import AssessmentCategories from '../../components/super-admin/grading/AssessmentCategories';
import CurrentGradingSetup from '../../components/super-admin/grading/CurrentGradingSetup';
import ExampleCalculation from '../../components/super-admin/grading/ExampleCalculation';

export default function SuperAdminGrading() {
  return (
    <div className="p-8 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] mb-1">Grading</h1>
          <p className="text-[15px] text-[#6b7280]">Configure how student assessments contribute to final results.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-[#ecfdf5] px-2.5 py-1 rounded-full border border-[#d1fae5]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
            <span className="text-xs font-semibold text-[#10b981] pr-1">Active</span>
          </div>
          <button className="bg-[#27272a] hover:bg-[#18181b] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Assessment Categories */}
        <div className="lg:col-span-2">
          <AssessmentCategories />
        </div>

        {/* Right Column - Setup & Example */}
        <div className="space-y-6">
          <CurrentGradingSetup />
          <ExampleCalculation />
        </div>
      </div>
    </div>
  );
}
