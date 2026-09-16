import React from 'react';
import { Search, Keyboard } from 'lucide-react';
import { MARK_FIELDS, MAX_MARKS, isEmptyMark } from '../../utils/marks';

const StatusBadge = ({ status }) => {
  if (status === 'Complete') {
    return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#047857] border border-[#D1FAE5]">Complete</span>;
  }
  if (status === 'Incomplete') {
    return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-white text-[#EF4444] border border-[#EF4444]">Incomplete</span>;
  }
  return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] text-gray-500 border border-gray-200">Not marked</span>;
};

const InputCell = ({ value, error, max, onInputChange }) => {
  const isError = !!error;
  return (
    <div className="relative w-[50px] mx-auto">
      <input 
        type="text"
        value={isEmptyMark(value) ? '' : value}
        onChange={(e) => onInputChange(e.target.value === '' ? null : e.target.value)}
        className={`w-full h-8 text-center text-[13px] font-medium rounded-md border focus:outline-none focus:ring-1 transition-colors ${
          isError 
            ? 'border-[#EF4444] bg-[#FEF2F2] text-[#EF4444] focus:ring-[#EF4444]' 
            : 'border-gray-200 text-[#1A1A1A] focus:border-gray-400 focus:ring-gray-400'
        }`}
      />
      {isError && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#EF4444] whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

const TeacherMarksTableSection = ({
  assessmentName,
  categories,
  students,
  onInputChange,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filterCounts,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">{assessmentName} Marks Entry</h2>
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
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <button
            onClick={() => onFilterChange('All')}
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              activeFilter === 'All'
                ? 'border-gray-200 text-[#1A1A1A] bg-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            All ({filterCounts.all})
          </button>
          <button
            onClick={() => onFilterChange('Not marked')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeFilter === 'Not marked' ? 'bg-gray-100 text-[#1A1A1A]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Not marked ({filterCounts.notMarked})
          </button>
          <button
            onClick={() => onFilterChange('Incomplete')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeFilter === 'Incomplete' ? 'bg-red-50 text-[#EF4444]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Incomplete ({filterCounts.incomplete})
          </button>
          <button
            onClick={() => onFilterChange('Complete')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeFilter === 'Complete' ? 'bg-green-50 text-[#047857]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Complete ({filterCounts.complete})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6 font-bold">STUDENT</th>
              <th className="py-3 px-6 font-bold">STUDENT ID</th>
              {categories.map((cat) => (
                <th key={cat.id} className="py-3 px-4 font-bold text-center">
                  {cat.label}
                  <br />
                  <span className="text-[9px] font-normal lowercase text-gray-400">/ {cat.points}</span>
                </th>
              ))}
              <th className="py-3 px-4 font-bold text-center">TOTAL<br /><span className="text-[9px] font-normal lowercase text-gray-400">/ 100</span></th>
              <th className="py-3 px-6 font-bold text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${row.bg} flex items-center justify-center text-[11px] font-bold text-gray-700 shrink-0`}>
                      {row.initials}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1A1A1A]">{row.name}</div>
                      <div className="text-[11px] text-gray-400">{row.station}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-[13px] text-gray-600 font-medium">
                  {row.studentId}
                </td>
                {MARK_FIELDS.map((field) => (
                  <td key={field} className="py-3 px-4">
                    <InputCell
                      value={row[field]}
                      error={row.error?.[field]}
                      max={MAX_MARKS[field]}
                      onInputChange={(value) => onInputChange(row.id, field, value)}
                    />
                  </td>
                ))}
                <td className="py-3 px-4 text-center">
                  <span className={`text-[14px] font-bold ${row.total === '-' ? 'text-gray-400' : 'text-[#1A1A1A]'}`}>
                    {row.total}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <StatusBadge status={row.status} />
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