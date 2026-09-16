import { teacherOverview } from '../data/teacherOverviewData';

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
    return new TeacherOverviewModel(teacherOverview);
  }
}

function buildGreeting(name) {
  const hour = (new Date().getUTCHours() + 3) % 24;
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}`;
}
