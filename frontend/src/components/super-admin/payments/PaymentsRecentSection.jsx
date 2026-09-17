import React from 'react';
import PaymentsFilterBar from './PaymentsFilterBar';
import PaymentsTableRow from './PaymentsTableRow';
import PaymentsPagination from './PaymentsPagination';

const paymentData = [
  {
    initials: 'MT',
    avatarBg: 'bg-[#f5ebd7] text-[#966b3b]',
    name: 'Mekdes Tesfaye',
    ref: 'PAY-8840',
    program: 'Professional Makeup Artistry',
    amount: 'ETB 25,000',
    paymentDate: 'Sep 7, 2026',
    status: 'Pending',
  },
  {
    initials: 'SA',
    avatarBg: 'bg-[#e6e7e1] text-[#4b5563]',
    name: 'Saron Alemu',
    ref: 'PAY-8841',
    program: 'Bridal Makeup Mastery',
    amount: 'ETB 20,000',
    paymentDate: 'Sep 6, 2026',
    status: 'Needs attention',
  },
  {
    initials: 'HE',
    avatarBg: 'bg-[#dce3d6] text-[#3e5f41]',
    name: 'Hana Example',
    ref: 'PAY-8839',
    program: 'Professional Makeup Artistry',
    amount: 'ETB 25,000',
    paymentDate: 'Sep 5, 2026',
    status: 'Received',
  },
  {
    initials: 'SE',
    avatarBg: 'bg-[#f5ebd7] text-[#966b3b]',
    name: 'Sandra Example',
    ref: 'PAY-8838',
    program: 'Beauty Foundations',
    amount: 'ETB 15,000',
    paymentDate: 'Sep 4, 2025',
    status: 'Received',
  },
  {
    initials: 'RE',
    avatarBg: 'bg-[#dce3d6] text-[#3e5f41]',
    name: 'Ruth Example',
    ref: 'PAY-8837',
    program: 'Professional Makeup Artistry',
    amount: 'ETB 25,000',
    paymentDate: 'Sep 3, 2026',
    status: 'Pending',
  },
];

export default function PaymentsRecentSection() {
  return (
    <div>
      {/* Section Title */}
      <h2 className="text-xl font-bold text-[#111827] mb-5">
        Recent payments
      </h2>

      {/* Filter Bar */}
      <PaymentsFilterBar />

      {/* Count + Sort row */}
      <div className="flex items-center justify-between mb-2 mt-1">
        <span className="text-xs text-[#6b7280]">
          Showing 5 of 24 payments
        </span>
        <span className="text-xs text-[#6b7280]">
          Sort: <span className="font-semibold text-[#374151]">Most recent</span>
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8eadf] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8eadf]">
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Student
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Program
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Payment date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((student, index) => (
              <PaymentsTableRow key={index} student={student} />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 pb-4">
          <PaymentsPagination />
        </div>
      </div>
    </div>
  );
}
