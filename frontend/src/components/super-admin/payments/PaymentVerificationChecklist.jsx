import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

export default function PaymentVerificationChecklist() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Super Admin Verification Checklist</h2>
      <p className="text-sm text-gray-500 mb-6">
        Complete all 3 audit points before confirming this payment into the official academy general ledger.
      </p>

      <div className="space-y-4">
        {/* Item 1 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f9faf9] border border-[#e5e7eb]">
          <div className="mt-0.5 text-[#2a8b5e]">
            <CheckSquare className="w-5 h-5 fill-[#2a8b5e] text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">1. Bank Statement Credit Verification</h3>
            <p className="text-sm text-gray-500 mt-1">
              Confirmed ETB 25,000 received in HOB CBE Account on Sep 7 statement batch.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f9faf9] border border-[#e5e7eb]">
          <div className="mt-0.5 text-[#2a8b5e]">
             <CheckSquare className="w-5 h-5 fill-[#2a8b5e] text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">2. Program Fee & Cohort Matching</h3>
            <p className="text-sm text-gray-500 mt-1">
              Amount exactly matches "Professional Makeup Artistry" Intake 1 fee schedule requirement.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#fafaf9] border border-gray-200">
          <div className="mt-0.5 text-gray-400">
             <Square className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">3. Allocate Studio Seat & Generate Formal Receipt</h3>
            <p className="text-sm text-gray-500 mt-1">
              Lock studio vanity chair #08 in Studio 101 and dispatch SMS & email confirmation to student.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
