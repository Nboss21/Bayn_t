import { useState } from 'react';
import { FileText, GraduationCap, Image as ImageIcon, Download, Eye } from 'lucide-react';
import SectionCard from './SectionCard';
import { requiredDocuments } from '../data/documentsData';

const ICONS = {
  PDF: <FileText className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
  JPG: <ImageIcon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
  Certificate: <GraduationCap className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
};

export default function DocumentsList() {
  const [activeDoc, setActiveDoc] = useState(null);

  const uploadedCount = requiredDocuments.filter((doc) => doc.uploaded).length;

  const rightBadge = (
    <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-3 py-1 rounded-full text-[12px] font-medium">
      {uploadedCount} of {requiredDocuments.length} required documents uploaded
    </span>
  );

  return (
    <SectionCard title="Documents" rightContent={rightBadge}>
      <div className="space-y-3">
        {requiredDocuments.map((doc) => (
          <div key={doc.id} className="border border-[#e5e7eb] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-[#f3f4f6] flex items-center justify-center">
                {ICONS[doc.type] || ICONS.PDF}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{doc.name}</p>
                <p className="text-[12px] text-gray-500">{doc.meta}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#166534] text-[12px] font-medium mr-2">Uploaded</span>
              <button
                onClick={() => setActiveDoc(doc)}
                className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" strokeWidth={2} />
                View
              </button>
              <button
                onClick={() => setActiveDoc(doc)}
                className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeDoc && (
        <div className="mt-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-3 flex items-start justify-between gap-4">
          <p className="text-[13px] text-gray-600 leading-relaxed">
            <span className="font-medium text-gray-900">{activeDoc.name}</span> ({activeDoc.meta}) is selected for
            you. Document files will open and download once the documents service is connected.
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