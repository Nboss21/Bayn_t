import React from 'react';
import { User, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ROW_LABEL = 'w-16 text-[#6b7280] text-sm shrink-0';
const ROW_VALUE = 'text-sm text-[#111827] font-medium';

export default function PersonalInformationCard() {
  const { user } = useAuth();

  const name = user?.name || '—';
  const email = user?.email || '—';
  const phone = user?.phone || 'Not set';
  const roleLabel = user?.role_label || user?.role || '—';
  const isActive = user?.is_active !== false;

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#111827]">Personal Information</h2>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-[#e6f4ea] text-[#166534] border border-[#bbf7d0]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="border-t border-[#e5e7eb] pt-6 flex items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-[#d5e0d5] flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-[#4A5D4E]">
            {name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-[#111827]">{name}</h3>
          <div className="flex items-center gap-3">
            <span className={ROW_LABEL}>Email</span>
            <span className={ROW_VALUE}>{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={ROW_LABEL}>Phone</span>
            <span className={phone === 'Not set' ? 'text-sm text-[#9ca3af] italic' : ROW_VALUE}>{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={ROW_LABEL}>Role</span>
            <span className={`${ROW_VALUE} inline-flex items-center px-2 py-0.5 rounded bg-[#f3f4f6] text-[#374151] text-xs font-semibold uppercase tracking-wide`}>
              {roleLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-3">
        <Info className="w-4 h-4 text-[#9ca3af] shrink-0 mt-0.5" />
        <p className="text-xs text-[#6b7280] leading-relaxed">
          To update your name, email, or phone, contact a Super Admin. Password changes can be done below.
        </p>
      </div>
    </div>
  );
}