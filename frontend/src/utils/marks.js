export const MAX_MARKS = { practical: 100, theory: 100, professional: 100 };
export const MARK_FIELDS = Object.keys(MAX_MARKS);

export const isEmptyMark = (value) => value === null || value === undefined || value === '';

export function deriveRow(student, categories = MARK_FIELDS.map((id) => ({ id, points: MAX_MARKS[id] }))) {
  const error = {};

  categories.forEach(({ id: field, points = MAX_MARKS[field] || 100 }) => {
    const value = student[field];
    if (!isEmptyMark(value)) {
      const num = Number(value);
      if (Number.isNaN(num) || num < 0 || num > points) {
        error[field] = `Max 0-${points}`;
      }
    }
  });

  const filled = categories.map(({ id }) => !isEmptyMark(student[id]));
  const hasError = Object.keys(error).length > 0;

  let status;
  let total;

  if (!filled.some(Boolean)) {
    status = 'Not marked';
    total = '-';
  } else if (filled.every(Boolean) && !hasError) {
    status = 'Complete';
    total = categories.reduce((acc, { id, percent }) => acc + (Number(student[id]) * (Number(percent || 0) / 100)), 0);
  } else {
    status = 'Incomplete';
    total = '-';
  }

  return { ...student, error, status, total };
}

export function computeStats(students, categories) {
  const rows = students.map((student) => deriveRow(student, categories));
  const stats = { complete: 0, incomplete: 0, notMarked: 0, total: rows.length };

  rows.forEach((row) => {
    if (row.status === 'Complete') stats.complete++;
    else if (row.status === 'Incomplete') stats.incomplete++;
    else stats.notMarked++;
  });

  return { rows, stats };
}
