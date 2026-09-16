import React from 'react';
import { Search, Keyboard } from 'lucide-react';

const students = [
  { id: 1, name: 'Makdes Tesfaye', station: 'Station 01', studentId: 'HOB - ST - 2026-0841', initials: 'MT', bg: 'bg-[#F3E8FF]', practical: 27, theory: 43, professional: 9, participation: 9, total: 88, status: 'Complete' },
  { id: 2, name: 'Hana Bekele', station: 'Station 02', studentId: 'HOB - ST - 2026-0838', initials: 'HB', bg: 'bg-[#FFEDD5]', practical: 28, theory: 45, professional: 9, participation: 10, total: 92, status: 'Complete' },
  { id: 3, name: 'Saron Alemu', station: 'Station 03', studentId: 'HOB - ST - 2026-0835', initials: 'SA', bg: 'bg-[#FFEDD5]', practical: 24, theory: 38, professional: 8, participation: 8, total: 78, status: 'Complete' },
  { id: 4, name: 'Liya Tadesse', station: 'Station 04', studentId: 'HOB - ST - 2026-0832', initials: 'LT', bg: 'bg-[#DCFCE7]', practical: 26, theory: 41, professional: 8, participation: 9, total: 84, status: 'Complete' },
  { id: 5, name: 'Bethel Girma', station: 'Station 05', studentId: 'HOB - ST - 2026-0827', initials: 'BG', bg: 'bg-[#DBEAFE]', practical: 25, theory: 40, professional: 8, participation: 8, total: 81, status: 'Complete' },
  { id: 6, name: 'Ruth Alemu', station: 'Station 06', studentId: 'HOB - ST - 2026-0824', initials: 'RA', bg: 'bg-[#FCE7F3]', practical: 22, theory: 35, professional: 7, participation: 7, total: 71, status: 'Complete' },
  { id: 7, name: 'Selamawit Kebede', station: 'Station 07', studentId: 'HOB - ST - 2026-0821', initials: 'SK', bg: 'bg-[#DCFCE7]', practical: 29, theory: 46, professional: 10, participation: 9, total: 94, status: 'Complete' },
  { id: 8, name: 'Marta Tesfaye', station: 'Station 08', studentId: 'HOB - ST - 2026-0818', initials: 'MT', bg: 'bg-[#F3E8FF]', practical: 26, theory: 42, professional: 9, participation: 9, total: 86, status: 'Complete' },
  { id: 9, name: 'Eden Worku', station: 'Station 09', studentId: 'HOB - ST - 2026-0815', initials: 'EW', bg: 'bg-[#FCE7F3]', practical: 24, theory: 39, professional: 8, participation: 8, total: 79, status: 'Complete' },
  { id: 10, name: 'Rahel Bekele', station: 'Station 10', studentId: 'HOB - ST - 2026-0814', initials: 'RB', bg: 'bg-[#FEE2E2]', practical: null, theory: null, professional: null, participation: null, total: '-', status: 'Not marked' },
  { id: 11, name: 'Bethlehem Alemu', station: 'Station 11', studentId: 'HOB - ST - 2026-0812', initials: 'BA', bg: 'bg-[#DCFCE7]', practical: 25, theory: 40, professional: 8, participation: 9, total: 82, status: 'Complete' },
  { id: 12, name: 'Yordanos Tesfaye', station: 'Station 12', studentId: 'HOB - ST - 2026-0810', initials: 'YT', bg: 'bg-[#F3E8FF]', practical: 23, theory: 37, professional: 8, participation: 8, total: 76, status: 'Complete' },
  { id: 13, name: 'Kalkidan Girma', station: 'Station 13', studentId: 'HOB - ST - 2026-0808', initials: 'KG', bg: 'bg-[#FFEDD5]', practical: 35, error: 'Max 0-30', theory: 44, professional: 9, participation: null, total: '-', status: 'Incomplete' },
  { id: 14, name: 'Ruth Tadesse', station: 'Station 14', studentId: 'HOB - ST - 2026-0806', initials: 'RT', bg: 'bg-[#FCE7F3]', practical: 26, theory: 42, professional: 9, participation: 9, total: 86, status: 'Complete' },
  { id: 15, name: 'Selamawit Alemu', station: 'Station 15', studentId: 'HOB - ST - 2026-0805', initials: 'SA', bg: 'bg-[#FFEDD5]', practical: 27, theory: 44, professional: 9, participation: 10, total: 90, status: 'Complete' },
  { id: 16, name: 'Meron Bekele', station: 'Station 16', studentId: 'HOB - ST - 2026-0804', initials: 'MB', bg: 'bg-[#F1F5F9]', practical: null, theory: null, professional: null, participation: null, total: '-', status: 'Not marked' },
  { id: 17, name: 'Hana Girma', station: 'Station 17', studentId: 'HOB - ST - 2026-0803', initials: 'HG', bg: 'bg-[#FFEDD5]', practical: null, theory: null, professional: null, participation: null, total: '-', status: 'Not marked' },
  { id: 18, name: 'Sara Tesfaye', station: 'Station 18', studentId: 'HOB - ST - 2026-0802', initials: 'ST', bg: 'bg-[#F1F5F9]', practical: null, theory: null, professional: null, participation: null, total: '-', status: 'Not marked' }
];

