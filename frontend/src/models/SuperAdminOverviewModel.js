import { adminService, registrarService } from '../services/applicationService';

export default class SuperAdminOverviewModel {
  constructor(data) {
    this.data = data;
    this.greeting = buildGreeting(data.user.name);
    this.dateText = buildDateText();
    this.stats = data.stats;
    this.attentionItems = data.attentionItems;
    this.pendingItemsCount = data.attentionItems.length;
    this.quickActions = data.quickActions;
    this.activities = data.activities;
    this.atelierStatus = data.atelierStatus;
  }

  static async fetch() {
    // Fetch all data sources in parallel and build a rich overview
    const [dashResponse, usersResponse, appsResponse, paymentsResponse] = await Promise.allSettled([
      adminService.dashboard(),
      adminService.users({ per_page: 100 }),
      registrarService.applications({ per_page: 20, sort: 'latest' }),
      registrarService.payments({ per_page: 10 }),
    ]);

    const dash = dashResponse.status === 'fulfilled' ? (dashResponse.value || {}) : {};
    const users = usersResponse.status === 'fulfilled' ? (usersResponse.value?.data || usersResponse.value || []) : [];
    const apps = appsResponse.status === 'fulfilled' ? (appsResponse.value?.data || appsResponse.value || []) : [];
    const payments = paymentsResponse.status === 'fulfilled' ? (paymentsResponse.value?.data || paymentsResponse.value || []) : [];

    const dashboardStats = Object.fromEntries((dash.stats || []).map((stat) => [stat.id, stat.value]));
    // Count users by role for role-specific live subtitles.
    const roleCount = { super_admin: 0, registrar: 0, teacher: 0, student: 0 };
    users.forEach((u) => { if (u.role in roleCount) roleCount[u.role]++; });
    const pendingUsers = users.filter((u) => !u.is_active);

    // Build live stat cards from API data
    const stats = [
      {
        id: 'users',
        title: 'Total Users',
        value: String(dashboardStats.users ?? users.length),
        subtitle: `${roleCount.teacher} teachers · ${roleCount.registrar} registrars`,
      },
      {
        id: 'students',
        title: 'Active Students',
        value: String(dashboardStats.students ?? roleCount.student),
        subtitle: 'Currently enrolled',
      },
      {
        id: 'classes',
        title: 'Active Classes',
        value: String(dashboardStats.classes ?? 0),
        subtitle: 'Running this intake',
      },
      {
        id: 'applications',
        title: 'Pending Applications',
        value: String(apps.filter((a) => a.status === 'submitted' || a.status === 'under_review').length),
        subtitle: 'Awaiting review',
        badge: apps.filter((a) => a.status === 'submitted').length > 0
          ? { text: 'Action needed', type: 'warning' }
          : undefined,
      },
    ];

    // Build attention items from real data: pending users + unverified payments + pending apps
    const attentionItems = [];
    if (pendingUsers.length > 0) {
      attentionItems.push({
        id: 'pending-users',
        title: `${pendingUsers.length} pending user account${pendingUsers.length > 1 ? 's' : ''}`,
        description: 'New accounts awaiting activation.',
        iconType: 'users',
        iconBg: 'bg-[#f3f4f6]',
        badge: 'Pending Review',
        badgeStyle: 'bg-[#ffccb3] text-[#d97706]',
        buttonText: 'Review accounts',
        link: '/super-admin/users',
      });
    }
    const unverifiedPayments = payments.filter((p) => p.status === 'pending' || p.status === 'unverified');
    if (unverifiedPayments.length > 0) {
      attentionItems.push({
        id: 'unverified-payments',
        title: `${unverifiedPayments.length} unverified payment${unverifiedPayments.length > 1 ? 's' : ''}`,
        description: 'Payments waiting for manual verification.',
        iconType: 'creditCard',
        iconBg: 'bg-[#fcd3b6]',
        badge: 'Pending Review',
        badgeStyle: 'bg-[#ffccb3] text-[#d97706]',
        buttonText: 'Review payments',
        link: '/registrar/overview',
      });
    }
    const pendingApps = apps.filter((a) => a.status === 'submitted');
    if (pendingApps.length > 0) {
      attentionItems.push({
        id: 'pending-apps',
        title: `${pendingApps.length} submitted application${pendingApps.length > 1 ? 's' : ''}`,
        description: 'New applications submitted and awaiting review.',
        iconType: 'fileText',
        iconBg: 'bg-[#e0f2fe]',
        badge: 'Action Needed',
        badgeStyle: 'bg-[#dbeafe] text-[#2563eb]',
        buttonText: 'Review applications',
        link: '/registrar/applications',
      });
    }

    // Quick actions (static — these are navigation shortcuts)
    const quickActions = [
      { id: 'add-user', label: 'Add User', path: '/super-admin/users/add', icon: 'user-plus' },
      { id: 'add-program', label: 'New Program', path: '/super-admin/programs/add', icon: 'book' },
      { id: 'add-class', label: 'New Class', path: '/super-admin/classes/add', icon: 'calendar' },
      { id: 'view-reports', label: 'View Reports', path: '/super-admin/reports', icon: 'bar-chart' },
    ];

    // Build recent activity feed from latest apps + payments
    const activityFeed = [
      ...apps.slice(0, 5).map((a) => ({
        id: `app-${a.id}`,
        type: 'application',
        title: `Application ${a.id}`,
        description: `Status changed to ${a.status}`,
        dotColor: 'bg-[#d1d5db]',
        time: a.updated_at ? new Date(a.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      })),
      ...payments.slice(0, 5).map((p) => ({
        id: `pay-${p.id}`,
        type: 'payment',
        title: `Payment ${p.id}`,
        description: `Status changed to ${p.status}`,
        dotColor: 'bg-[#d1d5db]',
        time: p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      })),
    ]
      .sort((a, b) => (a.time < b.time ? 1 : -1))
      .slice(0, 6);

    return new SuperAdminOverviewModel({
      user: { name: dash.user?.name || 'Super Admin' },
      stats,
      attentionItems,
      quickActions,
      activities: activityFeed,
      atelierStatus: {
        activeStudents: dashboardStats.students ?? 0,
        activeClasses: dashboardStats.classes ?? 0,
      },
    });
  }
}

function buildGreeting(name) {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}`;
}

function buildDateText() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
