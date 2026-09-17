import React from 'react';
import ProgramFormLayout from '../../components/super-admin/program-form/ProgramFormLayout';
import useSuperAdminPrograms from '../../hooks/useSuperAdminPrograms';

export default function SuperAdminProgramAdd() {
  const { programsModel, loading } = useSuperAdminPrograms();

  if (loading || !programsModel) {
    return (
      <div className="w-full">
        <div className="h-6 w-56 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <ProgramFormLayout
      mode="add"
      program={null}
      options={programsModel.formOptions}
      backPath="/super-admin/programs"
    />
  );
}