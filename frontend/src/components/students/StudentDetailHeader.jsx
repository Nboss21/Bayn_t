import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ExternalLink, Loader2 } from 'lucide-react';
import { studentService } from '../../services/applicationService';
import { toUserMessage } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function StudentDetailHeader({ student }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [generating, setGenerating] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [certAvailable, setCertAvailable] = useState(Boolean(student?.hasCertificate));

  const statusStyles = {
    Active: 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]',
    Completed: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]',
    Graduated: 'bg-[#ede9fe] text-[#5b21b6] border-[#ddd6fe]',
    Pending: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
  };

  const isEligibleForCert = ['completed', 'graduated'].includes(String(student?.rawStatus || '').toLowerCase());

  const handleGenerateCertificate = async () => {
    if (!student?.id) return;
    setGenerating(true);
    try {
      await studentService.generateCertificate(student.id);
      setCertAvailable(true);
      toast.success('Certificate generated successfully!');
    } catch (err) {
      toast.error(toUserMessage(err, 'Failed to generate certificate.'));
    } finally {
      setGenerating(false);
    }
  };

  const handleViewCertificate = async () => {
    if (!student?.id) return;
    setViewing(true);
    const viewer = window.open('', '_blank');
    try {
      const pdf = await studentService.certificateFile(student.id);
      const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
      if (viewer) viewer.location.href = url;
      else window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (err) {
      viewer?.close();
      toast.error(toUserMessage(err, 'Unable to open certificate.'));
    } finally {
      setViewing(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[28px] font-semibold text-[#111827] leading-tight">
              {student.name}
            </h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${
                statusStyles[student.status] || statusStyles.Active
              }`}
            >
              {student.status}
            </span>
          </div>
          <p className="text-[14px] text-[#6b7280] mt-1">
            {student.studentId} • {student.program} • {student.intake}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {certAvailable && (
            <button
              onClick={handleViewCertificate}
              disabled={viewing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[#1e40af] bg-[#eff6ff] border border-[#bfdbfe] rounded-lg hover:bg-[#dbeafe] transition-colors disabled:opacity-50"
              title="Open Certificate in new tab"
            >
              {viewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              <span>View Certificate</span>
            </button>
          )}

          {isEligibleForCert && (
            <button
              onClick={handleGenerateCertificate}
              disabled={generating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-white bg-[#173b57] rounded-lg hover:bg-[#112d42] transition-colors disabled:opacity-50 shadow-sm"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4 text-[#d4af37]" />}
              <span>{certAvailable ? 'Regenerate Certificate' : 'Issue Certificate'}</span>
            </button>
          )}

          <button
            onClick={() => navigate('/registrar/history')}
            className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors whitespace-nowrap"
          >
            Enrollment History
          </button>
        </div>
      </div>
    </div>
  );
}
