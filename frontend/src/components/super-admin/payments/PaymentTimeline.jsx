import React from 'react';

export default function PaymentTimeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Transaction Timeline</h2>

      <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
        
        {/* Step 1 */}
        <div className="relative pl-6">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#bce0bc] border-[3px] border-white"></div>
          <p className="text-xs text-gray-400 mb-1">Today, 10:42 AM</p>
          <h3 className="text-sm font-semibold text-gray-900">Payment slip uploaded by Mekdes Tesfaye</h3>
          <p className="text-sm text-gray-500 mt-1">
            File: <span className="font-medium text-gray-700">CBE_receipt_Sep7_mekdes.pdf</span> (1.2 MB)
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative pl-6">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#fca5a5] border-[3px] border-white"></div>
          <p className="text-xs text-gray-400 mb-1">Today, 10:43 AM</p>
          <h3 className="text-sm font-semibold text-gray-900">Queued in "Needs Attention" review queue</h3>
          <p className="text-sm text-gray-500 mt-1">
            Assigned to Super Admin Daniel for verification
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative pl-6">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-200 border-[3px] border-white"></div>
          <p className="text-xs text-gray-400 mb-1">Pending Action</p>
          <h3 className="text-sm font-medium text-gray-500">Receipt issuance and ledger reconciliation</h3>
        </div>

      </div>
    </div>
  );
}
