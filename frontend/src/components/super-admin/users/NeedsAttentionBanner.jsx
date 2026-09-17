import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function NeedsAttentionBanner({ message = '', actionText = 'Review accounts', onAction }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fffbeb] border border-[#fef08a] rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#fde68a] flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-[#d97706]" />
        </div>
        <div className="text-sm">
          <span className="font-semibold text-[#111827]">Needs attention:</span>
          <span className="text-[#4b5563] ml-2">{message}</span>
        </div>
      </div>
      <button
        onClick={onAction}
        className="mt-4 sm:mt-0 px-4 py-2 bg-white border border-[#fef08a] text-[#b45309] text-sm font-medium rounded-lg hover:bg-[#fef3c7] transition-colors cursor-pointer"
      >
        {actionText}
      </button>
    </div>
  );
}