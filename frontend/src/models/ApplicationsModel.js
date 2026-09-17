import { applicantsData } from '../data/applicantsData';

const DEFAULT_PER_PAGE = 7;

const toTableRow = (app) => ({
  id: app.id,
  name: app.name,
  initials: app.initials,
  program: app.program,
  submitted: app.submitted,
  status: app.status,
  statusColor: app.statusColor,
  statusIconColor: app.statusIconColor,
  payment: app.payment,
  paymentColor: app.paymentColor,
  paymentDot: app.paymentDot ?? false,
  paymentDotColor: app.paymentDotColor,
});

export default class ApplicationsModel {
  constructor(applications) {
    this.applications = applications;
    this.total = applications.length;
    this.statusCounts = applications.reduce((counts, app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
      return counts;
    }, {});
  }

  query({ status = 'All', search = '', page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.applications;
    if (status && status !== 'All') {
      filtered = filtered.filter((app) => app.status === status);
    }
    if (q) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.id.toLowerCase().includes(q) ||
          app.program.toLowerCase().includes(q),
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
    };
  }

  static async fetch() {
    const rows = Object.values(applicantsData).map(toTableRow);
    return new ApplicationsModel(rows);
  }
}