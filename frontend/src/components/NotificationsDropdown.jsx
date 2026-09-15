import React from 'react';
import { X, FileText, CreditCard, AlertCircle } from 'lucide-react';

export default function NotificationsDropdown({ onClose }) {
  return (
    <div className="absolute top-16 right-8 w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e5e7eb] flex flex-col font-sans z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#f3f4f6]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#111827]">Notifications</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#ecfdf3] text-[#027a48] text-xs font-medium border border-[#abefc6]">
              4 unread
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-[#6b7280] hover:text-[#374151] transition-colors">
              Mark all as read
            </button>
            <button onClick={onClose} className="text-[#9ca3af] hover:text-[#6b7280] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-[#f3f4f6] p-1 rounded-lg">
          <button className="flex-1 py-1.5 px-3 bg-white text-[#111827] text-sm font-medium rounded-md shadow-sm">
            All (4)
          </button>
          <button className="flex-1 py-1.5 px-3 text-[#6b7280] hover:text-[#374151] text-sm font-medium rounded-md transition-colors">
            Unread (4)
          </button>
          <button className="flex-1 py-1.5 px-3 text-[#6b7280] hover:text-[#374151] text-sm font-medium rounded-md transition-colors">
            Archive
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[500px] overflow-y-auto bg-[#f9fafb] p-3">
        <div className="flex items-center justify-between px-2 mb-3 mt-1">
          <span className="text-[11px] font-bold text-[#9ca3af] tracking-wider uppercase">TODAY</span>
          <span className="text-[11px] text-[#9ca3af]">4 items</span>
        </div>

        <div className="space-y-2">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-[#f3f4f6] shadow-sm relative overflow-hidden">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] flex items-center justify-center flex-shrink-0 text-[#6b7280]">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-semibold text-[#111827]">New application received</h3>
                  <span className="text-xs text-[#9ca3af] whitespace-nowrap ml-2">10 min ago</span>
                </div>
                <p className="text-sm text-[#4b5563] mb-3 leading-relaxed">
                  <span className="font-semibold text-[#111827]">Mekdes Tesfaye</span> submitted an application for Professional Makeup Artistry.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="inline-flex px-2 py-1 bg-[#f3f4f6] text-[#4b5563] text-xs font-medium rounded">
                    App #2026-0041
                  </span>
                  <button className="px-3 py-1.5 bg-[#404c36] hover:bg-[#343e2b] text-white text-xs font-medium rounded-md flex items-center gap-1 transition-colors">
                    Review <span className="text-[10px]">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-[#f3f4f6] shadow-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] flex items-center justify-center flex-shrink-0 text-[#6b7280]">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-semibold text-[#111827]">Information submitted</h3>
                  <span className="text-xs text-[#9ca3af] whitespace-nowrap ml-2">32 min ago</span>
                </div>
                <p className="text-sm text-[#4b5563] mb-3 leading-relaxed">
                  <span className="font-semibold text-[#111827]">Hana Bekele</span> provided the requested application information.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#6b7280]">
                    Bridal Makeup Professional
                  </span>
                  <button className="px-3 py-1.5 bg-white border border-[#d1d5db] hover:bg-[#f9fafb] text-[#374151] text-xs font-medium rounded-md transition-colors">
                    View update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-xl border border-[#f3f4f6] shadow-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ecfdf3] flex items-center justify-center flex-shrink-0 text-[#027a48]">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-semibold text-[#111827]">Payment received</h3>
                  <span className="text-xs text-[#9ca3af] whitespace-nowrap ml-2">1 hr ago</span>
                </div>
                <p className="text-sm text-[#4b5563] mb-3 leading-relaxed">
                  <span className="font-semibold text-[#111827]">Liya Tadesse</span>'s application payment has been received.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#ecfdf3] text-[#027a48] text-xs font-medium rounded border border-[#abefc6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a]"></span>
                    Paid
                  </span>
                  <span className="text-xs font-medium text-[#6b7280]">
                    $350.00 USD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-xl border border-[#f3f4f6] shadow-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#fef0c7] flex items-center justify-center flex-shrink-0 text-[#d97706]">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-semibold text-[#111827]">Application needs review</h3>
                  <span className="text-xs text-[#9ca3af] whitespace-nowrap ml-2">2 hrs ago</span>
                </div>
                <p className="text-sm text-[#4b5563] mb-3 leading-relaxed">
                  <span className="font-semibold text-[#111827]">Saron Alemu</span>'s application is ready for review.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#6b7280]">
                    PMA — August Intake
                  </span>
                  <button className="px-3 py-1.5 bg-white border border-[#d1d5db] hover:bg-[#f9fafb] text-[#374151] text-xs font-medium rounded-md transition-colors">
                    Open record
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
