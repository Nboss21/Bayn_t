import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] bg-white';

const labelClass = 'block text-sm font-medium text-[#4b5563] mb-2';

function PasswordField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-[#6b7280] hover:text-[#111827]"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function PasswordSecurityCard() {
  const [isChanging, setIsChanging] = useState(false);
  const [current, setCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const validLength = newPassword.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!validLength || !hasLetter || !hasNumber) {
      setError('New password must be at least 8 characters and include letters and numbers.');
      return;
    }
    if (newPassword !== confirm) {
      setError('New password and confirmation do not match.');
      return;
    }

    setError('');
    setSuccess(true);
    setIsChanging(false);
    setCurrent('');
    setNewPassword('');
    setConfirm('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Password & Security</h2>

      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[#e6f4ea] text-[#166534] text-sm font-medium border border-[#bbf7d0]">
          Password updated successfully.
        </div>
      )}

      {isChanging ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <PasswordField
            label="Current password"
            value={current}
            onChange={setCurrent}
            placeholder="Enter current password"
          />
          <PasswordField
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter new password"
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Re-enter new password"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                setIsChanging(false);
                setError('');
              }}
              className="px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#4b5563] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!current || !newPassword || !confirm}
              className="px-4 py-2 bg-[#c6dbb6] hover:bg-[#a3b8a6] rounded-lg text-sm font-medium text-[#111827] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update password
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm text-[#4b5563] mb-2">Password</label>
            <div className="bg-[#f4f7f4] border border-[#e5e7eb] rounded-lg px-4 py-3 flex items-center">
              <span className="text-[#111827] font-bold tracking-widest leading-none mt-1">.............</span>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setIsChanging(true)}
              className="text-sm font-medium text-[#111827] underline underline-offset-2 hover:text-[#374151]"
            >
              Change password
            </button>
          </div>

          <p className="text-sm text-[#9ca3af]">
            Must be at least 8 characters and include a combination of letters and numbers.
          </p>
        </>
      )}
    </div>
  );
}