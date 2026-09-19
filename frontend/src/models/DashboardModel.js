import { registrarService } from '../services/applicationService';

const replaceCount = (template, count) => template.replace('{count}', count);

export default class DashboardModel {
  constructor(data) {
    this.data = data;

    const metricOf = (id) => data.metrics[id] ?? 0;

    this.totalWorkload = Object.values(data.metrics).reduce((sum, count) => sum + count, 0);
    this.greeting = buildGreeting(data.user.name);
    this.summaryCards = data.summaryCards.map((card) => ({
      ...card,
      count: metricOf(card.id),
    }));
    this.queues = data.queues.map((queue) => {
      const count = metricOf(queue.id);
      return {
        ...queue,
        count,
        countText: replaceCount(queue.countText, count),
      };
    });
    this.workloadSegments = data.summaryCards.map((card) => {
      const count = metricOf(card.id);
      return {
        id: card.id,
        color: card.barColor,
        count,
        percent: this.totalWorkload > 0 ? Math.round((count / this.totalWorkload) * 100) : 0,
      };
    });
    this.recentActivity = data.recentActivity;
    this.quickActions = data.quickActions;
    this.headerAction = data.headerAction;
    this.activityViewAllPath = data.activityViewAllPath;
  }

  static async fetch() {
    const [statsResponse, appsResponse, paymentsResponse] = await Promise.allSettled([
      registrarService.dashboard(),
      registrarService.applications({ per_page: 8, sort: 'latest' }),
      registrarService.payments({ per_page: 5 }),
    ]);

    const stats = statsResponse.status === 'fulfilled'
      ? (statsResponse.value?.data || statsResponse.value || {})
      : {};
    const apps = appsResponse.status === 'fulfilled'
      ? (appsResponse.value?.data || appsResponse.value || [])
      : [];
    const payments = paymentsResponse.status === 'fulfilled'
      ? (paymentsResponse.value?.data || paymentsResponse.value || [])
      : [];

    const applications = stats.applications || {};
    const paymentStats = stats.payments || {};

    const metrics = {
      underReview: applications.under_review ?? 0,
      awaitingInformation: applications.awaiting_information ?? 0,
      approvedWithoutClass: Math.max(0, (applications.approved ?? 0) - (stats.students?.enrolled ?? 0)),
      paymentExceptions: (paymentStats.failed ?? 0) + (paymentStats.pending ?? 0),
    };

    // Build real recent activity from latest apps + payments
    const recentActivity = [
      ...apps.map((a) => ({
        id: `app-${a.id}`,
        type: 'application',
        text: `Application #${a.id}`,
        detail: a.status ? a.status.replace(/_/g, ' ') : '',
        time: a.updated_at
          ? new Date(a.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          : '',
        path: `/registrar/applications/${a.id}`,
      })),
      ...payments.map((p) => ({
        id: `pay-${p.id}`,
        type: 'payment',
        text: `Payment #${p.id}`,
        detail: p.status || '',
        time: p.updated_at
          ? new Date(p.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          : '',
        path: `/registrar/overview`,
      })),
    ]
      .sort((a, b) => (a.time < b.time ? 1 : -1))
      .slice(0, 6);

    const user = stats.user || { name: 'Registrar' };
    const summaryCards = [
      { id: 'underReview', title: 'Applications requiring review', leftAction: 'Immediate triage', rightAction: 'Queue', borderColor: 'border-t-yellow-500', textColor: 'text-yellow-600', barColor: 'bg-[#fbbf24]', path: '/registrar/applications' },
      { id: 'awaitingInformation', title: 'Applicants awaiting information', leftAction: 'Pending responses', rightAction: 'View', borderColor: 'border-t-blue-500', textColor: 'text-blue-600', barColor: 'bg-[#3b82f6]', path: '/registrar/applications' },
      { id: 'approvedWithoutClass', title: 'Approved students requiring class assignment', leftAction: 'Allocations ready', rightAction: 'Assign', borderColor: 'border-t-[#b45309]', textColor: 'text-[#b45309]', barColor: 'bg-[#b45309]', path: '/registrar/applications' },
      { id: 'paymentExceptions', title: 'Payment issues or exceptions', leftAction: 'Requires verification', rightAction: 'Resolve', borderColor: 'border-t-red-500', textColor: 'text-red-600', barColor: 'bg-[#ef4444]', path: '/registrar/payments' },
    ];
    const queues = summaryCards.map((card) => ({ ...card, badgeText: card.id === 'paymentExceptions' ? 'Payment Exception' : 'Needs Review', badgeBg: 'bg-gray-50', badgeColor: card.textColor, badgeBorder: 'border-gray-200', description: `Live ${card.title.toLowerCase()} queue.`, actionText: card.rightAction, lineColor: card.barColor, countText: `{count} ${card.title.toLowerCase()}`, path: card.path }));
    return new DashboardModel({
      user,
      summaryCards,
      queues,
      headerAction: { label: 'REVIEW APPLICATIONS', path: '/registrar/applications' },
      activityViewAllPath: '/registrar/applications',
      metrics,
      recentActivity,
      quickActions: [
        { id: 'applications', label: 'Review applications', path: '/registrar/applications' },
        { id: 'students', label: 'View students', path: '/registrar/students' },
        { id: 'classes', label: 'Manage classes', path: '/registrar/classes' },
      ],
    });
  }
}

function buildGreeting(name) {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}.`;
}
