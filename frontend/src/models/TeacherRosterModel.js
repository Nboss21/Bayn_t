import { teacherService } from '../services/applicationService';

export default class TeacherRosterModel {
  constructor({ classInfo, attendanceBanner, students }) {
    this.classInfo = classInfo;
    this.attendanceBanner = attendanceBanner;
    this.students = students;
  }

  static async fetch(classId = null) {
    const classesResponse = await teacherService.classes({ per_page: 100 });
    const classRows = classesResponse?.data || classesResponse || [];
    const classItem = classRows.find((item) => String(item.id) === String(classId)) || classRows[0];
    const [studentsResponse, attendanceResponse, assessmentsResponse] = await Promise.all([
      teacherService.students({ per_page: 100, class_id: classItem?.id }),
      teacherService.attendance({ per_page: 100, class_id: classItem?.id }),
      teacherService.assessments({ per_page: 100, class_id: classItem?.id }),
    ]);
    const attendance = attendanceResponse?.data || attendanceResponse || [];
    const assessments = assessmentsResponse?.data || assessmentsResponse || [];
    const students = (studentsResponse?.data || studentsResponse || []).map((student) => {
      const studentAttendance = attendance.filter((record) => record.student_id === student.id);
      const studentAssessments = assessments.filter((record) => record.student_id === student.id);
      const attendanceDetails = {
        present: studentAttendance.filter((record) => record.status === 'present').length,
        absent: studentAttendance.filter((record) => record.status === 'absent').length,
        excused: studentAttendance.filter((record) => record.status === 'excused').length,
      };
      const attendanceTotal = Object.values(attendanceDetails).reduce((sum, value) => sum + value, 0);
      const attendancePercent = attendanceTotal ? Math.round(((attendanceDetails.present + studentAttendance.filter((record) => record.status === 'late').length) / attendanceTotal) * 100) : 0;
      const marksTotal = studentAssessments.length * 100;
      const marksScore = studentAssessments.reduce((sum, record) => sum + Number(record.raw_score || 0), 0);
      return new StudentRecord({
      id: student.id,
      name: student.name || 'Unnamed student',
      studentId: `STU-${student.id}`,
      status: attendancePercent >= 80 ? 'On Track' : 'Needs Attention',
      attendance: attendancePercent,
      marks: marksTotal ? Math.round((marksScore / marksTotal) * 100) : 0,
      attendanceDetails,
      marksDetails: studentAssessments.map((record) => ({ score: Number(record.raw_score || 0), total: 100 })),
      });
    });
    const model = new TeacherRosterModel({
      classInfo: classItem ? { name: classItem.name, program: classItem.program?.name || 'Program', cohort: classItem.intake?.name || 'Current intake' } : {},
      attendanceBanner: { eyebrow: 'Live roster', title: 'Student progress overview', description: 'Attendance and marks are calculated from recorded classroom data.' },
      students,
    });
    model.availableClasses = classRows.map((item) => ({ id: item.id, name: item.name, program: item.program?.name || 'Program' }));
    return model;
  }

  get totalStudents() {
    return this.students.length;
  }

  get onTrackCount() {
    return this.students.filter((s) => s.status === 'On Track').length;
  }

  get needsAttentionCount() {
    return this.students.filter((s) => s.status === 'Needs Attention').length;
  }

  get overallAttendance() {
    const sum = this.students.reduce((acc, s) => acc + s.attendance, 0);
    return this.students.length ? Math.round(sum / this.students.length) : 0;
  }

  get overallMarks() {
    const sum = this.students.reduce((acc, s) => acc + s.marks, 0);
    return this.students.length ? Math.round(sum / this.students.length) : 0;
  }

  get stats() {
    return {
      totalStudents: this.totalStudents,
      overallAttendance: this.overallAttendance,
      overallMarks: this.overallMarks,
      onTrackCount: this.onTrackCount,
      needsAttentionCount: this.needsAttentionCount,
    };
  }

  get tabs() {
    return [
      { label: `All (${this.totalStudents})`, value: 'all' },
      { label: `Needs Attention (${this.needsAttentionCount})`, value: 'attention' },
      { label: `On Track (${this.onTrackCount})`, value: 'track' },
    ];
  }

  getStudentById(id) {
    return this.students.find((s) => s.id === id) || null;
  }

  filterStudents(tab, searchQuery) {
    let list = [...this.students];

    if (tab === 'attention') {
      list = list.filter((s) => s.status === 'Needs Attention');
    } else if (tab === 'track') {
      list = list.filter((s) => s.status === 'On Track');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      );
    }

    return list;
  }
}

class StudentRecord {
  constructor(data) {
    Object.assign(this, data);
  }

  get attendanceTotalDays() {
    const d = this.attendanceDetails;
    return d.present + d.absent + d.excused;
  }

  get attendancePresentPct() {
    return Math.round((this.attendanceDetails.present / this.attendanceTotalDays) * 100);
  }

  get attendanceAbsentPct() {
    return Math.round((this.attendanceDetails.absent / this.attendanceTotalDays) * 100);
  }

  get attendanceExcusedPct() {
    return Math.round((this.attendanceDetails.excused / this.attendanceTotalDays) * 100);
  }

  get marksDetailsWithPct() {
    return this.marksDetails.map((m) => ({
      ...m,
      pct: Math.round((m.score / m.total) * 100),
    }));
  }

  get weightedScore() {
    return this.marksDetails.reduce((acc, m) => acc + m.score, 0);
  }

  get weightedTotal() {
    return this.marksDetails.reduce((acc, m) => acc + m.total, 0);
  }

  get weightedPct() {
    return Math.round((this.weightedScore / this.weightedTotal) * 100);
  }

  get attendanceNeedsAttention() {
    return this.attendance < 92;
  }
}
