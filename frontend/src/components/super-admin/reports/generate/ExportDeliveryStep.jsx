import React, { useState } from 'react';

export default function ExportDeliveryStep() {
  const [format, setFormat] = useState('pdf');
  const [downloadBrowser, setDownloadBrowser] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-[#E8F0E5] text-[#4E6154] flex items-center justify-center text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">Export Format & Delivery</h2>
            <p className="text-xs text-gray-500 mt-1">Specify file format, paper orientation, and delivery channel</p>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-1">
          Step 3 of 3
        </div>
      </div>

      <div className="ml-10">
        <label className="block text-xs font-bold text-gray-700 mb-3">Export File Format</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div 
            onClick={() => setFormat('pdf')}
            className={`p-4 rounded-xl border ${format === 'pdf' ? 'bg-[#F4F7F9] border-transparent' : 'bg-white border-gray-100 hover:border-gray-200'} cursor-pointer transition-colors relative`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#FCEAEB] text-[#D92D20] text-[10px] font-bold px-2 py-0.5 rounded">
                PDF
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${format === 'pdf' ? 'border-blue-500' : 'border-gray-300'}`}>
                {format === 'pdf' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">PDF Document (.pdf)</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">Formatted multi-page atelier layout with seal, ready for formal inspection.</p>
          </div>

          <div 
            onClick={() => setFormat('xlsx')}
            className={`p-4 rounded-xl border ${format === 'xlsx' ? 'bg-[#F4F7F9] border-transparent' : 'bg-white border-gray-100 hover:border-gray-200'} cursor-pointer transition-colors relative`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#E6F4EA] text-[#137333] text-[10px] font-bold px-2 py-0.5 rounded">
                XLSX
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${format === 'xlsx' ? 'border-blue-500' : 'border-gray-300'}`}>
                {format === 'xlsx' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Spreadsheet (.xlsx)</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">Raw multi-tab tabular data with conditional formatting formulas.</p>
          </div>

          <div 
            onClick={() => setFormat('csv')}
            className={`p-4 rounded-xl border ${format === 'csv' ? 'bg-[#F4F7F9] border-transparent' : 'bg-white border-gray-100 hover:border-gray-200'} cursor-pointer transition-colors relative`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#F1F3F4] text-[#5F6368] text-[10px] font-bold px-2 py-0.5 rounded">
                CSV
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${format === 'csv' ? 'border-blue-500' : 'border-gray-300'}`}>
                {format === 'csv' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Raw Dataset (.csv)</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">Lightweight comma-delimited export for custom database ingestion.</p>
          </div>
        </div>

        <label className="block text-xs font-bold text-gray-700 mb-3">Distribution & Notification Channels</label>
        <div className="space-y-3">
          <div 
            onClick={() => setDownloadBrowser(!downloadBrowser)}
            className="flex items-center justify-between p-3 rounded-xl bg-[#F4F4F4] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Download immediately to browser</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">File initiates download prompt once generation completes.</p>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors ${downloadBrowser ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${downloadBrowser ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </div>

          <div 
            onClick={() => setSendEmail(!sendEmail)}
            className="flex items-center justify-between p-3 rounded-xl bg-[#F4F4F4] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Send secure copy to registered administrator email</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">daniel@atelier-academy.co.uk</p>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors ${sendEmail ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${sendEmail ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
