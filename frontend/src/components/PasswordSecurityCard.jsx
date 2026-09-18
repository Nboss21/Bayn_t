import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function PasswordSecurityCard() {
  const { user } = useAuth();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendReset = async () => {
    if (!user?.email) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await authService.forgotPassword(user.email);
      setStatus('sent');
    } catch (err) {
      setErrorMsg(err?.message || 'Could not send reset email. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Password &amp; Security</h2>

      <div className="mb-6">
        <label className="block text-sm text-[#4b5563] mb-2">Password</label>
        <div className="bg-[#f4f7f4] border border-[#e5e7eb] rounded-lg px-4 py-3 flex items-center">
          <span className="text-[#111827] font-bold tracking-widest leading-none mt-1">.............</span>
        </div>
      </div>

      {status === 'sent' ? (
        <div className="flex items-start gap-3 bg-[#e6f4ea] border border-[#bbf7d0] rounded-lg px-4 py-3 mb-4">
          <CheckCircle className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#166534]">Reset link sent!</p>
            <p className="text-xs text-[#166534]/80 mt-0.5">
              Check <strong>{user?.email}</strong> for a password reset link.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <button
            onClick={handleSendReset}
            disabled={status === 'sending'}
            className="flex items-center gap-2 text-sm font-medium text-[#111827] underline underline-offset-2 hover:text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="w-4 h-4" />
            {status === 'sending' ? 'Sending reset link…' : 'Send password reset link'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-600 mt-2">{errorMsg}</p>
          )}
        </div>
      )}

      <p className="text-sm text-[#9ca3af]">
        A reset link will be sent to <strong>{user?.email || 'your email'}</strong>. Must be at least 8 characters with letters and numbers.
      </p>
    </div>
  );
}