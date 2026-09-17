import React, { useState, useMemo } from 'react';
import RosterClassInfo from '../../components/teacher/roster/RosterClassInfo';
import RosterAttendanceBanner from '../../components/teacher/roster/RosterAttendanceBanner';
import RosterStatsBar from '../../components/teacher/roster/RosterStatsBar';
import RosterSearchBar, { RosterSearchInput } from '../../components/teacher/roster/RosterSearchBar';
import RosterTable from '../../components/teacher/roster/RosterTable';
import RosterPagination from '../../components/teacher/roster/RosterPagination';
import useTeacherRoster from '../../hooks/useTeacherRoster';

const PAGE_SIZE = 10;

const TeacherRoster = () => {
  const { rosterModel, loading } = useTeacherRoster();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    if (!rosterModel) return [];
    return rosterModel.filterStudents(activeTab, searchQuery);
  }, [rosterModel, activeTab, searchQuery]);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (loading || !rosterModel) {
    return (
      <div className="pb-16">
        <div className="h-8 w-40 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-24 w-full bg-gray-100 rounded-xl mb-6 animate-pulse"></div>
        <div className="grid grid-cols-4 gap-0 h-28 bg-gray-100 rounded-xl mb-6 animate-pulse"></div>
        <div className="h-10 w-80 bg-gray-100 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-12 w-full bg-gray-100 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-80 w-full bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <RosterClassInfo classInfo={rosterModel.classInfo} />
      <RosterAttendanceBanner banner={rosterModel.attendanceBanner} />
      <RosterStatsBar stats={rosterModel.stats} />

      <div className="mt-8">
        <RosterSearchBar
          tabs={rosterModel.tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <RosterSearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <RosterTable students={paginatedStudents} />
        <RosterPagination
          total={filteredStudents.length}
          showing={paginatedStudents.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TeacherRoster;