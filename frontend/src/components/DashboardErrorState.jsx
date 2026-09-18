import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardErrorState({
  title = 'Unable to load dashboard',
  message = 'There was a problem communicating with the server. Please check your network connection and try again.',
  onRetry,
}) {
  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4 shadow-sm">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-[#173b57] hover:bg-[#112d42] rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173b57] focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
