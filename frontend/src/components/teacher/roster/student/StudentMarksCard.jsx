import React from 'react';
import { ClipboardList, Star } from 'lucide-react';

const AssessmentRow = ({ name, weight, score, total, pct }) => {
  const barColor = pct >= 80 ? 'bg-[#3A6349]' : 'bg-[#C9A227]';
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-medium text-[#1A1A1A]">{name}</span>
          <span className="text-[12px] text-gray-400">(Weight: {weight}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-gray-500">
            {score} / {total}
          </span>
          <span
            className={`text-[13px] font-semibold ${
              pct >= 80 ? 'text-[#2F6B43]' : 'text-[#B45309]'
            }`}
          >
            {pct}%
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const StudentMarksCard = ({ student }) => {
  const assessments = student.marksDetailsWithPct;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1A1A1A]">Marks</h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Current assessment performance.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-[12px] text-gray-500 px-3 py-1.5 rounded-lg">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Midterm Assessment · {student.enrolled} students · Complete</span>
        </div>
      </div>

      <div>
        {assessments.map((a) => (
          <AssessmentRow key={a.name} {...a} />
        ))}
      </div>

      <div className="mt-6 bg-[#F8FAF7] border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-4 h-4 text-[#C9A227]" />
          <div>
            <p className="text-[14px] font-semibold text-[#1A1A1A]">Weighted Term Aggregate</p>
            <p className="text-[12px] text-gray-400">Combined assessment scores</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[20px] font-bold text-[#1A1A1A]">
            {student.weightedScore} / {student.weightedTotal}
          </span>
          <span className={`text-[14px] font-semibold ml-2 ${student.weightedPct >= 80 ? 'text-[#2F6B43]' : 'text-[#B45309]'}`}>
            ({student.weightedPct}%)
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button className="flex items-center gap-2 bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors">
          View Full Marks →
        </button>
      </div>
    </div>
  );
};

export default StudentMarksCard;