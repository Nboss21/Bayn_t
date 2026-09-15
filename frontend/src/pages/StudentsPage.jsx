import React, { useState } from 'react';
import StudentsHeader from '../components/students/StudentsHeader';
import StudentsSearchBar from '../components/students/StudentsSearchBar';
import StudentsTable from '../components/students/StudentsTable';
import StudentsPagination from '../components/students/StudentsPagination';

export default function StudentsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col h-full">
      <StudentsHeader totalCount={184} />
      <StudentsSearchBar searchValue={search} onSearchChange={setSearch} />
      <StudentsTable />
      <StudentsPagination
        currentPage={1}
        totalPages={31}
        totalCount={184}
        perPage={7}
      />
    </div>
  );
}
