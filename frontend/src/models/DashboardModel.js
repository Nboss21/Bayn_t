import { registrarDashboard } from '../data/dashboardData';
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

    return new DashboardModel({
      ...registrarDashboard,
      metrics,
      recentActivity,
      user: stats.user || registrarDashboard.user,
    });
  }
}

function buildGreeting(name) {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}.`;
}
