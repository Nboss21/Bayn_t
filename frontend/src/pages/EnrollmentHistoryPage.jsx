import React from 'react';
import EnrollmentHistoryHeader from '../components/enrollment/EnrollmentHistoryHeader';
import EnrollmentHistoryFilterBar from '../components/enrollment/EnrollmentHistoryFilterBar';
import EnrollmentHistoryTable from '../components/enrollment/EnrollmentHistoryTable';
import EnrollmentHistoryPagination from '../components/enrollment/EnrollmentHistoryPagination';

export default function EnrollmentHistoryPage() {
  return (
    <div className="flex flex-col h-full">
      <EnrollmentHistoryHeader />
      <EnrollmentHistoryFilterBar />
      <EnrollmentHistoryTable />
      <EnrollmentHistoryPagination />
    </div>
  );
}
