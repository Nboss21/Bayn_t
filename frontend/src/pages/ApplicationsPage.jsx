import React, { useMemo, useState } from 'react';
import ApplicationsHeader from '../components/ApplicationsHeader';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationsFilterBar from '../components/ApplicationsFilterBar';
import Pagination from '../components/Pagination';
import useApplications from '../hooks/useApplications';

const STATUS_ORDER = ['Needs Review', 'Awaiting Information', 'Approved', 'Rejected'];

const ApplicationsPage = () => {
  const { applications, loading } = useApplications();
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const statusOptions = useMemo(() => {
    if (!applications) return [];
    return [
      { value: 'All', label: `All Applications (${applications.total})`, count: applications.total, showBadge: false },
      ...STATUS_ORDER.filter((s) => applications.statusCounts[s]).map((s) => ({
        value: s,
        label: s === 'Needs Review' ? s : `${s} (${applications.statusCounts[s]})`,
        count: applications.statusCounts[s],
        showBadge: s === 'Needs Review',
      })),
    ];
  }, [applications]);

  if (loading || !applications) {
    return (
      <div className="flex flex-col h-full bg-[#fafafa]">
        <div className="h-8 w-48 bg-gray-200 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-72 bg-gray-200 rounded mb-8 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="flex-1 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const result = applications.query({ status: status ?? 'All', search, page });

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const resetFilters = () => {
    setStatus(null);
    setSearch('');
    setPage(1);
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      <ApplicationsHeader
        statusOptions={statusOptions}
        activeStatus={status ?? 'All'}
        onStatusChange={handleStatusChange}
      />
      <ApplicationsFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        statusOptions={statusOptions}
        activeStatus={status ?? 'All'}
        onStatusChange={handleStatusChange}
        onReset={resetFilters}
      />
      <ApplicationsTable rows={result.rows} />
      <Pagination
        from={result.from}
        to={result.to}
        total={result.total}
        page={result.page}
        pageCount={result.pageCount}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ApplicationsPage;