import React, { useState } from 'react';

const SegmentedControl = ({ status, onStatusChange }) => {
  return (
    <div className="bg-[#F4F5F4] p-1 rounded-lg inline-flex items-center gap-1">
      <button 
        onClick={() => onStatusChange('Present')}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Present' ? 'bg-[#345243] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Present
      </button>
      <button 
        onClick={() => onStatusChange('Absent')}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Absent' ? 'bg-[#C03727] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Absent
      </button>
      <button 
        onClick={() => onStatusChange('Excused')}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${status === 'Excused' ? 'bg-[#2E90FA] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Excused
      </button>
    </div>
  );
};

const TeacherAttendanceTable = ({ students, onStatusChange, onNoteChange }) => {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});

  const handleNoteToggle = (studentId) => {
    if (editingNoteId === studentId) {
      onNoteChange(studentId, noteDrafts[studentId] || '');
      setEditingNoteId(null);
    } else {
      const student = students.find((s) => s.id === studentId);
      setNoteDrafts((prev) => ({ ...prev, [studentId]: student?.note || '' }));
      setEditingNoteId(studentId);
    }
  };

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
          {students.map((student) => {
            const isUnmarked = student.status === 'Unmarked';
            const rowBg = isUnmarked ? 'bg-[#FFFAEB]' : 'bg-transparent';
            
            return (
              <React.Fragment key={student.id}>
                <tr className={`border-b border-gray-100 last:border-none ${rowBg}`}>
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
                      <SegmentedControl
                        status={student.status}
                        onStatusChange={(newStatus) => onStatusChange(student.id, newStatus)}
                      />
                      {isUnmarked && (
                        <div className="bg-[#FEF9EA] text-[#B87A13] px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap">
                          Not marked
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pl-4 pr-0">
                    <button
                      onClick={() => handleNoteToggle(student.id)}
                      className="text-[#2F6B43] text-[13px] font-medium hover:underline"
                    >
                      {editingNoteId === student.id
                        ? 'Save note'
                        : student.note
                          ? 'Edit note'
                          : '+ Add note'}
                    </button>
                  </td>
                </tr>
                {editingNoteId === student.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-3">
                      <textarea
                        value={noteDrafts[student.id] || ''}
                        onChange={(e) =>
                          setNoteDrafts((prev) => ({ ...prev, [student.id]: e.target.value }))
                        }
                        placeholder="Add a session note..."
                        rows={2}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-300 resize-none"
                        autoFocus
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAttendanceTable;