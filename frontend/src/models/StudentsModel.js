import { registrarService } from '../services/applicationService';

const DEFAULT_PER_PAGE = 7;

const makeInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const statusLabel = (status) => status ? status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') : 'Unknown';

const toTableRow = (student) => ({
  initials: makeInitials(student.user?.name),
  name: student.user?.name || 'Unnamed student',
  studentId: `STU-${student.id}`,
  resourceId: student.id,
  resourceId: student.id,
  program: student.application?.program?.name || 'Unassigned',
  intake: student.application?.intake?.name || '—',
  class: student.class?.name || 'Unassigned',
  status: statusLabel(student.status),
  highlightAction: student.status === 'completed',
});

const unique = (rows, key) => [...new Set(rows.map((row) => row[key]).filter(Boolean))];

const countBy = (rows, key) =>
  rows.reduce((counts, row) => {
    counts[row[key]] = (counts[row[key]] || 0) + 1;
    return counts;
  }, {});

export default class StudentsModel {
  constructor(students) {
    this.students = students;
    this.total = students.length;
    this.programs = unique(students, 'program');
    this.intakes = unique(students, 'intake');
    this.statuses = unique(students, 'status');
    this.statusCounts = countBy(students, 'status');
  }

  query({ search = '', program = null, intake = null, status = null, page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.students;
    if (program) filtered = filtered.filter((student) => student.program === program);
    if (intake) filtered = filtered.filter((student) => student.intake === intake);
    if (status) filtered = filtered.filter((student) => student.status === status);
    if (q) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(q) ||
          student.studentId.toLowerCase().includes(q) ||
          student.program.toLowerCase().includes(q) ||
          (student.class && student.class.toLowerCase().includes(q)),
      );
    }

    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const safePage = Math.min(Math.max(1, page), pageCount);
    const start = (safePage - 1) * perPage;
    const rows = filtered.slice(start, start + perPage);

    return {
      rows,
      total: filtered.length,
      from: filtered.length === 0 ? 0 : start + 1,
      to: start + rows.length,
      page: safePage,
      pageCount,
      perPage,
    };
  }

  static async fetch() {
    const response = await registrarService.students({ per_page: 100 });
    const rows = (response?.data || response || []).map(toTableRow);
    return new StudentsModel(rows);
  }
}