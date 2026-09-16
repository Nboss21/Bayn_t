import { rosterClassInfo, rosterAttendanceBanner, studentsData } from '../data/teacherRosterData';

export default class TeacherRosterModel {
  constructor({ classInfo, attendanceBanner, students }) {
    this.classInfo = classInfo;
    this.attendanceBanner = attendanceBanner;
    this.students = students;
  }

  static async fetch() {
    const students = studentsData.map((s) => new StudentRecord(s));
    return new TeacherRosterModel({
      classInfo: rosterClassInfo,
      attendanceBanner: rosterAttendanceBanner,
      students,
    });
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
    return Math.round(sum / this.students.length);
  }

  get overallMarks() {
    const sum = this.students.reduce((acc, s) => acc + s.marks, 0);
    return Math.round(sum / this.students.length);
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