import React from 'react';
import ClassesTableRow from './ClassesTableRow';
import classesData from '../data/classesData';

const ClassesTable = () => {
  return (
    <div className="border border-[#e5e7eb] rounded-lg overflow-hidden bg-white">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Program
            </th>
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Intake
            </th>
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Instructor
            </th>
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Schedule
            </th>
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Students / Capacity
            </th>
            <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-[#6b7280] tracking-wide">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {classesData.map((classItem) => (
            <ClassesTableRow key={classItem.id} classItem={classItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesTable;
