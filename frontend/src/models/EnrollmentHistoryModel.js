import { enrollmentData } from '../data/enrollmentData';

const DEFAULT_PER_PAGE = 7;

export default class EnrollmentHistoryModel {
  constructor(records) {
    this.records = records;
    this.total = records.length;
    this.programs = [...new Set(records.map((r) => r.program))];
    this.intakes = [...new Set(records.map((r) => r.intake))];
    this.statuses = [...new Set(records.map((r) => r.status))];
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

    if (program && program !== 'All') {
      filtered = filtered.filter((r) => r.program === program);
    }

    if (intake && intake !== 'All') {
      filtered = filtered.filter((r) => r.intake === intake);
    }

    if (status && status !== 'All') {
      filtered = filtered.filter((r) => r.status === status);
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
    };
  }

  static async fetch() {
    return new EnrollmentHistoryModel(enrollmentData);
  }
}
