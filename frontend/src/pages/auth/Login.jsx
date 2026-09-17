import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toUserMessage } from '../../services/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await login(form); navigate(location.state?.from || '/dashboard', { replace: true }); }
    catch (err) { setError(toUserMessage(err)); } finally { setBusy(false); }
  };
  return <main className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-6 py-16">
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
      <p className="text-[#a87b52] text-xs font-bold tracking-widest mb-3">WELCOME BACK</p>
      <h1 className="text-4xl font-serif mb-8">Sign in</h1>
      {error && <p role="alert" className="bg-red-50 text-red-700 text-sm p-3 rounded mb-5">{error}</p>}
      <label className="block text-sm mb-4">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full border rounded-lg p-3" /></label>
      <label className="block text-sm mb-6">Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 w-full border rounded-lg p-3" /></label>
      <button disabled={busy} className="w-full bg-[#e6ca64] rounded-full py-3 font-medium disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
      <p className="text-sm text-gray-500 mt-6 text-center">Need an account? New accounts are created through Google sign-in by the backend.</p>
      <Link to="/" className="block text-center text-sm mt-4 underline">Return to site</Link>
    </form>
  </main>;
}
