import React from 'react';

function DocumentRow({ name, status }) {
  const statusStyles = {
    Uploaded: 'bg-[#d1fae5] text-[#065f46]',
    Pending: 'bg-[#fef3c7] text-[#92400e]',
  };

  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <span className="text-[14px] text-[#111827] font-medium">{name}</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
            statusStyles[status] || statusStyles.Uploaded
          }`}
        >
          {status}
        </span>
      </div>
      <button className="px-3 py-1 text-[13px] font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-md hover:bg-[#f9fafb] transition-colors">
        View
      </button>
    </div>
  );
}

export default function DocumentsCard({ documents }) {
  return (
    <div className="bg-[#f9fafb] rounded-xl p-6">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-3">
        3. Documents
      </h2>
      <div className="divide-y divide-[#e5e7eb]">
        {documents.map((doc, index) => (
          <DocumentRow key={index} name={doc.name} status={doc.status} />
        ))}
      </div>
    </div>
  );
}
