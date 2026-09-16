import { teacherAttendance } from '../data/teacherAttendanceData';

export default class TeacherAttendanceModel {
  constructor(data) {
    this.data = data;
    this.header = data.header;
    this.classInfo = data.classInfo;
    this.initialStudents = data.students;
    this.footer = data.footer;
    this.totalStudents = data.students.length;
  }

  static async fetch() {
    return new TeacherAttendanceModel(teacherAttendance);
  }
}