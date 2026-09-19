import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toUserMessage } from '../services/api';

export default function ForcedPasswordChangeModal() {
  const { user, changePassword, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!user?.must_change_password) return null;

  const submit = async (event) => {
    event.preventDefault(); setError('');
    if (password.length < 8) return setError('Your new password must be at least 8 characters.');
    if (password !== confirmation) return setError('The password confirmation does not match.');
    setBusy(true);
    try { await changePassword({ current_password: currentPassword, password, password_confirmation: confirmation }); }
    catch (err) { setError(err?.errors ? Object.values(err.errors).flat().join(' ') : toUserMessage(err, 'Could not change your password.')); }
    finally { setBusy(false); }
  };

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
      <div className="mb-5 flex items-center gap-3"><div className="rounded-full bg-[#e8f0e3] p-3 text-[#355e45]"><LockKeyhole /></div><div><h2 className="text-xl font-semibold text-gray-900">Create your password</h2><p className="text-sm text-gray-500">Your temporary password must be replaced before continuing.</p></div></div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <PasswordField label="Temporary password" value={currentPassword} onChange={setCurrentPassword} show={show} toggle={() => setShow(!show)} />
        <PasswordField label="New password" value={password} onChange={setPassword} show={show} toggle={() => setShow(!show)} />
        <PasswordField label="Confirm new password" value={confirmation} onChange={setConfirmation} show={show} toggle={() => setShow(!show)} />
        <p className="text-xs text-gray-500">Use at least 8 characters. Your new password must be different from the temporary password.</p>
        <button disabled={busy} className="w-full rounded-lg bg-[#b3c9a6] px-4 py-3 text-sm font-semibold text-[#1c2c20] disabled:opacity-60">{busy ? 'Saving…' : 'Save new password'}</button>
      </form>
      <button onClick={logout} className="mt-3 w-full text-sm text-gray-500 hover:text-gray-900">Sign out</button>
    </div>
  </div>;
}

function PasswordField({ label, value, onChange, show, toggle }) {
  return <label className="block text-sm font-medium text-gray-700">{label}<div className="relative mt-1"><input required type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-[#9db693] focus:outline-none focus:ring-1 focus:ring-[#9db693]" /><button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>;
}
