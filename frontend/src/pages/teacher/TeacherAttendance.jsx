import React, { useState, useMemo, useCallback } from 'react';
import TeacherAttendanceHeader from '../../components/teacher/TeacherAttendanceHeader';
import TeacherAttendanceClassInfo from '../../components/teacher/TeacherAttendanceClassInfo';
import TeacherAttendanceStats from '../../components/teacher/TeacherAttendanceStats';
import TeacherAttendanceControls from '../../components/teacher/TeacherAttendanceControls';
import TeacherAttendanceTable from '../../components/teacher/TeacherAttendanceTable';
import TeacherAttendanceFooter from '../../components/teacher/TeacherAttendanceFooter';
import useTeacherAttendance from '../../hooks/useTeacherAttendance';
import { teacherService } from '../../services/applicationService';
import TeacherClassSelector from '../../components/teacher/TeacherClassSelector';

const getSelectedDate = (date) => {
  if (!date) return '';
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getTodayIso = () => {
  const today = new Date();
  return [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
};

const TeacherAttendance = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayIso);
  const { attendanceModel, loading } = useTeacherAttendance(selectedClassId, selectedDate);

  React.useEffect(() => {
    if (!selectedClassId && attendanceModel?.availableClasses?.[0]) setSelectedClassId(attendanceModel.availableClasses[0].id);
  }, [attendanceModel, selectedClassId]);

  const [students, setStudents] = useState([]);
  const [originalStudents, setOriginalStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  React.useEffect(() => {
    if (attendanceModel) {
      const initial = [...attendanceModel.initialStudents];
      setStudents(initial);
      setOriginalStudents(JSON.parse(JSON.stringify(initial)));
    }
  }, [attendanceModel]);

  const stats = useMemo(() => {
    const counts = { present: 0, absent: 0, late: 0, excused: 0, unmarked: 0 };
    students.forEach((s) => {
      const key = s.status.toLowerCase();
      if (key in counts) counts[key]++;
    });
    return { total: students.length, ...counts };
  }, [students]);

  const filterCounts = useMemo(() => {
    const counts = { all: students.length, present: 0, absent: 0, late: 0, unmarked: 0 };
    students.forEach((s) => {
      const key = s.status.toLowerCase();
      if (key in counts) counts[key]++;
    });
    return counts;
  }, [students]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(students) !== JSON.stringify(originalStudents);
  }, [students, originalStudents]);

  const filteredStudents = useMemo(() => {
    let result = [...students];

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
  }, [students, searchQuery, activeFilter]);

  const handleStatusChange = useCallback((studentId, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
  }, []);

  const handleNoteChange = useCallback((studentId, note) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, note } : s))
    );
  }, []);

  const handlePresentByDefault = useCallback(() => {
    setStudents((prev) =>
      prev.map((s) => (s.status === 'Unmarked' ? { ...s, status: 'Present' } : s))
    );
  }, []);

  const handleDiscard = useCallback(() => {
    setStudents(JSON.parse(JSON.stringify(originalStudents)));
    setSearchQuery('');
    setActiveFilter('All');
  }, [originalStudents]);

  const handleDateChange = useCallback((date) => {
    if (hasChanges && !window.confirm('You have unsaved attendance changes. Change date and discard them?')) return;
    setSelectedDate(date);
  }, [hasChanges]);

  const handleSave = useCallback(async () => {
    if (!attendanceModel?.header?.classId) return;
    await teacherService.bulkAttendance(attendanceModel.header.classId, {
      date: attendanceModel.header.date || new Date().toISOString().slice(0, 10),
      records: students.filter((student) => student.status !== 'Unmarked').map((student) => ({
        student_id: student.id,
        status: student.status.toLowerCase(),
        note: student.note || null,
      })),
    });
    setOriginalStudents(JSON.parse(JSON.stringify(students)));
  }, [attendanceModel, students]);

  if (loading || !attendanceModel) {
    return (
      <div className="relative min-h-screen pb-24">
        <div className="h-10 w-40 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-100 rounded mb-8 animate-pulse"></div>
        <div className="h-12 w-full bg-gray-100 rounded-xl mb-8 animate-pulse"></div>
        <div className="grid grid-cols-6 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-24">
      <TeacherClassSelector classes={attendanceModel.availableClasses} value={selectedClassId} onChange={setSelectedClassId} />
      <TeacherAttendanceHeader
        header={attendanceModel.header}
        selectedDate={getSelectedDate(attendanceModel.header.date)}
        hasChanges={hasChanges}
        onDateChange={handleDateChange}
      />

      <TeacherAttendanceClassInfo
        classInfo={attendanceModel.classInfo}
        totalStudents={stats.total}
      />

      <TeacherAttendanceStats stats={stats} />

      <TeacherAttendanceControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterCounts={filterCounts}
        onPresentByDefault={handlePresentByDefault}
      />

      <div className="mb-6">
        <TeacherAttendanceTable
          students={filteredStudents}
          onStatusChange={handleStatusChange}
          onNoteChange={handleNoteChange}
        />
      </div>

      <TeacherAttendanceFooter
        unmarkedCount={stats.unmarked}
        hasChanges={hasChanges}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />
    </div>
  );
};

export default TeacherAttendance;
