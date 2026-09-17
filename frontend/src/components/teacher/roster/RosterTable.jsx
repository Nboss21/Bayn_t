import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

              <td className="py-3 px-4 text-[12px] text-gray-500 font-mono whitespace-nowrap">
                {student.studentId}
              </td>

              <td className="py-3 px-4">
                <AttendanceBar value={student.attendance} />
              </td>

              <td className="py-3 px-4 text-[14px] font-medium text-[#1A1A1A]">
                {student.marks}%
              </td>

              <td className="py-3 px-4">
                <StatusBadge status={student.status} />
              </td>

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