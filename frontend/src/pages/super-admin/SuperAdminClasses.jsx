import React, { useState } from 'react';
import ClassesPageHeader from '../../components/super-admin/classes-intakes/ClassesPageHeader';
import ClassesStatCards from '../../components/super-admin/classes-intakes/ClassesStatCards';
import ClassesFilters from '../../components/super-admin/classes-intakes/ClassesFilters';
import ClassesTable from '../../components/super-admin/classes-intakes/ClassesTable';
import ClassesPagination from '../../components/super-admin/classes-intakes/ClassesPagination';
import useSuperAdminClasses from '../../hooks/useSuperAdminClasses';

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
          <div className="h-3 w-24 bg-[#f3f4f6] rounded animate-pulse"></div>
          <div className="h-9 w-12 bg-[#f3f4f6] rounded mt-4 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              {['Class', 'Program', 'Intake', 'Schedule', 'Capacity', 'Status', 'Action'].map((label) => (
                <th key={label} className="px-6 py-4">
                  <div className="h-3 w-16 bg-[#f3f4f6] rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                <td className="px-6 py-5">
                  <div className="h-4 w-32 bg-[#f3f4f6] rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-[#f3f4f6] rounded mt-1.5 animate-pulse"></div>
                </td>
                <td className="px-6 py-5"><div className="h-4 w-40 bg-[#f3f4f6] rounded animate-pulse"></div></td>
                <td className="px-6 py-5"><div className="h-4 w-24 bg-[#f3f4f6] rounded animate-pulse"></div></td>
                <td className="px-6 py-5"><div className="h-4 w-32 bg-[#f3f4f6] rounded animate-pulse"></div></td>
                <td className="px-6 py-5"><div className="h-4 w-28 bg-[#f3f4f6] rounded animate-pulse"></div></td>
                <td className="px-6 py-5"><div className="h-6 w-20 bg-[#f3f4f6] rounded-full animate-pulse"></div></td>
                <td className="px-6 py-5"><div className="h-8 w-16 bg-[#f3f4f6] rounded ml-auto animate-pulse"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SuperAdminClasses() {
  const { classesModel, loading } = useSuperAdminClasses();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [program, setProgram] = useState('All');
  const [intake, setIntake] = useState('All');
  const [sort, setSort] = useState('name-asc');
  const [page, setPage] = useState(1);

  if (loading || !classesModel) {
    return (
      <div className="w-full py-2">
        <ClassesPageHeader activeCount={0} />
        <div className="mt-8"><SkeletonCards /></div>
        <div className="mt-6"><ClassesFilters statuses={[]} programs={[]} intakes={[]} sorts={[]} /></div>
        <div className="mt-4"><SkeletonTable /></div>
      </div>
    );
  }

  const result = classesModel.query({ search, status, program, intake, sort, page });

  const applySearch = (value) => { setSearch(value); setPage(1); };
  const applyStatus = (value) => { setStatus(value); setPage(1); };
  const applyProgram = (value) => { setProgram(value); setPage(1); };
  const applyIntake = (value) => { setIntake(value); setPage(1); };
  const applySort = (value) => { setSort(value); setPage(1); };
  const clearFilters = () => {
    setSearch('');
    setStatus('All');
    setProgram('All');
    setIntake('All');
    setPage(1);
  };

  return (
    <div className="w-full py-2">
      <ClassesPageHeader
        title={classesModel.header.title}
        description={classesModel.header.description}
        activeCount={classesModel.activeCount}
        activeLabel={classesModel.header.activeCountLabel}
        addClassPath={classesModel.header.addClassPath}
      />

      <div className="mt-8">
        <ClassesStatCards
          statCards={classesModel.statCards || []}
          active={classesModel.activeCount}
          upcoming={classesModel.upcomingCount}
          atCapacity={classesModel.atCapacityCount}
        />
      </div>

      <div className="mt-6">
        <ClassesFilters
          searchValue={search}
          onSearchChange={applySearch}
          searchPlaceholder={classesModel.filters.searchPlaceholder}
          statuses={classesModel.statuses}
          status={status}
          onStatusChange={applyStatus}
          programs={classesModel.programs}
          program={program}
          onProgramChange={applyProgram}
          intakes={classesModel.intakes}
          intake={intake}
          onIntakeChange={applyIntake}
          sorts={classesModel.filters.sorts}
          sort={sort}
          onSortChange={applySort}
          onClearFilters={clearFilters}
        />
      </div>

      <div className="mt-4">
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          <ClassesTable rows={result.rows} viewPathPrefix={classesModel.header.viewPathPrefix} />
          <ClassesPagination
            currentPage={result.page}
            totalPages={result.pageCount}
            totalCount={result.total}
            perPage={result.perPage}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}