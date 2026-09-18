import { registrarService, adminService } from '../services/applicationService';
import { API_BASE_URL, TOKEN_KEY } from '../services/api';

const DEFAULT_PER_PAGE = 7;

export default class EnrollmentHistoryModel {
  constructor(records) {
    this.records = records;
    this.total = records.length;
    this.programs = [...new Set(records.map((r) => r.program).filter(Boolean))];
    this.intakes = [...new Set(records.map((r) => r.intake).filter(Boolean))];
    this.statuses = [...new Set(records.map((r) => r.status).filter(Boolean))];
  }

  query({ search = '', program = 'All', intake = 'All', status = 'All', page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.records;

    if (q) {
      filtered = filtered.filter(
        (r) =>
          r.student.toLowerCase().includes(q) ||
          r.studentId.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q),
      );
    }

    if (program && program !== 'All') filtered = filtered.filter((r) => r.program === program);
    if (intake && intake !== 'All') filtered = filtered.filter((r) => r.intake === intake);
    if (status && status !== 'All') filtered = filtered.filter((r) => r.status === status);

    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const safePage = Math.min(Math.max(1, page), pageCount);
    const start = (safePage - 1) * perPage;
    const rows = filtered.slice(start, start + perPage);

    return { rows, total: filtered.length, from: filtered.length === 0 ? 0 : start + 1, to: start + rows.length, page: safePage, pageCount };
  }

  /** Export enrolled students as CSV via the reports API */
  static exportCsvUrl() {
    const token = localStorage.getItem(TOKEN_KEY);
    return `${API_BASE_URL}/reports/enrollment/export?token=${token}`;
  }

  static async fetch() {
    // Fetch ALL students (all statuses) so filters work client-side
    const [studentsResponse, classesResponse] = await Promise.all([
      registrarService.students({ per_page: 100 }),
      adminService.classes({ per_page: 100 }).catch(() => []),
    ]);

    const classes = (classesResponse?.data || classesResponse || []);
    const classMap = Object.fromEntries(classes.map((c) => [c.id, c]));

    const records = (studentsResponse?.data || studentsResponse || []).map((student) => {
      const cls = classMap[student.class_id] || student.class || null;
      const enrolledAt = student.enrolled_at || student.created_at;
      const rawStatus = student.status || 'active';
      const statusLabel = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

      return {
        id: `ENR-${student.id}`,
        studentId: String(student.id),
        student: student.user?.name || student.name || 'Unnamed student',
        program: student.application?.program?.name || cls?.program?.name || 'Unassigned',
        intake: student.application?.intake?.name || cls?.intake?.name || '—',
        class: cls?.name || '—',
        status: statusLabel,
        enrolledAt: enrolledAt
          ? new Date(enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : '—',
      };
    });

    return new EnrollmentHistoryModel(records);
  }
}
