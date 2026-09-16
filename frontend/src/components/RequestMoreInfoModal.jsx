import React, { useState } from 'react';

const OPTIONS = [
  { id: 'missing_document', label: 'Missing document' },
  { id: 'clarification', label: 'Clarification needed' },
  { id: 'additional_education', label: 'Additional education information' },
  { id: 'additional_experience', label: 'Additional experience information' },
  { id: 'other', label: 'Other' },
];

export default function RequestMoreInfoModal({ applicant, isOpen, onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState(
    'Please upload a completed secondary education certificate or equivalent for verification. Your diploma details were noted, but the official document is required for processing.',
  );

  if (!isOpen) return null;

  const toggleOption = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((option) => option !== id) : [...prev, id],
    );

  const selectedLabels = OPTIONS.filter((option) => selected.includes(option.id)).map(
    (option) => option.label,
  );
  const requestedText = selectedLabels.length > 0 ? selectedLabels.join(', ').toLowerCase() : 'further details';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#f9fafb]/80 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[520px] flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-[22px] font-medium text-[#111] mb-3">
            Request More Information
          </h2>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[10px] font-medium text-gray-600">
              {applicant.initials}
            </div>
            <span className="text-[13px] font-medium text-gray-700">{applicant.name}</span>
            <span className="text-gray-300">•</span>
            <span className="text-[13px] text-gray-500">Application #{applicant.id}</span>
          </div>

          <p className="text-[13px] text-gray-500">
            Some information is needed before this application can be reviewed further.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto">
          {/* Checkboxes Section */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[14px] text-[#111] font-medium">What information is needed?</span>
              <span className="text-red-500 text-[14px]">*</span>
              <span className="text-[11px] text-gray-400">Select all that apply</span>
            </div>

            <div className="space-y-1.5 flex flex-col">
              {OPTIONS.map((option) => {
                const checked = selected.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#f2f5ee] border border-[#d2e0c8]'
                        : 'border border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleOption(option.id)}
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded flex items-center justify-center ${
                        checked ? 'bg-[#1a1a1a]' : 'border border-gray-300 bg-white'
                      }`}
                    >
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-[14px] ${checked ? 'text-[#111]' : 'text-gray-600'}`}>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Textarea Section */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[14px] text-[#111] font-medium">Additional message</span>
              <span className="text-[12px] text-gray-400">- Optional</span>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border-[3px] border-[#1a1a1a] rounded-xl p-4 text-[13px] text-[#111] min-h-[110px] resize-none focus:outline-none leading-relaxed"
            />
            <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
              This message will be sent to the applicant via email.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-[#f2f5ee] border border-[#d2e0c8] rounded-xl p-4 flex gap-3 items-start">
            <div className="w-[18px] h-[18px] mt-0.5 rounded border border-gray-300 flex items-center justify-center bg-white shrink-0">
              {selected.length > 0 && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[13px] text-[#111] leading-snug">
                This request will ask {applicant.name} for {requestedText}, with the message above.
              </p>
              <p className="text-[10px] font-medium text-gray-500">
                Upon sending, application status will change to <span className="font-bold text-[#111]">Awaiting Information</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ selected: selectedLabels, message })}
            disabled={selected.length === 0}
            className="px-6 py-2.5 bg-[#b5c7a3] hover:bg-[#a5b893] rounded-lg text-[13px] font-medium text-[#111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Request
          </button>
        </div>

      </div>
    </div>
  );
}