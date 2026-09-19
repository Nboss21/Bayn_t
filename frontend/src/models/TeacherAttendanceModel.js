import { teacherService } from '../services/applicationService';

const scheduleLabel = (schedule) => typeof schedule === 'string' ? schedule : schedule?.label || schedule?.description || (schedule ? Object.values(schedule).filter(Boolean).join(' · ') : 'Schedule not set');

export default class TeacherAttendanceModel {
  constructor(data) {
    this.data = data;
    this.header = data.header;
    this.classInfo = data.classInfo;
    this.initialStudents = data.students;
    this.footer = data.footer;
    this.totalStudents = data.students.length;
  }

  static async fetch(classId = null, date = new Date().toISOString().slice(0, 10)) {
    const classesResponse = await teacherService.classes({ per_page: 100 });
    const classRows = classesResponse?.data || classesResponse || [];
    const classItem = classRows.find((item) => String(item.id) === String(classId)) || classRows[0];
    if (!classItem) return new TeacherAttendanceModel({ header: { title: 'Attendance', subtitle: 'No assigned class.' }, classInfo: {}, students: [], footer: {} });
    const response = await teacherService.classAttendance(classItem.id, { date });
    const data = response?.data || response || {};
    const students = (data.students || []).map((item) => ({
      id: item.student?.id,
      name: item.student?.name || 'Unnamed student',
      initials: (item.student?.name || '').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      station: '',
      studentId: `STU-${item.student?.id}`,
      status: item.attendance?.status ? item.attendance.status.charAt(0).toUpperCase() + item.attendance.status.slice(1) : 'Unmarked',
      note: item.attendance?.note || '',
    }));
    const model = new TeacherAttendanceModel({
      header: { title: 'Attendance', subtitle: `Record attendance for ${classItem.name}.`, classId: classItem.id, date: data.date },
      classInfo: { name: classItem.name, program: classItem.program?.name || 'Program', cohort: classItem.intake?.name || 'Current intake', schedule: scheduleLabel(classItem.schedule) },
      students,
      footer: { discardPath: '/teacher/overview' },
    });
    model.availableClasses = classRows.map((item) => ({ id: item.id, name: item.name, program: item.program?.name || 'Program' }));
    return model;
  }
}
