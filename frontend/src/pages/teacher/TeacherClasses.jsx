import React, { useState, useMemo } from 'react';
import TeacherClassesFilterBar from '../../components/teacher/TeacherClassesFilterBar';
import TeacherAttentionBanner from '../../components/teacher/TeacherAttentionBanner';
import TeacherClassCard from '../../components/teacher/TeacherClassCard';
import useTeacherClasses from '../../hooks/useTeacherClasses';

const TeacherClasses = () => {
  const { classesModel, loading } = useTeacherClasses();

  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('All Program');
  const [intakeFilter, setIntakeFilter] = useState('All Intake');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Schedule');

  const filteredClasses = useMemo(() => {
    if (!classesModel) return [];

    let result = [...classesModel.classes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (cls) =>
          cls.title.toLowerCase().includes(q) ||
          cls.program.toLowerCase().includes(q)
      );
    }

    if (programFilter !== 'All Program') {
      result = result.filter(
        (cls) => cls.program.toUpperCase() === programFilter.toUpperCase()
      );
    }

    if (intakeFilter !== 'All Intake') {
      result = result.filter((cls) => cls.date === intakeFilter);
    }

    if (statusFilter !== 'All') {
      result = result.filter((cls) => cls.status === statusFilter);
    }

    switch (sortBy) {
      case 'Students':
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'Availability':
        result.sort((a, b) => b.seatsAvailable - a.seatsAvailable);
        break;
      case 'Schedule':
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [classesModel, searchQuery, programFilter, intakeFilter, statusFilter, sortBy]);

  if (loading || !classesModel) {
    return (
      <div>
        <div className="h-10 w-48 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-80 bg-gray-100 rounded mb-10 animate-pulse"></div>
        <div className="h-12 w-[340px] bg-gray-100 rounded-xl mb-10 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[340px] bg-gray-100 rounded-[16px] animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-2">{classesModel.pageTitle}</h1>
          <p className="text-[15px] text-gray-500">{classesModel.pageSubtitle}</p>
        </div>
        <div className="bg-[#EEF1EB] text-[#4A5D4E] font-medium text-[13px] px-4 py-2 rounded-full">
          {classesModel.assignedCount} assigned classes
        </div>
      </div>

      {/* Filters */}
      <TeacherClassesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        programs={classesModel.programs}
        programFilter={programFilter}
        onProgramChange={setProgramFilter}
        intakes={classesModel.intakes}
        intakeFilter={intakeFilter}
        onIntakeChange={setIntakeFilter}
        statuses={classesModel.statuses}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOptions={classesModel.sortOptions}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Needs Attention Banner */}
      <TeacherAttentionBanner
        eyebrow={classesModel.attentionBanner.eyebrow}
        title={classesModel.attentionBanner.title}
        description={classesModel.attentionBanner.description}
        actionText={classesModel.attentionBanner.actionText}
        path={classesModel.attentionBanner.path}
      />

      {/* Classes Grid Section */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-1">Your assigned classes</h2>
          <p className="text-[14px] text-gray-500">Open a class to view its students and classroom tasks.</p>
        </div>

        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <TeacherClassCard
                key={cls.id}
                program={cls.program}
                title={cls.title}
                date={cls.date}
                time={cls.time}
                studentsCount={cls.studentsCount}
                totalStudents={cls.totalStudents}
                status={cls.status}
                seatsAvailable={cls.seatsAvailable}
                isFull={cls.isFull}
                path={cls.path}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm text-center">
            <p className="text-[15px] text-gray-500">No classes match your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setProgramFilter('All Program');
                setIntakeFilter('All Intake');
                setStatusFilter('All');
                setSortBy('Schedule');
              }}
              className="mt-4 text-[13px] font-medium text-[#4A5D4E] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherClasses;