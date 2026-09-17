import { adminService } from '../services/applicationService';

const DEFAULT_PER_PAGE = 5;

const unique = (rows, key) => [...new Set(rows.map((row) => row[key]).filter(Boolean))];
const scheduleLabel = (schedule) => typeof schedule === 'string' ? schedule : schedule?.label || schedule?.description || (schedule ? Object.values(schedule).filter(Boolean).join(' · ') : '—');

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
    const result = await adminService.classes({ per_page: 100 });
    const classes = (result?.data || result || []).map((item) => {
      const capacity = Number(item.capacity || 0);
      const enrolled = Number(item.enrolled_count || 0);
      const percentage = capacity ? Math.round((enrolled / capacity) * 100) : 0;
      const intakeStatus = item.intake?.status;
      return {
        id: item.id,
        name: item.name,
        type: item.schedule?.type || 'Class cohort',
        program: item.program?.name || '—',
        intake: item.intake?.name || '—',
        schedule: scheduleLabel(item.schedule),
        capacity: enrolled,
        maxCapacity: capacity,
        percentage,
        status: percentage >= 100 ? 'Full' : (intakeStatus === 'upcoming' ? 'Upcoming' : 'Active'),
        barColor: percentage >= 100 ? 'bg-[#d97706]' : 'bg-[#1f5f40]',
      };
    });
    const statuses = unique(classes, 'status');
    const programs = unique(classes, 'program');
    const intakes = unique(classes, 'intake');
    return new SuperAdminClassesModel({
      header: {
        title: 'Classes & Intakes',
        description: 'Manage class groups, schedules, intakes, and capacity.',
        activeCountLabel: 'active classes',
        addClassPath: '/super-admin/classes/add',
        viewPathPrefix: '/super-admin/classes',
      },
      statCards: [
        { key: 'active', label: 'Active Classes', dotClass: 'bg-[#10b981]', suffix: 'Currently running' },
        { key: 'upcoming', label: 'Upcoming Intakes', dotClass: 'bg-[#d97706]', suffix: 'Scheduled to start' },
        { key: 'atCapacity', label: 'Classes at Capacity', dotClass: 'bg-[#d97706]', badgeText: 'Needs attention', suffix: '100% capacity' },
      ],
      filters: { searchPlaceholder: 'Search classes or programs...', sorts: [
        { value: 'name-asc', label: 'Class name A-Z' }, { value: 'name-desc', label: 'Class name Z-A' },
        { value: 'capacity-desc', label: 'Capacity: High to Low' }, { value: 'capacity-asc', label: 'Capacity: Low to High' },
      ] },
      classes,
      statuses,
      programs,
      intakes,
    });
  }
}