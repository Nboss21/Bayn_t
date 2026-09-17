import React, { useState } from 'react';
import ProgramsHeader from '../../components/super-admin/programs/ProgramsHeader';
import ProgramsFilters from '../../components/super-admin/programs/ProgramsFilters';
import ProgramsTable from '../../components/super-admin/programs/ProgramsTable';
import ProgramsPagination from '../../components/super-admin/programs/ProgramsPagination';
import useSuperAdminPrograms from '../../hooks/useSuperAdminPrograms';

function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e5e7eb]">
          <thead className="bg-[#f9fafb]">
            <tr>
              {['Program', 'Level', 'Duration', 'Status', 'Current Intake', 'Last Updated', 'Action'].map((label) => (
                <th key={label} className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] tracking-wider uppercase">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#e5e7eb]">
            {Array.from({ length: 4 }, (_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="h-4 w-48 bg-[#f3f4f6] rounded animate-pulse" />
                  <div className="h-3 w-20 bg-[#f3f4f6] rounded mt-1.5 animate-pulse" />
                </td>
                <td className="px-6 py-4"><div className="h-6 w-20 bg-[#f3f4f6] rounded-full animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-4 w-14 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-6 w-16 bg-[#f3f4f6] rounded-full animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-4 w-16 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-4 w-20 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-8 w-16 bg-[#f3f4f6] rounded ml-auto animate-pulse" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SuperAdminPrograms() {
  const { programsModel, loading } = useSuperAdminPrograms();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);

  if (loading || !programsModel) {
    return (
      <div className="w-full">
        <ProgramsHeader activeCount={0} />
        <ProgramsFilters statuses={[]} levels={[]} sorts={[]} />
        <SkeletonTable />
      </div>
    );
  }

  const result = programsModel.query({ search, status, level, sort, page });

  const applySearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const applyStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  const applyLevel = (value) => {
    setLevel(value);
    setPage(1);
  };

  const applySort = (value) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('All');
    setLevel('All');
    setPage(1);
  };

  return (
    <div className="w-full">
      <ProgramsHeader
        title={programsModel.header.title}
        description={programsModel.header.description}
        activeCount={programsModel.activeCount}
        activeLabel={programsModel.header.activeCountLabel}
        addProgramPath={programsModel.header.addProgramPath}
      />

      <ProgramsFilters
        searchValue={search}
        onSearchChange={applySearch}
        searchPlaceholder={programsModel.filters.searchPlaceholder}
        statuses={programsModel.filters.statuses}
        status={status}
        onStatusChange={applyStatus}
        levels={programsModel.filters.levels}
        level={level}
        onLevelChange={applyLevel}
        sorts={programsModel.filters.sorts}
        sort={sort}
        onSortChange={applySort}
        onClearFilters={clearFilters}
      />

      <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
        <ProgramsTable rows={result.rows} viewPathPrefix={programsModel.header.viewPathPrefix} />

        <ProgramsPagination
          currentPage={result.page}
          totalPages={result.pageCount}
          totalCount={result.total}
          perPage={result.perPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}