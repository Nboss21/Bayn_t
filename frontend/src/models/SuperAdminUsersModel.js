import { adminService } from '../services/applicationService';

const DEFAULT_PER_PAGE = 5;

const makeInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const toTableRow = (user) => ({
  ...user,
  initials: makeInitials(user.name),
  actionType: user.status === 'Pending' ? 'review' : 'view',
});

const userIdNumber = (user) => {
  const match = user.id.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export default class SuperAdminUsersModel {
  constructor(data) {
    this.header = data.header;
    this.attentionBanner = data.attentionBanner;
    this.filters = data.filters;
    this.users = data.users.map(toTableRow);
    this.total = this.users.length;
    this.activeCount = this.users.filter((user) => user.status === 'Active').length;
    this.pendingCount = this.users.filter((user) => user.status === 'Pending').length;
  }

  findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  query({ search = '', role = null, status = null, sort = 'recent', page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    const q = search.trim().toLowerCase();
    let filtered = this.users;

    if (role && role !== 'All') filtered = filtered.filter((user) => user.role === role);
    if (status && status !== 'All') filtered = filtered.filter((user) => user.status === status);
    if (q) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          user.id.toLowerCase().includes(q),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'role') return a.role.localeCompare(b.role);
      if (sort === 'status') return a.status.localeCompare(b.status);
      return userIdNumber(b) - userIdNumber(a);
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
    const result = await adminService.users({ per_page: 100 });
    const roleLabels = { super_admin: 'Super Admin', registrar: 'Registrar', teacher: 'Teacher', student: 'Student' };
    const users = (result?.data || result || []).map((user) => ({
      id: `#USR-${user.id}`,
      resourceId: user.id,
      name: user.name,
      role: roleLabels[user.role] || 'No role assigned',
      email: user.email,
      status: user.is_active ? 'Active' : 'Pending',
      lastSignIn: user.updated_at ? new Date(user.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never',
    }));
    return new SuperAdminUsersModel({
      header: {
        title: 'Users',
        description: 'Manage staff accounts and access to the HOB system.',
        activeAccountsLabel: 'active accounts',
        addUserPath: '/super-admin/users/add',
      },
      attentionBanner: { actionText: 'Review accounts' },
      filters: {
        searchPlaceholder: 'Search by name or email...',
        roles: [...new Set(users.map((user) => user.role).filter((role) => role !== 'No role assigned'))],
        statuses: [...new Set(users.map((user) => user.status))],
        sorts: [
          { value: 'recent', label: 'Recently added' },
          { value: 'name', label: 'Name' },
          { value: 'role', label: 'Role' },
          { value: 'status', label: 'Status' },
        ],
      },
      users,
    });
  }
}