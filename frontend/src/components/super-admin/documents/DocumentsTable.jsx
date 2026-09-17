import React from 'react';
import { 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  ShieldCheck, 
  Award, 
  ClipboardList, 
  User, 
  Clock,
  Trash2
} from 'lucide-react';

const DocumentsTable = () => {
  const documents = [
    {
      id: 1,
      name: 'Student Handbook',
      description: 'Official 2026/27 student guidelines & academy protocols',
      type: 'Policies',
      status: 'Published',
      updated: 'Sep 7, 2026',
      icon: BookOpen,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 2,
      name: 'Registration Form',
      description: 'New student intake registration & emergency contact form',
      type: 'Forms',
      status: 'Published',
      updated: 'Sep 6, 2026',
      icon: FileText,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 3,
      name: 'Makeup Assessment Guide',
      description: 'Evaluation rubrics for practical artistry and studio tests',
      type: 'Forms',
      status: 'Published',
      updated: 'Sep 5, 2026',
      icon: ClipboardCheck,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 4,
      name: 'Code of Conduct',
      description: 'Academy professionalism, hygiene standards & salon ethics',
      type: 'Policies',
      status: 'Published',
      updated: 'Sep 4, 2026',
      icon: ShieldCheck,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 5,
      name: 'Certificate Template',
      description: 'Accredited Pro Diploma graduation certificate layout & gold seal vector',
      isDraft: true,
      type: 'Certificates',
      status: 'Draft',
      updated: 'Sep 3, 2026',
      icon: Award,
      iconBg: 'bg-[#FDF0E6]',
      iconColor: 'text-[#B4702C]'
    },
    {
      id: 6,
      name: 'Kit Equipment Checklist',
      description: 'Required brush sets, hygiene palettes & sanitization tools',
      type: 'Student documents',
      status: 'Published',
      updated: 'Aug 29, 2026',
      icon: ClipboardList,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 7,
      name: 'Model Release Agreement',
      description: 'Consent for portfolio photography & backstage runway captures',
      type: 'Student documents',
      status: 'Published',
      updated: 'Aug 20, 2026',
      icon: User,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    },
    {
      id: 8,
      name: 'Atelier Safety & Emergency Standard',
      description: 'Campus evacuation routes, first-aid procedures & fire safety',
      type: 'Other',
      status: 'Published',
      updated: 'Aug 12, 2026',
      icon: Clock,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#6B7280]'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[45%]">Document</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Type</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Updated</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[10%] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg ${doc.iconBg} mt-0.5 shrink-0`}>
                      <doc.icon className={`w-5 h-5 ${doc.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-[15px]">{doc.name}</h4>
                        {doc.isDraft && (
                          <span className="px-2 py-0.5 bg-[#FDF0E6] text-[#B4702C] text-[10px] font-bold rounded-full whitespace-nowrap">
                            Draft in Review
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <span className="text-[14px] text-gray-600">{doc.type}</span>
                </td>
                <td className="px-6 py-4 align-middle">
                  {doc.status === 'Published' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F0FDF4] text-[#15803D] text-[13px] font-medium rounded-full border border-[#DCFCE7]">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full"></div>
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF0E6] text-[#B4702C] text-[13px] font-medium rounded-full border border-[#F6E1CC]">
                      <div className="w-1.5 h-1.5 bg-[#C88448] rounded-full"></div>
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 align-middle">
                  <span className="text-[14px] text-gray-600 block">
                    {doc.updated.split(', ')[0]},
                  </span>
                  <span className="text-[14px] text-gray-600 block">
                    {doc.updated.split(', ')[1]}
                  </span>
                </td>
                <td className="px-6 py-4 align-middle text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        doc.status === 'Draft' 
                          ? 'bg-[#965A20] text-white border-[#965A20] hover:bg-[#7F4B19] shadow-sm' 
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm'
                      }`}
                     className="cursor-pointer">
                      {doc.status === 'Draft' ? 'Review' : 'View'}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTable;
