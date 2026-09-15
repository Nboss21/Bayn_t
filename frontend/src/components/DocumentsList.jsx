import { FileText, GraduationCap, Image as ImageIcon, Download } from 'lucide-react';
import SectionCard from './SectionCard';

export default function DocumentsList() {
  const documents = [
    {
      id: 1,
      name: 'National ID',
      meta: 'PDF • 2.4 MB',
      icon: <FileText className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
    },
    {
      id: 2,
      name: 'Educational Certificate',
      meta: 'PDF • 1.8 MB',
      icon: <GraduationCap className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
    },
    {
      id: 3,
      name: 'Profile Photo',
      meta: 'JPG • 1.2 MB',
      icon: <ImageIcon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />,
    }
  ];

  const rightBadge = (
    <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-3 py-1 rounded-full text-[12px] font-medium">
      3 of 3 required documents uploaded
    </span>
  );

  return (
    <SectionCard title="Documents" rightContent={rightBadge}>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="border border-[#e5e7eb] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-[#f3f4f6] flex items-center justify-center">
                {doc.icon}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{doc.name}</p>
                <p className="text-[12px] text-gray-500">{doc.meta}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#166534] text-[12px] font-medium mr-2">Uploaded</span>
              <button className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors">
                View
              </button>
              <button className="px-3 py-1.5 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" strokeWidth={2} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
