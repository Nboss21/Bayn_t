import React from 'react';
import ProgramsHeader from '../../components/super-admin/programs/ProgramsHeader';
import ProgramsFilters from '../../components/super-admin/programs/ProgramsFilters';
import ProgramsTable from '../../components/super-admin/programs/ProgramsTable';

export default function SuperAdminPrograms() {
  return (
    <div className="max-w-7xl mx-auto">
      <ProgramsHeader />
      <ProgramsFilters />
      <ProgramsTable />
    </div>
  );
}
