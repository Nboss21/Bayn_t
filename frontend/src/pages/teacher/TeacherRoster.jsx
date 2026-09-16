import React, { useState, useMemo } from 'react';
import RosterClassInfo from '../../components/teacher/roster/RosterClassInfo';
import RosterAttendanceBanner from '../../components/teacher/roster/RosterAttendanceBanner';
import RosterStatsBar from '../../components/teacher/roster/RosterStatsBar';
import RosterSearchBar, { RosterSearchInput } from '../../components/teacher/roster/RosterSearchBar';
import RosterTable, { studentsData } from '../../components/teacher/roster/RosterTable';
import RosterPagination from '../../components/teacher/roster/RosterPagination';

const TeacherRoster = () => {
  const [activeTab, setActiveTab] = useState('All (18)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    let list = studentsData;

    // Filter by tab
    if (activeTab === 'Needs Attention (2)') {
      list = list.filter((s) => s.status === 'Needs Attention');
    } else if (activeTab === 'On Track (16)') {
      list = list.filter((s) => s.status === 'On Track');
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  return (
    <div className="pt-6 pb-16">
      <RosterClassInfo />
      <RosterAttendanceBanner />
      <RosterStatsBar />

      <div className="mt-8">
        <RosterSearchBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <RosterSearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <RosterTable students={filteredStudents} />
        <RosterPagination total={studentsData.length} showing={filteredStudents.length} />
      </div>
    </div>
  );
};

export default TeacherRoster;

