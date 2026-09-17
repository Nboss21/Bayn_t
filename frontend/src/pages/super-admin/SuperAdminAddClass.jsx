import React from 'react';
import { Link } from 'react-router-dom';
import AddClassIdentityForm from '../../components/super-admin/classes-intakes/AddClassIdentityForm';
import AddClassTimetableForm from '../../components/super-admin/classes-intakes/AddClassTimetableForm';
import AddClassEnrollmentForm from '../../components/super-admin/classes-intakes/AddClassEnrollmentForm';
import AddClassPreviewSidebar from '../../components/super-admin/classes-intakes/AddClassPreviewSidebar';

export default function SuperAdminAddClass() {
  return (
    <div className="max-w-[1040px] mx-auto w-full pb-12">
      {/* Header Section */}
      <div className="mb-6">
        <Link 
          to="/super-admin/classes" 
          className="text-[#6b7280] text-[13px] hover:text-[#1a1a1a] transition-colors mb-4 inline-block"
        >
          ← Back to Classes & Intakes
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[26px] font-semibold text-[#1a1a1a] mb-1.5">Add Class</h1>
            <p className="text-[#6b7280] text-[14px]">
              Configure a new academy cohort timetable, assigned master educator, and studio capacity threshold.
            </p>
          </div>
          <div className="bg-white border border-[#e5e7eb] px-3.5 py-1.5 rounded-md shadow-sm">
            <span className="text-[#6b7280] text-[12px]">Draft ID: </span>
            <span className="text-[#1a1a1a] text-[12px] font-semibold">CLS-2025-084</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Main Form Column */}
        <div>
          <AddClassIdentityForm />
          <AddClassTimetableForm />
          <AddClassEnrollmentForm />
        </div>

        {/* Sidebar Column */}
        <div>
          <AddClassPreviewSidebar />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[#e5e7eb]">
        <Link 
          to="/super-admin/classes"
          className="px-6 py-2.5 rounded-md border border-[#d1d5db] text-[#4b5563] text-[14px] font-medium bg-white hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button className="px-6 py-2.5 rounded-md bg-[#2a2a2a] text-white text-[14px] font-medium hover:bg-[#1a1a1a] transition-colors">
          Create Class
        </button>
      </div>
    </div>
  );
}
