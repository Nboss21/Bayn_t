import React from 'react';
import ApplicationsHeader from '../components/ApplicationsHeader';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationsFilterBar from '../components/ApplicationsFilterBar';
import Pagination from '../components/Pagination';

const ApplicationsPage = () => {
  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      <ApplicationsHeader />
      <ApplicationsFilterBar />
      <ApplicationsTable />
      <Pagination />
    </div>
  );
};

export default ApplicationsPage;
