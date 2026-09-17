import { registrarDashboard } from '../data/dashboardData';

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
    return new DashboardModel(registrarDashboard);
  }
}

function buildGreeting(name) {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}.`;
}