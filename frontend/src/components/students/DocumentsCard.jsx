import React, { useState } from 'react';
import { Eye, Loader2 } from 'lucide-react';
import { registrarService, studentService } from '../../services/applicationService';
import { toUserMessage } from '../../services/api';

function DocumentRow({ document, studentId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const statusStyles = {
    Uploaded: 'bg-[#d1fae5] text-[#065f46]',
    Pending: 'bg-[#fef3c7] text-[#92400e]',
  };

  return (
    <div className="relative flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <span className="text-[14px] text-[#111827] font-medium">{document.name}</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
            statusStyles[document.status] || statusStyles.Uploaded
          }`}
        >
          {document.status}
        </span>
      </div>
      <button
        onClick={async () => {
          setLoading(true);
          setError('');
          const viewer = window.open('', '_blank');
          try {
            const content = document.type === 'certificate'
              ? await studentService.certificateFile(studentId)
              : await registrarService.documentUrl(document.id).then((result) => result.temporary_url);
            const url = content instanceof Blob
              ? URL.createObjectURL(content)
              : content;
            if (viewer) viewer.location.href = url;
            else window.open(url, '_blank', 'noopener,noreferrer');
            if (content instanceof Blob) setTimeout(() => URL.revokeObjectURL(url), 120000);
          } catch (err) {
            viewer?.close();
            setError(toUserMessage(err, 'The document could not be opened.'));
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-[#1e40af] bg-[#eff6ff] border border-[#bfdbfe] rounded-lg hover:bg-[#dbeafe] hover:border-[#93c5fd] transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
        {loading ? 'Opening…' : 'View'}
      </button>
      {error && <p className="absolute right-0 top-full z-10 mt-1 w-64 rounded bg-red-50 p-2 text-xs text-red-700 shadow">{error}</p>}
    </div>
  );
}

export default function DocumentsCard({ documents, studentId }) {
  return (
    <div className="bg-[#f9fafb] rounded-xl p-6">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-3">
        3. Documents
      </h2>
      <div className="divide-y divide-[#e5e7eb]">
        {documents.map((doc, index) => (
          <DocumentRow key={doc.id || index} document={doc} studentId={studentId} />
        ))}
      </div>
    </div>
  );
}
