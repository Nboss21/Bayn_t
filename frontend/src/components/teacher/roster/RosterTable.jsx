import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const studentsData = [
  { id: 1,  name: 'Mekdes Tesfaye',     initials: 'MT', avatarBg: 'bg-[#EAF4EC]', studentId: 'HOB-ST-2026-0041', attendance: 92, marks: 84, status: 'On Track' },
  { id: 2,  name: 'Hana Bekele',        initials: 'HB', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0038', attendance: 96, marks: 85, status: 'On Track' },
  { id: 3,  name: 'Saron Alemu',        initials: 'SA', avatarBg: 'bg-[#FEF5D9]', studentId: 'HOB-ST-2026-0035', attendance: 88, marks: 76, status: 'Needs Attention' },
  { id: 4,  name: 'Liya Tadesse',       initials: 'LT', avatarBg: 'bg-[#EAF4EC]', studentId: 'HOB-ST-2026-0029', attendance: 94, marks: 82, status: 'On Track' },
  { id: 5,  name: 'Bethel Girma',       initials: 'BG', avatarBg: 'bg-[#E0F2FE]', studentId: 'HOB-ST-2026-0027', attendance: 90, marks: 79, status: 'On Track' },
  { id: 6,  name: 'Ruth Alemu',         initials: 'RA', avatarBg: 'bg-[#FEE4E2]', studentId: 'HOB-ST-2026-0024', attendance: 80, marks: 71, status: 'Needs Attention' },
  { id: 7,  name: 'Selamawit Kebede',   initials: 'SK', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0021', attendance: 98, marks: 91, status: 'On Track' },
  { id: 8,  name: 'Marta Tesfaye',      initials: 'MT', avatarBg: 'bg-[#EAF4EC]', studentId: 'HOB-ST-2026-0018', attendance: 95, marks: 87, status: 'On Track' },
  { id: 9,  name: 'Eden Worku',         initials: 'EW', avatarBg: 'bg-[#F3E8FF]', studentId: 'HOB-ST-2026-0016', attendance: 91, marks: 86, status: 'On Track' },
  { id: 10, name: 'Rahel Bekele',       initials: 'RB', avatarBg: 'bg-[#FCE7F3]', studentId: 'HOB-ST-2026-0014', attendance: 80, marks: 80, status: 'On Track' },
  { id: 11, name: 'Bethlehem Alemu',    initials: 'BA', avatarBg: 'bg-[#EAF4EC]', studentId: 'HOB-ST-2026-0012', attendance: 93, marks: 86, status: 'On Track' },
  { id: 12, name: 'Yordanos Tesfaye',   initials: 'YT', avatarBg: 'bg-[#EAF4EC]', studentId: 'HOB-ST-2026-0010', attendance: 90, marks: 81, status: 'On Track' },
  { id: 13, name: 'Kalkidan Girma',     initials: 'KG', avatarBg: 'bg-[#FFEDD5]', studentId: 'HOB-ST-2026-0008', attendance: 94, marks: 88, status: 'On Track' },
  { id: 14, name: 'Ruth Tadesse',       initials: 'RT', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0006', attendance: 96, marks: 90, status: 'On Track' },
  { id: 15, name: 'Selamawit Alemu',    initials: 'SA', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0005', attendance: 97, marks: 92, status: 'On Track' },
  { id: 16, name: 'Meron Bekele',       initials: 'MB', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0004', attendance: 92, marks: 83, status: 'On Track' },
  { id: 17, name: 'Hana Girma',         initials: 'HG', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0003', attendance: 91, marks: 82, status: 'On Track' },
  { id: 18, name: 'Sara Tesfaye',       initials: 'ST', avatarBg: 'bg-[#F3F4F6]', studentId: 'HOB-ST-2026-0002', attendance: 93, marks: 84, status: 'On Track' },
];

const AttendanceBar = ({ value }) => {
  const color =
    value >= 90 ? 'bg-[#4A7C59]' :
    value >= 75 ? 'bg-[#D4A373]' :
    'bg-[#E57373]';

  return (
    <div className="flex items-center gap-2">
      <span className="text-[14px] font-medium text-[#1A1A1A] w-8">{value}%</span>
      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  if (status === 'On Track') {
    return (
      <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#2F6B43]">
        <span className="w-2 h-2 rounded-full bg-[#4A7C59] inline-block" />
        On Track
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#B45309]">
      <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block" />
      Needs Attention
    </span>
  );
};

const RosterTable = ({ students }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-[#FAFAFA]">
            <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-gray-400 w-[260px]">Student</th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Student ID</th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Overall Attendance</th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Current Marks</th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Progress Status</th>
            <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-gray-100 last:border-none hover:bg-[#FAFFF9] transition-colors">
              {/* Student */}
              <td className="py-3 px-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-gray-700 flex-shrink-0 ${student.avatarBg}`}>
                    {student.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1A1A1A] leading-tight">{student.name}</p>
                    <p className="text-[12px] text-gray-400">Station {String(student.id).padStart(2, '0')}</p>
                  </div>
                </div>
              </td>

              {/* Student ID */}
              <td className="py-3 px-4 text-[12px] text-gray-500 font-mono whitespace-nowrap">
                {student.studentId}
              </td>

              {/* Attendance */}
              <td className="py-3 px-4">
                <AttendanceBar value={student.attendance} />
              </td>

              {/* Marks */}
              <td className="py-3 px-4 text-[14px] font-medium text-[#1A1A1A]">
                {student.marks}%
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                <StatusBadge status={student.status} />
              </td>

              {/* Action */}
              <td className="py-3 px-5 text-right">
                <button
                  onClick={() => navigate(`/teacher/roster/${student.id}`)}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2F4F3A] hover:text-[#1E3328] border border-[#C8DBC0] hover:border-[#2F4F3A] bg-white px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                >
                  View Student
                  <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RosterTable;

