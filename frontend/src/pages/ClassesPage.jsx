import React from 'react';
import ClassesHeader from '../components/ClassesHeader';
import ClassesFilterBar from '../components/ClassesFilterBar';
import ClassesTable from '../components/ClassesTable';
import ClassesPagination from '../components/ClassesPagination';

const ClassesPage = () => {
  return (
    <div className="flex flex-col h-full">
      <ClassesHeader />
      <ClassesFilterBar />
      <ClassesTable />
      <ClassesPagination />
    </div>
  );
};

export default ClassesPage;
