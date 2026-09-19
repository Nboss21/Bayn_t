export function scheduleParts(schedule) {
  if (!schedule) return { label: 'Schedule not set', time: '' };
  if (typeof schedule === 'string') return { label: schedule, time: '' };

  const days = Array.isArray(schedule.days)
    ? schedule.days.join(' · ')
    : schedule.days || schedule.day || '';
  const time = schedule.time
    || schedule.time_range
    || schedule.time_slot
    || [schedule.start_time, schedule.end_time].filter(Boolean).join(' - ');
  const label = schedule.label || schedule.session || schedule.description || '';

  return {
    label: [days, label].filter(Boolean).join(' · ') || 'Schedule not set',
    time: time || '',
  };
}

export function scheduleLabel(schedule) {
  const parts = scheduleParts(schedule);
  return [parts.label, parts.time].filter(Boolean).join(' · ');
}
