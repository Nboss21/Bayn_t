import React from 'react';
import ClassesPageHeader from '../../components/super-admin/classes-intakes/ClassesPageHeader';
import ClassesStatCards from '../../components/super-admin/classes-intakes/ClassesStatCards';
import ClassesFilters from '../../components/super-admin/classes-intakes/ClassesFilters';
import ClassesTable from '../../components/super-admin/classes-intakes/ClassesTable';

export default function SuperAdminClasses() {
  return (
    <div className="max-w-[1200px] mx-auto py-2">
      <ClassesPageHeader />
      <div className="mt-8">
        <ClassesStatCards />
      </div>
      <div className="mt-6">
        <ClassesFilters />
      </div>
      <div className="mt-4">
        <ClassesTable />
      </div>
    </div>
  );
}
