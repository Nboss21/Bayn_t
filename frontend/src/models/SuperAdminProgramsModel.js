import { superAdminPrograms } from '../data/superAdminProgramsData';
import { adminService } from '../services/applicationService';

const DEFAULT_PER_PAGE = 5;

const unique = (rows, key) => [...new Set(rows.map((row) => row[key]).filter(Boolean))];

const lastUpdatedDate = (program) => new Date(program.lastUpdated).getTime() || 0;

export default class SuperAdminProgramsModel {
  constructor(data) {
    this.header = data.header;
    this.filters = data.filters;
    this.formOptions = data.formOptions;
    this.programs = data.programs;
    this.programDetails = data.programDetails;
    this.total = this.programs.length;
    this.activeCount = this.programs.filter((program) => program.status === 'Open').length;
    this.statuses = unique(this.programs, 'status');
    this.levels = unique(this.programs, 'level');
  }

  findById(id) {
    return this.programDetails[id] || null;
  }

  query({ search = '', status = null, level = null, sort = 'recent', page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.programs;

    if (status && status !== 'All') filtered = filtered.filter((program) => program.status === status);
    if (level && level !== 'All') filtered = filtered.filter((program) => program.level === level);
    if (q) {
      filtered = filtered.filter(
        (program) =>
          program.name.toLowerCase().includes(q) ||
          program.code.toLowerCase().includes(q),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return lastUpdatedDate(b) - lastUpdatedDate(a);
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
    const result = await adminService.programs({ per_page: 100 });
    const rows = result?.data || result || [];
    const programs = rows.map((program) => ({
      id: program.id,
      name: program.name,
      code: program.slug || `PROGRAM-${program.id}`,
      description: program.description || '',
      level: program.level || '—',
      duration: program.duration_weeks ? `${program.duration_weeks} weeks` : '—',
      status: program.status ? `${program.status[0].toUpperCase()}${program.status.slice(1)}` : 'Draft',
      currentIntake: program.intakes?.data?.[0]?.name || program.intakes?.[0]?.name || '—',
      lastUpdated: program.updated_at ? new Date(program.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
    }));
    const details = Object.fromEntries(rows.map((program) => [program.id, {
      ...program,
      code: program.slug || `PROGRAM-${program.id}`,
      duration: String(program.duration_weeks || '—'),
      durationUnit: 'Weeks',
      status: program.status ? `${program.status[0].toUpperCase()}${program.status.slice(1)}` : 'Draft',
      currentIntake: program.intakes?.data?.[0]?.name || program.intakes?.[0]?.name || '—',
      lastUpdated: program.updated_at ? new Date(program.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
    }]));
    return new SuperAdminProgramsModel({ ...superAdminPrograms, programs, programDetails: details });
  }
}
