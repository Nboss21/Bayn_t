import { applicantsData } from '../data/applicantsData';
import { applicantStatusStyles } from '../data/applicantStatusData';

const DECISION_STATUSES = ['Needs Review', 'Awaiting Information'];

const formatActivityDate = () =>
  new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) +
  ' • ' +
  new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export default class ApplicationModel {
  constructor(record) {
    this.record = record;
    Object.assign(this, record);
  }

  isDecisionable() {
    return DECISION_STATUSES.includes(this.status);
  }

  transition(status, { activityTitle, note } = {}) {
    const styles = applicantStatusStyles[status];
    const activities = this.record.activities.map((activity) => ({ ...activity, active: false, isLast: false }));
    if (activityTitle) {
      activities.push({
        id: activities.length + 1,
        title: activityTitle,
        date: formatActivityDate(),
        active: true,
        isLast: true,
      });
    }
    return new ApplicationModel({
      ...this.record,
      ...styles,
      historyNote: note || this.record.historyNote,
      activities,
    });
  }

  static async fetch(id) {
    const record = applicantsData[id];
    return record ? new ApplicationModel(record) : null;
  }
}