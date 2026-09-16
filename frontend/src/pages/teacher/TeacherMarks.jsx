import React, { useState, useMemo, useCallback } from 'react';
import TeacherMarksHeader from '../../components/teacher/TeacherMarksHeader';
import TeacherMarksClassInfo from '../../components/teacher/TeacherMarksClassInfo';
import TeacherMarksGradingWeight from '../../components/teacher/TeacherMarksGradingWeight';
import TeacherMarksTableSection from '../../components/teacher/TeacherMarksTableSection';
import TeacherMarksFooter from '../../components/teacher/TeacherMarksFooter';
import useTeacherMarks from '../../hooks/useTeacherMarks';
import { computeStats } from '../../utils/marks';

const TeacherMarks = () => {
  const { marksModel, loading } = useTeacherMarks();

  const [students, setStudents] = useState([]);
  const [originalStudents, setOriginalStudents] = useState([]);
  const [activeAssessmentId, setActiveAssessmentId] = useState('midterm');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  React.useEffect(() => {
    if (marksModel) {
      const initial = marksModel.initialStudents.map((s) => ({ ...s }));
      setStudents(initial);
      setOriginalStudents(JSON.parse(JSON.stringify(initial)));
    }
  }, [marksModel]);

  const { rows, stats } = useMemo(() => computeStats(students), [students]);

  const filterCounts = useMemo(() => ({
    all: students.length,
    complete: stats.complete,
    incomplete: stats.incomplete,
    notMarked: stats.notMarked,
  }), [students, stats]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(students) !== JSON.stringify(originalStudents);
  }, [students, originalStudents]);

  const filteredStudents = useMemo(() => {
    let result = [...rows];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== 'All') {
      result = result.filter((s) => s.status === activeFilter);
    }

    return result;
  }, [rows, searchQuery, activeFilter]);

  const handleInputChange = useCallback((studentId, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, [field]: value } : s))
    );
  }, []);

  const handleDiscard = useCallback(() => {
    setStudents(JSON.parse(JSON.stringify(originalStudents)));
    setActiveAssessmentId('midterm');
    setSearchQuery('');
    setActiveFilter('All');
  }, [originalStudents]);

  const handleSave = useCallback(() => {
    setOriginalStudents(JSON.parse(JSON.stringify(students)));
  }, [students]);

  if (loading || !marksModel) {
    return (
      <>
        <div className="h-8 w-32 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-100 rounded mb-8 animate-pulse"></div>
        <div className="h-16 w-full bg-gray-100 rounded-lg mb-6 animate-pulse"></div>
        <div className="h-28 w-full bg-gray-100 rounded-lg mb-6 animate-pulse"></div>
        <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse"></div>
      </>
    );
  }

  const totalMarked = stats.complete;
  const remainingCount = students.length - totalMarked;
  const activeAssessment = marksModel.assessmentById(activeAssessmentId);

  return (
    <>
      <TeacherMarksHeader
        header={marksModel.header}
        assessments={marksModel.assessments}
        activeAssessment={activeAssessmentId}
        onAssessmentChange={setActiveAssessmentId}
        hasChanges={hasChanges}
      />

      <TeacherMarksClassInfo
        classInfo={marksModel.classInfo}
        totalStudents={stats.total}
      />

      <TeacherMarksGradingWeight
        assessmentName={activeAssessment.name.replace(' Assessment', '')}
        categories={marksModel.categories}
        markedCount={totalMarked}
        totalStudents={stats.total}
      />

      <TeacherMarksTableSection
        assessmentName={activeAssessment.name}
        categories={marksModel.categories}
        students={filteredStudents}
        onInputChange={handleInputChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterCounts={filterCounts}
      />

      <TeacherMarksFooter
        remainingCount={remainingCount}
        hasChanges={hasChanges}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />
    </>
  );
};

export default TeacherMarks;