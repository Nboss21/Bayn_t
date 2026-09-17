import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import AddClassIdentityForm from '../../components/super-admin/classes-intakes/AddClassIdentityForm';
import AddClassTimetableForm from '../../components/super-admin/classes-intakes/AddClassTimetableForm';
import AddClassEnrollmentForm from '../../components/super-admin/classes-intakes/AddClassEnrollmentForm';
import AddClassPreviewSidebar from '../../components/super-admin/classes-intakes/AddClassPreviewSidebar';
import useSuperAdminClasses from '../../hooks/useSuperAdminClasses';

export default function SuperAdminAddClass() {
  const navigate = useNavigate();
  const { classesModel, loading } = useSuperAdminClasses();
  const [saved, setSaved] = useState(false);

  const handleCreate = () => {
    setSaved(true);
    window.setTimeout(() => navigate('/super-admin/classes'), 450);
  };

  if (loading || !classesModel) {
    return (
      <div className="w-full pb-12">
        <div className="h-16 bg-gray-100 rounded-xl mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  const addForm = classesModel.addForm;

  return (
    <div className="w-full pb-12">
      {/* Header Section */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/super-admin/classes')}
          className="text-[#6b7280] text-[13px] hover:text-[#1a1a1a] transition-colors mb-4 inline-flex items-center cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          Back to Classes & Intakes
        </button>
        <div className="flex justify-between items-end gap-4 flex-wrap">
          <div>
            <h1 className="text-[26px] font-semibold text-[#1a1a1a] mb-1.5">Add Class</h1>
            <p className="text-[#6b7280] text-[14px] max-w-2xl">
              {addForm.description}
            </p>
          </div>
          <div className="bg-white border border-[#e5e7eb] px-3.5 py-1.5 rounded-md shadow-sm">
            <span className="text-[#6b7280] text-[12px]">Draft ID: </span>
            <span className="text-[#1a1a1a] text-[12px] font-semibold">{addForm.draftId}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Main Form Column */}
        <div>
          <AddClassIdentityForm options={addForm.identity} />
          <AddClassTimetableForm options={addForm.timetable} />
          <AddClassEnrollmentForm options={addForm.enrollment} />
        </div>

        {/* Sidebar Column */}
        <div>
          <AddClassPreviewSidebar preview={addForm.preview} />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[#e5e7eb] items-center">
        <button
          onClick={() => navigate('/super-admin/classes')}
          className="px-6 py-2.5 rounded-md border border-[#d1d5db] text-[#4b5563] text-[14px] font-medium bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={saved}
          className="px-6 py-2.5 rounded-md bg-[#2a2a2a] text-white text-[14px] font-medium hover:bg-[#1a1a1a] transition-colors cursor-pointer inline-flex items-center gap-2 disabled:opacity-80"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Class Created
            </>
          ) : (
            'Create Class'
          )}
        </button>
      </div>
    </div>
  );
}