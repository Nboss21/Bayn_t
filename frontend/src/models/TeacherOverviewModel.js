import { teacherOverview } from '../data/teacherOverviewData';
import { teacherService } from '../services/applicationService';

export default class TeacherOverviewModel {
  constructor(data) {
    this.data = data;
    this.greeting = buildGreeting(data.user.name);
    this.stats = data.stats;
    this.attentionItems = data.attentionItems;
    this.attendanceChart = data.attendanceChart;
    this.classes = data.classes;
    this.assessmentProgress = data.assessmentProgress;
  }

  static async fetch() {
    const [dashboardResponse, classesResponse] = await Promise.all([
      teacherService.dashboard(),
      teacherService.classes({ per_page: 100 }),
    ]);
    const dashboard = dashboardResponse?.data || dashboardResponse || {};
    const classes = classesResponse?.data || classesResponse || [];
    const classRows = classes.map((item) => ({
      id: item.id,
      program: item.program?.name || 'Program',
      title: item.name,
      date: item.intake?.name || 'Current intake',
      time: item.schedule || 'Schedule not set',
      studentsCount: item.enrolled_count ?? item.students_count ?? 0,
      totalStudents: item.capacity ?? 0,
      seatsAvailable: item.available_capacity ?? 0,
      isFull: (item.available_capacity ?? 0) <= 0,
      status: 'Assigned',
      path: '/teacher/classes',
    }));
    const staticData = teacherOverview;
    const stats = staticData.stats.map((stat) => ({ ...stat }));
    stats.find((stat) => stat.id === 'classes').value = String(dashboard.classes_count ?? classRows.length);
    stats.find((stat) => stat.id === 'students').value = String(dashboard.student_count ?? 0);
    stats.find((stat) => stat.id === 'marks').value = String(dashboard.recent_assessment_count ?? 0);
    return new TeacherOverviewModel({
      ...staticData,
      stats,
      classes: classRows,
      attentionItems: staticData.attentionItems,
    });
  }
}

function buildGreeting(name) {
  const hour = (new Date().getUTCHours() + 3) % 24;
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}`;
}