const StatusBadge = ({ status }) => {
  if (status === 'Complete') {
    return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#047857] border border-[#D1FAE5]">Complete</span>;
  }
  if (status === 'Incomplete') {
    return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-white text-[#EF4444] border border-[#EF4444]">Incomplete</span>;
  }
  return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] text-gray-500 border border-gray-200">Not marked</span>;
};

const InputCell = ({ value, error }) => {
  const isError = !!error;
  return (
    <div className="relative w-[50px] mx-auto">
      <input 
        type="text"
        className={`w-full h-8 text-center text-[13px] font-medium rounded-md border focus:outline-none focus:ring-1 transition-colors ${
          isError 
            ? 'border-[#EF4444] bg-[#FEF2F2] text-[#EF4444] focus:ring-[#EF4444]' 
            : 'border-gray-200 text-[#1A1A1A] focus:border-gray-400 focus:ring-gray-400'
        }`}
        defaultValue={value === null ? '-' : value}
      />
      {isError && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#EF4444] whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

const TeacherMarksTableSection = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Midterm Assessment Marks Entry</h2>
          <p className="text-[13px] text-gray-500">Enter direct scores for each criterion. Total and status compute dynamically.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F9FAFB] border border-gray-200 px-3 py-1.5 rounded-md text-[13px] text-gray-500 font-medium">
          <Keyboard className="w-4 h-4 text-gray-400" />
          Keyboard Navigation: Tab through cells across categories
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="relative w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <button className="px-3 py-1.5 rounded-md border border-gray-200 text-[#1A1A1A] bg-white hover:bg-gray-50 transition-colors">All (18)</button>
          <button className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">Not marked (5)</button>
          <button className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">Incomplete (1)</button>
          <button className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">Complete (12)</button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6 font-bold">STUDENT</th>
              <th className="py-3 px-6 font-bold">STUDENT ID</th>
              <th className="py-3 px-4 font-bold text-center">PRACTICAL<br/><span className="text-[9px] font-normal lowercase text-gray-400">/ 30</span></th>
              <th className="py-3 px-4 font-bold text-center">THEORY<br/><span className="text-[9px] font-normal lowercase text-gray-400">/ 50</span></th>
              <th className="py-3 px-4 font-bold text-center">PROFESSIONAL<br/><span className="text-[9px] font-normal lowercase text-gray-400">/ 10</span></th>
              <th className="py-3 px-4 font-bold text-center">PARTICIPATION<br/><span className="text-[9px] font-normal lowercase text-gray-400">/ 10</span></th>
              <th className="py-3 px-4 font-bold text-center">TOTAL<br/><span className="text-[9px] font-normal lowercase text-gray-400">/ 100</span></th>
              <th className="py-3 px-6 font-bold text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${s.bg} flex items-center justify-center text-[11px] font-bold text-gray-700 shrink-0`}>
                      {s.initials}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1A1A1A]">{s.name}</div>
                      <div className="text-[11px] text-gray-400">{s.station}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-[13px] text-gray-600 font-medium">
                  {s.studentId}
                </td>
                <td className="py-3 px-4">
                  <InputCell value={s.practical} error={s.error} />
                </td>
                <td className="py-3 px-4">
                  <InputCell value={s.theory} />
                </td>
                <td className="py-3 px-4">
                  <InputCell value={s.professional} />
                </td>
                <td className="py-3 px-4">
                  <InputCell value={s.participation} />
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`text-[14px] font-bold ${s.total === '-' ? 'text-gray-400' : 'text-[#1A1A1A]'}`}>
                    {s.total}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherMarksTableSection;

