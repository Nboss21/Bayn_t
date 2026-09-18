import { adminService } from '../services/applicationService';

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
    const data = await adminService.dashboard();
    return new SuperAdminOverviewModel(data);
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