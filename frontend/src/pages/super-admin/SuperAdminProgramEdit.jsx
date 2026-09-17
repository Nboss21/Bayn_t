import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgramFormLayout from '../../components/super-admin/program-form/ProgramFormLayout';
import useSuperAdminPrograms from '../../hooks/useSuperAdminPrograms';

export default function SuperAdminProgramEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { programsModel, loading } = useSuperAdminPrograms();

  if (loading || !programsModel) {
    return (
      <div className="w-full">
        <div className="h-6 w-56 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const program = programsModel.findById(id);

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-[16px] text-[#6b7280] mb-4">Program not found</p>
        <button
          onClick={() => navigate('/super-admin/programs')}
          className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          Back to Programs
        </button>
      </div>
    );
  }

  return (
    <ProgramFormLayout
      mode="edit"
      program={program}
      options={programsModel.formOptions}
      backPath="/super-admin/programs"
    />
  );
}