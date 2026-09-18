import { teacherService } from '../services/applicationService';

const scheduleLabel = (schedule) => typeof schedule === 'string' ? schedule : schedule?.label || schedule?.description || (schedule ? Object.values(schedule).filter(Boolean).join(' · ') : 'Schedule not set');

export default class TeacherClassesModel {
  constructor(data) {
    this.data = data;
    this.pageTitle = data.pageTitle;
    this.pageSubtitle = data.pageSubtitle;
    this.filters = data.filters;
    this.attentionBanner = data.attentionBanner;
    this.classes = data.classes;
    this.assignedCount = data.classes.length;
    this.programs = data.filters.programs;
    this.intakes = data.filters.intakes;
    this.statuses = data.filters.statuses;
    this.sortOptions = data.filters.sortOptions;
  }

  static async fetch() {
    const response = await teacherService.classes({ per_page: 100 });
    const classes = (response?.data || response || []).map((item) => ({
      id: item.id,
      program: item.program?.name || 'Unassigned',
      title: item.name,
      date: item.intake?.name || 'Current intake',
      time: scheduleLabel(item.schedule),
      studentsCount: item.enrolled_count ?? 0,
      totalStudents: item.capacity ?? 0,
      seatsAvailable: item.available_capacity ?? Math.max(0, (item.capacity ?? 0) - (item.enrolled_count ?? 0)),
      isFull: (item.available_capacity ?? 0) <= 0,
      status: item.intake?.status === 'upcoming' ? 'Upcoming' : 'Assigned',
      path: '/teacher/classes',
    }));
    return new TeacherClassesModel({
      pageTitle: 'Classes',
      pageSubtitle: 'View the classes assigned to you and their current capacity.',
      attentionBanner: { eyebrow: 'Classroom tasks', title: 'Keep your assigned classes up to date.', description: 'Open a class to view its students and classroom tasks.', actionText: 'View classes', path: '/teacher/classes' },
      classes,
      filters: {
      searchPlaceholder: 'Search classes or programs...',
      sortOptions: [{ value: 'Schedule', label: 'Schedule' }, { value: 'Students', label: 'Students' }, { value: 'Availability', label: 'Availability' }],
      programs: [...new Set(classes.map((item) => item.program))],
      intakes: [...new Set(classes.map((item) => item.date))],
      statuses: [...new Set(classes.map((item) => item.status))],
    } });
  }
}