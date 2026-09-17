import React from 'react';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  Pending: {
    dotColor: 'bg-[#e5a656]',
    textColor: 'text-[#b8862e]',
    bgColor: 'bg-[#fdf5e8]',
  },
  'Needs attention': {
    dotColor: 'bg-[#d95d28]',
    textColor: 'text-[#c45c2c]',
    bgColor: 'bg-[#fdeee4]',
  },
  Received: {
    dotColor: 'bg-[#487a55]',
    textColor: 'text-[#3a6944]',
    bgColor: 'bg-[#eaf2e6]',
  },
};

const actionConfig = {
  Pending: 'Review',
  'Needs attention': 'Review',
  Received: 'View',
};

export default function PaymentsTableRow({ student }) {
  const navigate = useNavigate();
  const status = statusConfig[student.status] || statusConfig.Pending;
  const actionLabel = actionConfig[student.status] || 'View';

  return (
    <tr className="border-b border-[#f0f1eb] last:border-b-0 hover:bg-[#fafbf7] transition-colors">
      {/* Student */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${student.avatarBg}`}
          >
            {student.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">{student.name}</p>
            <p className="text-[11px] text-[#9ca3af]">REF #{student.ref}</p>
          </div>
        </div>
      </td>

      {/* Program */}
      <td className="py-4 px-4">
        <span className="text-sm text-[#4b5563]">{student.program}</span>
      </td>

      {/* Amount */}
      <td className="py-4 px-4">
        <span className="text-sm font-bold text-[#111827]">{student.amount}</span>
      </td>

      {/* Payment date */}
      <td className="py-4 px-4">
        <span className="text-sm text-[#4b5563]">{student.paymentDate}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
          {student.status}
        </span>
      </td>

      {/* Action */}
      <td className="py-4 px-4 text-right">
        {actionLabel === 'Review' ? (
          <button 
            onClick={() => navigate(`/super-admin/payments/${student.ref}`)}
            className="px-4 py-1.5 rounded-lg bg-[#b4c3aa] hover:bg-[#a4b499] text-[#1f3120] font-semibold text-xs transition-colors"
          >
            {actionLabel}
          </button>
        ) : (
          <button className="px-4 py-1.5 rounded-lg border border-[#d1d5db] hover:bg-[#f3f4f6] text-[#374151] font-medium text-xs transition-colors cursor-pointer">
            {actionLabel}
          </button>
        )}
      </td>
    </tr>
  );
}
