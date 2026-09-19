import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, contentService } from '../../../services/applicationService';
import { toUserMessage } from '../../../services/api';

export default function AddUserForm() {
  const navigate = useNavigate();
  const emptyForm = { name: '', email: '', phone: '', password: '', role: '', is_active: true, program_ids: [] };
  const [form, setForm] = useState(emptyForm);
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);

  useEffect(() => {
    contentService.programs({ per_page: 100 })
      .then((result) => setPrograms(result?.data || result || []))
      .catch(() => setPrograms([]))
      .finally(() => setLoadingPrograms(false));
  }, []);

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggleProgram = (id) => setForm((current) => ({
    ...current,
    program_ids: current.program_ids.includes(id)
      ? current.program_ids.filter((programId) => programId !== id)
      : [...current.program_ids, id],
  }));

  const reset = () => {
    setForm(emptyForm);
    setError('');
    setCreated(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setCreated(null);
    if (form.role === 'teacher' && form.program_ids.length === 0) {
      setError('Select at least one program for this teacher.');
      return;
    }
    setBusy(true);
    try {
      const user = await adminService.createUser({
        ...form,
        phone: form.phone || null,
        program_ids: form.role === 'teacher' ? form.program_ids : [],
      });
      setCreated(user);
      setForm((current) => ({ ...current, password: '' }));
    } catch (err) {
      setError(err?.errors ? Object.values(err.errors).flat().join(' ') : toUserMessage(err, 'The user could not be created.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
      <div className="p-8 space-y-8">
        {created && (
          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div><p className="font-semibold">User created successfully.</p><p>{created.name} can now sign in with the {created.role_label || created.role} role.</p></div>
          </div>
        )}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <section>
          <h2 className="text-[17px] font-semibold text-[#111827]">Personal information</h2>
          <p className="text-[14px] text-[#6b7280] mt-0.5 mb-6">Create an account with the identity and credentials the user will use to sign in.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full name" required value={form.name} onChange={(value) => setField('name', value)} placeholder="Enter full name" />
            <Field label="Email address" required type="email" value={form.email} onChange={(value) => setField('email', value)} placeholder="Enter email address" />
            <Field label="Password" required type="password" value={form.password} onChange={(value) => setField('password', value)} placeholder="At least 8 characters" />
            <Field label="Phone number" value={form.phone} onChange={(value) => setField('phone', value)} placeholder="Optional" />
          </div>
        </section>

        <section className="border-t border-[#e5e7eb] pt-8">
          <h2 className="text-[17px] font-semibold text-[#111827]">Role & access</h2>
          <p className="text-[14px] text-[#6b7280] mt-0.5 mb-6">Choose the role that controls the user’s workspace and permissions.</p>
          <div className="relative">
            <select required value={form.role} onChange={(event) => setField('role', event.target.value)} className="w-full appearance-none rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm focus:border-[#c1d0b5] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5]">
              <option value="">Select a role...</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="registrar">Registrar</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
          </div>

          {form.role === 'teacher' && (
            <div className="mt-5 rounded-lg border border-[#e5e7eb] bg-[#fafaf9] p-4">
              <p className="mb-3 text-sm font-medium text-[#111827]">Programs this teacher can teach <span className="text-red-600">*</span></p>
              {loadingPrograms ? <p className="text-sm text-gray-500">Loading programs…</p> : programs.length === 0 ? <p className="text-sm text-red-600">No programs are available.</p> : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {programs.map((program) => (
                    <label key={program.id} className="flex cursor-pointer items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#374151]">
                      <input type="checkbox" checked={form.program_ids.includes(program.id)} onChange={() => toggleProgram(program.id)} />
                      {program.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="border-t border-[#e5e7eb] pt-8">
          <h2 className="text-[17px] font-semibold text-[#111827]">Account status</h2>
          <p className="text-[14px] text-[#6b7280] mt-0.5 mb-4">Active users can sign in immediately. Pending users remain inactive.</p>
          <label className="flex items-center gap-3 text-sm text-[#374151]"><input type="checkbox" checked={form.is_active} onChange={(event) => setField('is_active', event.target.checked)} /> Active account</label>
        </section>
      </div>

      <div className="flex items-center justify-between border-t border-[#e5e7eb] px-8 py-4">
        <button type="button" onClick={() => navigate('/super-admin/users')} className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">Cancel</button>
        <div className="flex items-center gap-4">
          <button type="button" onClick={reset} className="px-4 py-2 text-sm font-medium text-[#4b5563] hover:text-[#111827]">Reset</button>
          <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-lg bg-[#c1d0b5] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#b0bfa4] disabled:cursor-not-allowed disabled:opacity-60">
            <UserPlus className="w-4 h-4" />
            {busy ? 'Creating…' : 'Create User'}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, required, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block text-sm font-medium text-[#111827]">
      {label} {required && <span className="text-[#dc2626]">*</span>}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-sm placeholder-[#9ca3af] focus:border-[#c1d0b5] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5]" />
    </label>
  );
}
