import { superAdminClasses } from '../data/superAdminClassesData';

const DEFAULT_PER_PAGE = 5;

const unique = (rows, key) => [...new Set(rows.map((row) => row[key]).filter(Boolean))];

export default class SuperAdminClassesModel {
  constructor(data) {
    this.header = data.header;
    this.statCards = data.statCards;
    this.filters = data.filters;
    this.addForm = data.addForm;
    this.classes = data.classes;
    this.total = this.classes.length;

    this.statuses = unique(this.classes, 'status');
    this.programs = unique(this.classes, 'program');
    this.intakes = unique(this.classes, 'intake');

    this.activeCount = this.classes.filter((cls) => cls.status === 'Active').length;
    this.upcomingCount = this.classes.filter((cls) => cls.status === 'Upcoming').length;
    this.atCapacityCount = this.classes.filter((cls) => cls.status === 'Full' || cls.percentage >= 100).length;
  }

  findById(id) {
    return this.classes.find((cls) => String(cls.id) === String(id)) || null;
  }

  query({ search = '', status = null, program = null, intake = null, sort = 'name-asc', page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.classes;

    if (status && status !== 'All') filtered = filtered.filter((cls) => cls.status === status);
    if (program && program !== 'All') filtered = filtered.filter((cls) => cls.program === program);
    if (intake && intake !== 'All') filtered = filtered.filter((cls) => cls.intake === intake);
    if (q) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(q) ||
          cls.program.toLowerCase().includes(q) ||
          cls.type.toLowerCase().includes(q),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      if (sort === 'capacity-desc') return b.percentage - a.percentage;
      if (sort === 'capacity-asc') return a.percentage - b.percentage;
      return a.name.localeCompare(b.name);
    });

    const pageCount = Math.max(1, Math.ceil(sorted.length / perPage));
    const safePage = Math.min(Math.max(1, page), pageCount);
    const start = (safePage - 1) * perPage;
    const rows = sorted.slice(start, start + perPage);

    return {
      rows,
      total: sorted.length,
      from: sorted.length === 0 ? 0 : start + 1,
      to: start + rows.length,
      page: safePage,
      pageCount,
      perPage,
    };
  }

  static async fetch() {
    return new SuperAdminClassesModel(superAdminClasses);
  }
}