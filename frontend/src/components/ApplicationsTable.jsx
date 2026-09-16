import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationsTable = ({ rows }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 mb-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">APPLICANT</th>
              <th className="px-6 py-4 font-semibold">PROGRAM</th>
              <th className="px-6 py-4 font-semibold">SUBMITTED</th>
              <th className="px-6 py-4 font-semibold">STATUS</th>
              <th className="px-6 py-4 font-semibold">PAYMENT</th>
              <th className="px-6 py-4 font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((app) => (
              <tr
                key={app.id}
                onClick={() => navigate(`/registrar/applications/${app.id}`)}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f2f4ec] flex items-center justify-center text-[13px] font-medium text-gray-700 shrink-0">
                      {app.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-800">{app.name}</p>
                      <p className="text-[13px] text-gray-500 mt-0.5">{app.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] text-gray-600 max-w-[200px] leading-tight">
                    {app.program}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] text-gray-600">{app.submitted}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium ${app.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${app.statusIconColor}`}></span>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-[14px] font-medium ${app.paymentColor}`}>
                    {app.paymentDot && <span className={`w-1.5 h-1.5 rounded-full ${app.paymentDotColor || 'bg-[#f59e0b]'}`}></span>}
                    {app.payment}
                  </span>
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <p className="text-[15px] font-medium text-gray-700 mb-1">No applications found</p>
                  <p className="text-[13px] text-gray-500">Try adjusting your search or filter selection.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;