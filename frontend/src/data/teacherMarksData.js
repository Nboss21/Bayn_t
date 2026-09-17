const HOME = '/teacher';

export const MAX_MARKS = {
  practical: 30,
  theory: 50,
  professional: 10,
  participation: 10,
};

export const teacherMarks = {
  header: {
    title: 'Marks',
    subtitle: 'Record and manage assessment marks for PMA Morning.',
    assessments: [
      { id: 'midterm', name: 'Midterm Assessment' },
      { id: 'final', name: 'Final Assessment' },
    ],
  },
  classInfo: {
    name: 'PMA Morning',
    program: 'Professional Makeup Artistry',
    cohort: 'September 2026 Cohort',
    schedule: 'Mon-Fri · 9:00 AM-12:00 PM',
  },
  gradingWeight: {
    categories: [
      { id: 'practical', label: 'Practical', percent: 30, points: 30 },
      { id: 'theory', label: 'Theory', percent: 50, points: 50 },
      { id: 'professional', label: 'Professional', percent: 10, points: 10 },
      { id: 'participation', label: 'Participation', percent: 10, points: 10 },
    ],
  },
  students: [
    { id: 1, name: 'Makdes Tesfaye', station: 'Station 01', studentId: 'HOB - ST - 2026-0841', initials: 'MT', bg: 'bg-[#F3E8FF]', practical: 27, theory: 43, professional: 9, participation: 9 },
    { id: 2, name: 'Hana Bekele', station: 'Station 02', studentId: 'HOB - ST - 2026-0838', initials: 'HB', bg: 'bg-[#FFEDD5]', practical: 28, theory: 45, professional: 9, participation: 10 },
    { id: 3, name: 'Saron Alemu', station: 'Station 03', studentId: 'HOB - ST - 2026-0835', initials: 'SA', bg: 'bg-[#FFEDD5]', practical: 24, theory: 38, professional: 8, participation: 8 },
    { id: 4, name: 'Liya Tadesse', station: 'Station 04', studentId: 'HOB - ST - 2026-0832', initials: 'LT', bg: 'bg-[#DCFCE7]', practical: 26, theory: 41, professional: 8, participation: 9 },
    { id: 5, name: 'Bethel Girma', station: 'Station 05', studentId: 'HOB - ST - 2026-0827', initials: 'BG', bg: 'bg-[#DBEAFE]', practical: 25, theory: 40, professional: 8, participation: 8 },
    { id: 6, name: 'Ruth Alemu', station: 'Station 06', studentId: 'HOB - ST - 2026-0824', initials: 'RA', bg: 'bg-[#FCE7F3]', practical: 22, theory: 35, professional: 7, participation: 7 },
    { id: 7, name: 'Selamawit Kebede', station: 'Station 07', studentId: 'HOB - ST - 2026-0821', initials: 'SK', bg: 'bg-[#DCFCE7]', practical: 29, theory: 46, professional: 10, participation: 9 },
    { id: 8, name: 'Marta Tesfaye', station: 'Station 08', studentId: 'HOB - ST - 2026-0818', initials: 'MT', bg: 'bg-[#F3E8FF]', practical: 26, theory: 42, professional: 9, participation: 9 },
    { id: 9, name: 'Eden Worku', station: 'Station 09', studentId: 'HOB - ST - 2026-0815', initials: 'EW', bg: 'bg-[#FCE7F3]', practical: 24, theory: 39, professional: 8, participation: 8 },
    { id: 10, name: 'Rahel Bekele', station: 'Station 10', studentId: 'HOB - ST - 2026-0814', initials: 'RB', bg: 'bg-[#FEE2E2]', practical: null, theory: null, professional: null, participation: null },
    { id: 11, name: 'Bethlehem Alemu', station: 'Station 11', studentId: 'HOB - ST - 2026-0812', initials: 'BA', bg: 'bg-[#DCFCE7]', practical: null, theory: null, professional: null, participation: null },
    { id: 12, name: 'Yordanos Tesfaye', station: 'Station 12', studentId: 'HOB - ST - 2026-0810', initials: 'YT', bg: 'bg-[#F3E8FF]', practical: 23, theory: 37, professional: 8, participation: 8 },
    { id: 13, name: 'Kalkidan Girma', station: 'Station 13', studentId: 'HOB - ST - 2026-0808', initials: 'KG', bg: 'bg-[#FFEDD5]', practical: 35, theory: 44, professional: 9, participation: null },
    { id: 14, name: 'Ruth Tadesse', station: 'Station 14', studentId: 'HOB - ST - 2026-0806', initials: 'RT', bg: 'bg-[#FCE7F3]', practical: 26, theory: 42, professional: 9, participation: 9 },
    { id: 15, name: 'Selamawit Alemu', station: 'Station 15', studentId: 'HOB - ST - 2026-0805', initials: 'SA', bg: 'bg-[#FFEDD5]', practical: 27, theory: 44, professional: 9, participation: 10 },
    { id: 16, name: 'Meron Bekele', station: 'Station 16', studentId: 'HOB - ST - 2026-0804', initials: 'MB', bg: 'bg-[#F1F5F9]', practical: null, theory: null, professional: null, participation: null },
    { id: 17, name: 'Hana Girma', station: 'Station 17', studentId: 'HOB - ST - 2026-0803', initials: 'HG', bg: 'bg-[#FFEDD5]', practical: null, theory: null, professional: null, participation: null },
    { id: 18, name: 'Sara Tesfaye', station: 'Station 18', studentId: 'HOB - ST - 2026-0802', initials: 'ST', bg: 'bg-[#F1F5F9]', practical: null, theory: null, professional: null, participation: null },
  ],
};