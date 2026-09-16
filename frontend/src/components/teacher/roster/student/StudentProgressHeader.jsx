import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, UserCircle2 } from 'lucide-react';

const StudentProgressHeader = ({ student }) => {
  return (
    <>
      {/* In-page breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-5">
        <LayoutGrid className="w-3.5 h-3.5" />
        <Link to="/teacher/classes" className="hover:text-gray-600 transition-colors">My Classes</Link>
        <span>/</span>
        <Link to="/teacher/roster" className="hover:text-gray-600 transition-colors">Class Roster</Link>
        <span>/</span>
        <span className="text-[#1A1A1A] font-medium">Student Progress</span>
      </div>

      {/* Student identity card */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-bold text-gray-700 flex-shrink-0 ${student.avatarBg}`}>
            {student.initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[22px] font-bold text-[#1A1A1A]">{student.name}</h1>
              <span className="bg-gray-100 text-gray-500 text-[11px] font-semibold px-2.5 py-1 rounded-md font-mono">
                {student.studentId}
              </span>
            </div>
            <p className="text-[13px] text-gray-400 mt-0.5">
              Professional Makeup Artistry · September 2026 · PMA Morning
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-lg transition-colors">
          <UserCircle2 className="w-4 h-4 text-gray-500" />
          View Student Profile
        </button>
      </div>
    </>
  );
};

export default StudentProgressHeader;

