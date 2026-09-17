import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProgramInformationCard from '../../components/super-admin/program-edit/ProgramInformationCard';
import PublicProgramCard from '../../components/super-admin/program-edit/PublicProgramCard';
import ProgramOverviewCard from '../../components/super-admin/program-edit/ProgramOverviewCard';
import ProgramStatusCard from '../../components/super-admin/program-edit/ProgramStatusCard';
import CurrentIntakeCard from '../../components/super-admin/program-edit/CurrentIntakeCard';

export default function SuperAdminProgramEdit() {
  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-[#6b7280] mb-4">
          <Link to="/super-admin/programs" className="hover:text-[#111827] flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Programs
          </Link>
          <span className="mx-2 text-[#d1d5db]">•</span>
          <span>Academic Management Directory</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold text-[#111827] leading-tight">Professional Makeup Artistry</h1>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#ecfccb] text-[#3f6212] border border-[#d9f99d]">
                <span className="w-1.5 h-1.5 bg-[#65a30d] rounded-full mr-1.5"></span>
                Open
              </span>
            </div>
            <p className="text-[#6b7280] text-[15px] mt-1.5">View and update the program information.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          <ProgramInformationCard />
          <PublicProgramCard />
          <ProgramOverviewCard />
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          <ProgramStatusCard />
          <CurrentIntakeCard />
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end gap-3 pt-6">
        <button className="px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
