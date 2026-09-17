import React from 'react';
import GenerateReportHeader from '../../components/super-admin/reports/generate/GenerateReportHeader';
import ReportTypeStep from '../../components/super-admin/reports/generate/ReportTypeStep';
import DataDimensionsStep from '../../components/super-admin/reports/generate/DataDimensionsStep';
import ExportDeliveryStep from '../../components/super-admin/reports/generate/ExportDeliveryStep';
import LivePreviewPanel from '../../components/super-admin/reports/generate/LivePreviewPanel';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminGenerateReport() {
  const navigate = useNavigate();

  return (
    <div className="p-8 font-sans bg-[#FBFBFB] min-h-screen">
      {/* Back link */}
      <button 
        onClick={() => navigate('/super-admin/reports')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Reports
      </button>

      <GenerateReportHeader />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="flex-1 space-y-6">
          <ReportTypeStep />
          <DataDimensionsStep />
          <ExportDeliveryStep />
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 pb-12">
            <button 
              onClick={() => navigate('/super-admin/reports')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2"
            >
              Cancel & Return
            </button>
            <button className="bg-[#4E6154] hover:bg-[#3D4C42] text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Generate & Export Report
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-[350px]">
          <LivePreviewPanel />
        </div>
      </div>
    </div>
  );
}
