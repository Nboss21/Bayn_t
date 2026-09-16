import React, { useState } from 'react';
import StudentsHeader from '../components/students/StudentsHeader';
import StudentsSearchBar from '../components/students/StudentsSearchBar';
import StudentsTable from '../components/students/StudentsTable';
import StudentsPagination from '../components/students/StudentsPagination';
import useStudents from '../hooks/useStudents';

function SkeletonTable() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              {['STUDENT', 'STUDENT ID', 'PROGRAM', 'INTAKE', 'CLASS', 'STATUS', 'ACTION'].map((label) => (
                <th key={label} className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i} className="border-b border-[#f3f4f6]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#f3f4f6] animate-pulse" />
                    <div className="h-3.5 w-28 bg-[#f3f4f6] rounded animate-pulse" />
                  </div>
                </td>
                <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-36 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-20 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-14 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-7 w-12 bg-[#f3f4f6] rounded animate-pulse" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  const { students, loading } = useStudents();
  const [search, setSearch] = useState('');
  const [program, setProgram] = useState(null);
  const [intake, setIntake] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <StudentsHeader totalCount={0} />
        <StudentsSearchBar
          searchValue=""
          onSearchChange={() => {}}
          programs={[]}
          intakes={[]}
          statuses={[]}
          program={null}
          intake={null}
          status={null}
          onProgramChange={() => {}}
          onIntakeChange={() => {}}
          onStatusChange={() => {}}
        />
        <SkeletonTable />
      </div>
    );
  }

  const result = students.query({ search, program, intake, status, page });

  const applySearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const applyProgram = (value) => {
    setProgram(value);
    setPage(1);
  };

  const applyIntake = (value) => {
    setIntake(value);
    setPage(1);
  };

  const applyStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col h-full">
      <StudentsHeader totalCount={students.total} />
      <StudentsSearchBar
        searchValue={search}
        onSearchChange={applySearch}
        programs={students.programs}
        intakes={students.intakes}
        statuses={students.statuses}
        program={program}
        intake={intake}
        status={status}
        onProgramChange={applyProgram}
        onIntakeChange={applyIntake}
        onStatusChange={applyStatus}
      />
      <StudentsTable rows={result.rows} />
      <StudentsPagination
        currentPage={result.page}
        totalPages={result.pageCount}
        totalCount={result.total}
        perPage={result.perPage}
        onPageChange={setPage}
      />
    </div>
  );
}