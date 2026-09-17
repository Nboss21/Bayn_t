import React from 'react';

const STATUS_STYLES = {
  Active: {
    dot: 'bg-[#22c55e]',
    badge: 'bg-[#dcfce7] text-[#15803d]',
  },
  Completed: {
    dot: 'bg-[#6b7280]',
    badge: 'bg-[#f3f4f6] text-[#374151]',
  },
  Pending: {
    dot: 'bg-[#f59e0b]',
    badge: 'bg-[#fef3c7] text-[#b45309]',
  },
};

export default function StudentStatusBadge({ status }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES['Pending'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium ${styles.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>
      {status}
    </span>
  );
}
