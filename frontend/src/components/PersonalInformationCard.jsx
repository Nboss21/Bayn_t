import React, { useState } from 'react';
import { Pencil, User } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af]';

const labelClass = 'block text-sm font-medium text-[#4b5563] mb-1';

export default function PersonalInformationCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Sandra Alemu');
  const [email, setEmail] = useState('sandra@example.com');
  const [phone, setPhone] = useState('+251 9XX XXX XXX');

  const fields = [
    { label: 'Full name', value: name, onChange: setName },
    { label: 'Email', value: email, onChange: setEmail },
    { label: 'Phone', value: phone, onChange: setPhone },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#111827]">Personal Information</h2>
        {isEditing ? (
          <span className="text-sm text-[#4b5563] font-medium">Editing</span>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm font-medium text-[#4b5563] hover:text-[#111827]"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </button>
        )}
      </div>
      <div className="border-t border-[#e5e7eb] pt-6 flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-[#d5e0d5] flex items-center justify-center shrink-0">
          <User className="w-10 h-10 text-[#6b7280]" />
        </div>

        {isEditing ? (
          <form className="flex-1 flex flex-col gap-4" onSubmit={handleSave}>
            {fields.map((field) => (
              <div key={field.label}>
                <label className={labelClass}>{field.label}</label>
                <input
                  type={field.label === 'Email' ? 'email' : field.label === 'Phone' ? 'tel' : 'text'}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#4b5563] hover:bg-[#f9fafb] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#c6dbb6] hover:bg-[#a3b8a6] rounded-lg text-sm font-medium text-[#111827] transition-colors"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-[#111827]">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <span className="w-12 text-[#6b7280]">Email:</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <span className="w-12 text-[#6b7280]">Phone:</span>
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <span className="w-12 text-[#6b7280]">Role:</span>
              <span>Registrar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}