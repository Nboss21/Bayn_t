const HOME = '/teacher';

export const teacherAttendance = {
  header: {
    title: 'Attendance',
    subtitle: 'Record and manage daily studio session attendance for PMA Morning.',
  },
  classInfo: {
    name: 'PMA Morning',
    program: 'Professional Makeup Artistry',
    cohort: 'September 2026 Cohort',
    schedule: 'Mon-Fri · 9:00 AM-12:00 PM',
  },
  students: [
    { id: 1, name: 'Mekdes Tesfaye', initials: 'MT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 01', studentId: 'HOB-ST-2026-0041', status: 'Present', note: '' },
    { id: 2, name: 'Hana Bekele', initials: 'HB', avatarBg: 'bg-[#F3F4F6]', station: 'Station 02', studentId: 'HOB-ST-2026-0038', status: 'Present', note: '' },
    { id: 3, name: 'Saron Alemu', initials: 'SA', avatarBg: 'bg-[#FEF5D9]', station: 'Station 03', studentId: 'HOB-ST-2026-0035', status: 'Present', note: '' },
    { id: 4, name: 'Liya Tadesse', initials: 'LT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 04', studentId: 'HOB-ST-2026-0029', status: 'Present', note: '' },
    { id: 5, name: 'Bethel Girma', initials: 'BG', avatarBg: 'bg-[#E0F2FE]', station: 'Station 05', studentId: 'HOB-ST-2026-0027', status: 'Present', note: '' },
    { id: 6, name: 'Ruth Alemu', initials: 'RA', avatarBg: 'bg-[#FEE4E2]', station: 'Station 06', studentId: 'HOB-ST-2026-0024', status: 'Absent', note: '' },
    { id: 7, name: 'Selamawit Kebede', initials: 'SK', avatarBg: 'bg-[#F3F4F6]', station: 'Station 07', studentId: 'HOB-ST-2026-0021', status: 'Present', note: '' },
    { id: 8, name: 'Marta Tesfaye', initials: 'MT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 08', studentId: 'HOB-ST-2026-0018', status: 'Present', note: '' },
    { id: 9, name: 'Eden Worku', initials: 'EW', avatarBg: 'bg-[#F3E8FF]', station: 'Station 09', studentId: 'HOB-ST-2026-0016', status: 'Present', note: '' },
    { id: 10, name: 'Rahel Bekele', initials: 'RB', avatarBg: 'bg-[#FCE7F3]', station: 'Station 10', studentId: 'HOB-ST-2026-0014', status: 'Absent', note: '' },
    { id: 11, name: 'Bethlehem Alemu', initials: 'BA', avatarBg: 'bg-[#EAF4EC]', station: 'Station 11', studentId: 'HOB-ST-2026-0012', status: 'Present', note: '' },
    { id: 12, name: 'Yordanos Tesfaye', initials: 'YT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 12', studentId: 'HOB-ST-2026-0010', status: 'Late', note: '' },
    { id: 13, name: 'Kalkidan Girma', initials: 'KG', avatarBg: 'bg-[#FFEDD5]', station: 'Station 13', studentId: 'HOB-ST-2026-0008', status: 'Present', note: '' },
    { id: 14, name: 'Ruth Tadesse', initials: 'RT', avatarBg: 'bg-[#F3F4F6]', station: 'Station 14', studentId: 'HOB-ST-2026-0006', status: 'Present', note: '' },
    { id: 15, name: 'Selamawit Alemu', initials: 'SA', avatarBg: 'bg-[#F3F4F6]', station: 'Station 15', studentId: 'HOB-ST-2026-0005', status: 'Present', note: '' },
    { id: 16, name: 'Meron Bekele', initials: 'MB', avatarBg: 'bg-[#F3F4F6]', station: 'Station 16', studentId: 'HOB-ST-2026-0004', status: 'Unmarked', note: '' },
    { id: 17, name: 'Hana Girma', initials: 'HG', avatarBg: 'bg-[#F3F4F6]', station: 'Station 17', studentId: 'HOB-ST-2026-0003', status: 'Unmarked', note: '' },
    { id: 18, name: 'Sara Tesfaye', initials: 'ST', avatarBg: 'bg-[#F3F4F6]', station: 'Station 18', studentId: 'HOB-ST-2026-0002', status: 'Unmarked', note: '' },
  ],
  footer: {
    discardPath: `${HOME}/overview`,
  },
};