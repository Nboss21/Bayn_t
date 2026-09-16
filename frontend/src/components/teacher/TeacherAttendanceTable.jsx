import React from 'react';

const studentsData = [
  { id: 1, name: 'Mekdes Tesfaye', initials: 'MT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 01', studentId: 'HOB-ST-2026-0041', status: 'Present' },
  { id: 2, name: 'Hana Bekele', initials: 'HB', avatarBg: 'bg-[#F3F4F6]', station: 'Station 02', studentId: 'HOB-ST-2026-0038', status: 'Present' },
  { id: 3, name: 'Saron Alemu', initials: 'SA', avatarBg: 'bg-[#FEF5D9]', station: 'Station 03', studentId: 'HOB-ST-2026-0035', status: 'Present' },
  { id: 4, name: 'Liya Tadesse', initials: 'LT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 04', studentId: 'HOB-ST-2026-0029', status: 'Present' },
  { id: 5, name: 'Bethel Girma', initials: 'BG', avatarBg: 'bg-[#E0F2FE]', station: 'Station 05', studentId: 'HOB-ST-2026-0027', status: 'Present' },
  { id: 6, name: 'Ruth Alemu', initials: 'RA', avatarBg: 'bg-[#FEE4E2]', station: 'Station 06', studentId: 'HOB-ST-2026-0024', status: 'Absent' },
  { id: 7, name: 'Selamawit Kebede', initials: 'SK', avatarBg: 'bg-[#F3F4F6]', station: 'Station 07', studentId: 'HOB-ST-2026-0021', status: 'Present' },
  { id: 8, name: 'Marta Tesfaye', initials: 'MT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 08', studentId: 'HOB-ST-2026-0018', status: 'Present' },
  { id: 9, name: 'Eden Worku', initials: 'EW', avatarBg: 'bg-[#F3E8FF]', station: 'Station 09', studentId: 'HOB-ST-2026-0016', status: 'Present' },
  { id: 10, name: 'Rahel Bekele', initials: 'RB', avatarBg: 'bg-[#FCE7F3]', station: 'Station 10', studentId: 'HOB-ST-2026-0014', status: 'Absent' },
  { id: 11, name: 'Bethlehem Alemu', initials: 'BA', avatarBg: 'bg-[#EAF4EC]', station: 'Station 11', studentId: 'HOB-ST-2026-0012', status: 'Present' },
  { id: 12, name: 'Yordanos Tesfaye', initials: 'YT', avatarBg: 'bg-[#EAF4EC]', station: 'Station 12', studentId: 'HOB-ST-2026-0010', status: 'Present' },
  { id: 13, name: 'Kalkidan Girma', initials: 'KG', avatarBg: 'bg-[#FFEDD5]', station: 'Station 13', studentId: 'HOB-ST-2026-0008', status: 'Present' },
  { id: 14, name: 'Ruth Tadesse', initials: 'RT', avatarBg: 'bg-[#F3F4F6]', station: 'Station 14', studentId: 'HOB-ST-2026-0006', status: 'Present' },
  { id: 15, name: 'Selamawit Alemu', initials: 'SA', avatarBg: 'bg-[#F3F4F6]', station: 'Station 15', studentId: 'HOB-ST-2026-0005', status: 'Present' },
  { id: 16, name: 'Meron Bekele', initials: 'MB', avatarBg: 'bg-[#F3F4F6]', station: 'Station 16', studentId: 'HOB-ST-2026-0004', status: 'Unmarked' },
  { id: 17, name: 'Hana Girma', initials: 'HG', avatarBg: 'bg-[#F3F4F6]', station: 'Station 17', studentId: 'HOB-ST-2026-0003', status: 'Unmarked' },
  { id: 18, name: 'Sara Tesfaye', initials: 'ST', avatarBg: 'bg-[#F3F4F6]', station: 'Station 18', studentId: 'HOB-ST-2026-0002', status: 'Unmarked' },
];

const SegmentedControl = ({ status }) => {
  return (
    <div className="bg-[#F4F5F4] p-1 rounded-lg inline-flex items-center gap-1">
      <button 
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Present' ? 'bg-[#345243] text-white shadow-sm' : 'text-gray-500'}`}
      >
        Present
      </button>
      <button 
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Absent' ? 'bg-[#C03727] text-white shadow-sm' : 'text-gray-500'}`}
      >
        Absent
      </button>
      <button 
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Excused' ? 'bg-[#2E90FA] text-white shadow-sm' : 'text-gray-500'}`}
      >
        Excused
      </button>
    </div>
  );
};

const TeacherAttendanceTable = () => {
  return (
    <div className="w-full pb-20">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 pl-0 pr-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[300px]">Student</th>
            <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Student ID</th>
            <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Attendance Status</th>
            <th className="py-3 pl-4 pr-0 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Session Note</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => {
            const isUnmarked = student.status === 'Unmarked';
            const rowBg = isUnmarked ? 'bg-[#FFFAEB]' : 'bg-transparent';
            
            return (
              <tr key={student.id} className={`border-b border-gray-100 last:border-none ${rowBg}`}>
                <td className="py-3 pl-0 pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-semibold text-gray-700 ${student.avatarBg}`}>
                      {student.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#1A1A1A]">{student.name}</div>
                      <div className="text-[12px] text-gray-400">{student.station}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-[13px] text-gray-500 font-mono">
                  {student.studentId}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <SegmentedControl status={student.status} />
                    {isUnmarked && (
                      <div className="bg-[#FEF9EA] text-[#B87A13] px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap">
                        Not marked
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 pl-4 pr-0">
                  {isUnmarked ? (
                    <button className="text-[#2F6B43] text-[13px] font-medium hover:underline">
                      + Add note
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAttendanceTable;
