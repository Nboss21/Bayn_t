import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { adminService } from '../../services/applicationService';
import { toUserMessage } from '../../services/api';

const roleLabel = (role) => ({ super_admin: 'Super Admin', registrar: 'Registrar', teacher: 'Teacher', student: 'Student' }[role] || 'No role assigned');

export default function SuperAdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    adminService.user(id).then((record) => { if (active) setUser(record); }).catch((err) => { if (active) setError(toUserMessage(err)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="w-full"><div className="h-6 w-32 bg-gray-100 rounded mb-6 animate-pulse" /><div className="h-48 bg-gray-100 rounded-xl animate-pulse" /></div>;
  if (error || !user) return <div className="flex flex-col items-center justify-center h-full py-20"><p className="text-[16px] text-[#6b7280] mb-4">{error || 'User not found'}</p><button onClick={() => navigate('/super-admin/users')} className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb]">Back to Users</button></div>;

  const isActive = Boolean(user.is_active);
  const updated = user.updated_at ? new Date(user.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never';
  return (
    <div className="w-full pb-12">
      <button onClick={() => navigate('/super-admin/users')} className="flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-[#111827] mb-6"><ArrowLeft className="w-4 h-4" />Back to Users</button>
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center text-xl font-semibold text-[#374151]">{(user.name || 'User').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-[#111827]">{user.name}</h1><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-[#def7ec] text-[#03543f]' : 'bg-[#fef3c7] text-[#92400e]'}`}><span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#059669]' : 'bg-[#d97706]'}`} />{isActive ? 'Active' : 'Inactive'}</span></div><p className="text-sm text-[#6b7280] mt-1">{user.role_label || roleLabel(user.role)}</p></div></div>
          <button onClick={() => navigate('/super-admin/users')} className="px-4 py-2 text-sm font-medium rounded-lg bg-[#111827] text-white hover:bg-black">Back to Users</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e7eb]"><div className="bg-white px-8 py-5"><div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">User ID</div><div className="text-[15px] font-medium text-[#111827]">{user.id}</div></div><div className="bg-white px-8 py-5"><div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Email</div><div className="text-[15px] font-medium text-[#111827] flex items-center gap-2"><Mail className="w-4 h-4 text-[#9ca3af]" />{user.email}</div></div><div className="bg-white px-8 py-5"><div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Last account update</div><div className="text-[15px] font-medium text-[#111827]">{updated}</div></div></div>
        {user.programs?.length > 0 && <div className="px-8 py-6 border-t border-[#e5e7eb]"><div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3">Assigned programs</div><div className="flex flex-wrap gap-2">{user.programs.map((program) => <span key={program.id} className="rounded-full bg-[#f3f7ef] px-3 py-1.5 text-sm text-[#345243]">{program.name}</span>)}</div></div>}
      </div>
    </div>
  );
}
