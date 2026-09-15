import React from 'react';
import { useNavigate } from 'react-router-dom';

const applicationsData = [
  {
    id: 'HOB-2026-0142',
    name: 'Mekdes Tesfaye',
    initials: 'MT',
    program: 'Professional Makeup Artistry',
    submitted: 'Today, 9:42 AM',
    status: 'Needs Review',
    statusColor: 'bg-[#fef3c7] text-[#b45309]',
    statusIconColor: 'bg-[#f59e0b]',
    payment: 'Paid',
    paymentColor: 'text-[#16a34a]'
  },
  {
    id: 'HOB-2026-0141',
    name: 'Hana Bekele',
    initials: 'HB',
    program: 'Bridal Makeup Professional',
    submitted: 'Today, 8:15 AM',
    status: 'Awaiting Information',
    statusColor: 'bg-[#e0f2fe] text-[#0369a1]',
    statusIconColor: 'bg-[#0ea5e9]',
    payment: 'Paid',
    paymentColor: 'text-[#16a34a]'
  },
  {
    id: 'HOB-2026-0139',
    name: 'Saron Alemu',
    initials: 'SA',
    program: 'Professional Makeup Artistry',
    submitted: 'Yesterday, 4:36 PM',
    status: 'Approved',
    statusColor: 'bg-[#dcfce7] text-[#15803d]',
    statusIconColor: 'bg-[#22c55e]',
    payment: 'Paid',
    paymentColor: 'text-[#16a34a]'
  },
  {
    id: 'HOB-2026-0138',
    name: 'Liya Tadesse',
    initials: 'LT',
    program: 'Beauty & Makeup Fundamentals',
    submitted: 'Yesterday, 1:12 PM',
    status: 'Needs Review',
    statusColor: 'bg-[#fef3c7] text-[#b45309]',
    statusIconColor: 'bg-[#f59e0b]',
    payment: 'Payment Pending',
    paymentColor: 'text-[#b45309]',
    paymentDot: true
  },
  {
    id: 'HOB-2026-0135',
    name: 'Bethel Girma',
    initials: 'BG',
    program: 'Advanced Beauty Techniques',
    submitted: 'Mon, 11:08 AM',
    status: 'Approved',
    statusColor: 'bg-[#dcfce7] text-[#15803d]',
    statusIconColor: 'bg-[#22c55e]',
    payment: 'Paid',
    paymentColor: 'text-[#16a34a]'
  },
  {
    id: 'HOB-2026-0132',
    name: 'Meron Tadesse',
    initials: 'MT',
    program: 'Professional Makeup Artistry',
    submitted: 'Mon, 09:30 AM',
    status: 'Rejected',
    statusColor: 'bg-[#fee2e2] text-[#b91c1c]',
    statusIconColor: 'bg-[#ef4444]',
    payment: 'Unpaid',
    paymentColor: 'text-[#b91c1c]',
    paymentDot: true,
    paymentDotColor: 'bg-[#ef4444]'
  },
  {
    id: 'HOB-2026-0128',
    name: 'Rahel Worku',
    initials: 'RW',
    program: 'Bridal Makeup Professional',
    submitted: '12 Jul, 3:20 PM',
    status: 'Approved',
    statusColor: 'bg-[#dcfce7] text-[#15803d]',
    statusIconColor: 'bg-[#22c55e]',
    payment: 'Paid',
    paymentColor: 'text-[#16a34a]'
  }
];

const ApplicationsTable = () => {
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
            {applicationsData.map((app, index) => (
              <tr 
                key={index} 
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
                <td className="px-6 py-4">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
