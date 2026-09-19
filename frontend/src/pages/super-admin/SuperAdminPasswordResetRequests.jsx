import { useEffect, useState } from 'react';
import { Check, Copy, KeyRound, RefreshCw, X } from 'lucide-react';
import { adminService } from '../../services/applicationService';
import { toUserMessage } from '../../services/api';

export default function SuperAdminPasswordResetRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(null);
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [result, setResult] = useState('');

  const load = () => {
    setLoading(true); setError('');
    adminService.passwordResetRequests({ per_page: 100 })
      .then((data) => setRequests(data?.data || data || []))
      .catch((err) => setError(toUserMessage(err, 'Could not load password reset requests.')))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const approve = async (item) => {
    setBusy(item.id); setError(''); setResult('');
    try {
      const response = await adminService.approvePasswordReset(item.id, temporaryPassword ? { temporary_password: temporaryPassword } : {});
      setResult(`Temporary password for ${item.name}: ${response.temporary_password}`);
      setTemporaryPassword(''); load();
    } catch (err) { setError(err?.errors ? Object.values(err.errors).flat().join(' ') : toUserMessage(err, 'Could not approve the request.')); }
    finally { setBusy(null); }
  };

  const reject = async (item) => {
    const comment = window.prompt('Optional reason for rejecting this request:') || '';
    setBusy(item.id); setError('');
    try { await adminService.rejectPasswordReset(item.id, { admin_comment: comment }); load(); }
    catch (err) { setError(toUserMessage(err, 'Could not reject the request.')); }
    finally { setBusy(null); }
  };

  return <div className="w-full pb-12">
    <div className="mb-7 flex items-start justify-between gap-4"><div><p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8b7350]">Account security</p><h1 className="text-2xl font-semibold text-[#111827]">Password reset requests</h1><p className="mt-1 text-sm text-gray-500">Review identity details before issuing a temporary password.</p></div><button onClick={load} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"><RefreshCw size={15} /> Refresh</button></div>
    {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    {result && <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>{result} <strong>Copy it now; it will not be shown again.</strong></span><button onClick={() => navigator.clipboard?.writeText(result.split(': ').pop())} className="flex shrink-0 items-center gap-1 rounded border border-amber-300 px-2 py-1"><Copy size={14} /> Copy</button></div>}
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"><div className="border-b border-gray-200 px-6 py-4"><h2 className="font-semibold text-gray-900">Requests</h2></div>{loading ? <p className="p-6 text-sm text-gray-500">Loading…</p> : requests.length === 0 ? <p className="p-6 text-sm text-gray-500">There are no password reset requests.</p> : <div className="divide-y divide-gray-100">{requests.map((item) => <div key={item.id} className="p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2"><KeyRound size={16} className="text-[#647b5c]" /><h3 className="font-semibold text-gray-900">{item.name || item.email}</h3><span className={`rounded-full px-2 py-0.5 text-xs ${item.status === 'pending' ? 'bg-amber-100 text-amber-800' : item.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{item.status}</span></div><p className="mt-1 text-sm text-gray-600">{item.email} · {item.phone || 'No phone provided'} · {item.role || 'Unknown role'}</p><p className="mt-1 text-xs text-gray-400">Requested {new Date(item.created_at).toLocaleString()}</p></div>{item.status === 'pending' && <div className="flex flex-wrap items-center justify-end gap-2"><input value={temporaryPassword} onChange={(e) => setTemporaryPassword(e.target.value)} placeholder="Optional temporary password" minLength={8} className="rounded-lg border border-gray-300 px-3 py-2 text-xs" /><button disabled={busy === item.id} onClick={() => approve(item)} className="flex items-center gap-1 rounded-lg bg-[#b3c9a6] px-3 py-2 text-sm font-medium text-[#1d2b20] disabled:opacity-60"><Check size={15} /> Approve</button><button disabled={busy === item.id} onClick={() => reject(item)} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 disabled:opacity-60"><X size={15} /> Reject</button></div>}</div>{item.admin_comment && <p className="mt-3 rounded bg-gray-50 px-3 py-2 text-sm text-gray-600">{item.admin_comment}</p>}</div>)}</div>}</div>
  </div>;
}
