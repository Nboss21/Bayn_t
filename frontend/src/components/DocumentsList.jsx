import { useState } from 'react';
import { FileText, GraduationCap, Image as ImageIcon, Download, Eye } from 'lucide-react';
import SectionCard from './SectionCard';
import { registrarService } from '../services/applicationService';

const ICONS = {
  PDF: <FileText className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
  JPG: <ImageIcon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
  Certificate: <GraduationCap className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
};

export default function DocumentsList({ applicant }) {
  const [activeDoc, setActiveDoc] = useState(null);
  const [error, setError] = useState('');

  const documents = applicant.documents || [];
  const uploadedCount = documents.length;

  const rightBadge = (
    <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-3 py-1 rounded-full text-[12px] font-medium">
      {uploadedCount} document{uploadedCount === 1 ? '' : 's'} uploaded
    </span>
  );

  return (
    <SectionCard title="Documents" rightContent={rightBadge}>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="border border-[#e5e7eb] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-[#f3f4f6] flex items-center justify-center">
                {ICONS[doc.type] || ICONS.PDF}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{doc.type.replaceAll('_', ' ')}</p>
                <p className="text-[12px] text-gray-500">Uploaded {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#166534] text-[12px] font-medium mr-2">Uploaded</span>
              <button
                onClick={async () => { try { setError(''); const result = await registrarService.documentUrl(doc.id); window.open(result.temporary_url, '_blank', 'noopener,noreferrer'); } catch (err) { setError(err.message || 'The document could not be opened.'); } }}
                className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" strokeWidth={2} />
                View
              </button>
              <button
                onClick={async () => { try { setError(''); const result = await registrarService.documentUrl(doc.id); window.open(result.temporary_url, '_blank', 'noopener,noreferrer'); } catch (err) { setError(err.message || 'The document could not be downloaded.'); } }}
                className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Download
              </button>
            </div>
          </div>
        ))}
        {!documents.length && <p className="text-sm text-gray-500">No documents have been uploaded.</p>}
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
      {activeDoc && (
        <div className="mt-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-3 flex items-start justify-between gap-4">
          <p className="text-[13px] text-gray-600 leading-relaxed">
            <span className="font-medium text-gray-900">{activeDoc.type}</span> is selected.
          </p>
          <button
            onClick={() => setActiveDoc(null)}
            aria-label="Dismiss document notice"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}
    </SectionCard>
  );
}