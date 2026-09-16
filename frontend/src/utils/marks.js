import { MAX_MARKS } from '../data/teacherMarksData';

export { MAX_MARKS };

export const MARK_FIELDS = ['practical', 'theory', 'professional', 'participation'];

export const isEmptyMark = (value) => value === null || value === undefined || value === '';

export function deriveRow(student) {
  const error = {};

  MARK_FIELDS.forEach((field) => {
    const value = student[field];
    if (!isEmptyMark(value)) {
      const num = Number(value);
      if (Number.isNaN(num) || num < 0 || num > MAX_MARKS[field]) {
        error[field] = `Max 0-${MAX_MARKS[field]}`;
      }
    }
  });

  const filled = MARK_FIELDS.map((f) => !isEmptyMark(student[f]));
  const hasError = Object.keys(error).length > 0;

  let status;
  let total;

  if (!filled.some(Boolean)) {
    status = 'Not marked';
    total = '-';
  } else if (filled.every(Boolean) && !hasError) {
    status = 'Complete';
    total = MARK_FIELDS.reduce((acc, field) => acc + Number(student[field]), 0);
  } else {
    status = 'Incomplete';
    total = '-';
  }

  return { ...student, error, status, total };
}

export function computeStats(students) {
  const rows = students.map(deriveRow);
  const stats = { complete: 0, incomplete: 0, notMarked: 0, total: rows.length };

  rows.forEach((row) => {
    if (row.status === 'Complete') stats.complete++;
    else if (row.status === 'Incomplete') stats.incomplete++;
    else stats.notMarked++;
  });

  return { rows, stats };
}