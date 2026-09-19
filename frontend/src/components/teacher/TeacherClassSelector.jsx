import React from 'react';

export default function TeacherClassSelector({ classes = [], value, onChange }) {
  if (classes.length < 2) return null;

  return (
    <label className="mb-6 flex items-center gap-3 text-sm text-gray-600">
      <span className="font-semibold text-gray-800">Class</span>
      <select value={value || ''} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none">
        {classes.map((classItem) => <option key={classItem.id} value={classItem.id}>{classItem.name} — {classItem.program}</option>)}
      </select>
    </label>
  );
}
