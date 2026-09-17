import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EnrollmentHistoryHeader from '../components/enrollment/EnrollmentHistoryHeader';
import EnrollmentHistoryFilterBar from '../components/enrollment/EnrollmentHistoryFilterBar';
import EnrollmentHistoryTable from '../components/enrollment/EnrollmentHistoryTable';
import EnrollmentHistoryPagination from '../components/enrollment/EnrollmentHistoryPagination';
import useEnrollmentHistory from '../hooks/useEnrollmentHistory';

export default function EnrollmentHistoryPage() {
  const { model, loading } = useEnrollmentHistory();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [program, setProgram] = useState('All');
  const [intake, setIntake] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    if (!model) return { rows: [], total: 0, from: 0, to: 0, page: 1, pageCount: 1 };
    return model.query({ search, program, intake, status, page });
  }, [model, search, program, intake, status, page]);

  const handleView = (record) => {
    navigate(`/registrar/students/${record.studentId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[14px] text-[#6b7280]">Loading enrollment history...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <EnrollmentHistoryHeader />
      <EnrollmentHistoryFilterBar
        search={search}
        onSearchChange={setSearch}
        program={program}
        onProgramChange={setProgram}
        intake={intake}
        onIntakeChange={setIntake}
        status={status}
        onStatusChange={setStatus}
        programs={model.programs}
        intakes={model.intakes}
        statuses={model.statuses}
        onReset={() => {
          setSearch('');
          setProgram('All');
          setIntake('All');
          setStatus('All');
          setPage(1);
        }}
      />
      <EnrollmentHistoryTable rows={result.rows} onView={handleView} />
      <EnrollmentHistoryPagination
        from={result.from}
        to={result.to}
        total={result.total}
        page={result.page}
        pageCount={result.pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
