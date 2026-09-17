import React from 'react';
import { Download, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PaymentDetailsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-[#eaf4ea] rounded-xl flex items-center justify-center text-[#2d7a46] shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Submitted Proof of Payment</h2>
            <p className="text-sm text-gray-400 mt-0.5 font-normal">
              Uploaded by student on Sep 7, 2026 at 10:42 AM EAT
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <span className="px-3.5 py-2 bg-[#f9fafb] border border-gray-200/80 text-gray-500 text-xs sm:text-sm font-medium rounded-xl">
            Telebirr / CBE Transfer
          </span>
          <button className="p-2.5 border border-gray-200/80 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body - Receipt Box with Green Dashed Border */}
      <div className="mt-6">
        <div className="border-2 border-dashed border-[#a8cea7] rounded-2xl bg-[#f8faf7] p-6 sm:p-8">
          
          {/* CBE Receipt Header */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-[#e1eae0]">
            <div className="w-12 h-10 bg-[#212121] text-white flex items-center justify-center rounded-lg font-bold text-sm tracking-wide shrink-0">
              CBE
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Commercial Bank of Ethiopia (Mobile Banking)
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-normal mt-0.5">
                Official Transaction Advice Slip
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 py-6 border-b border-[#e1eae0]">
            {/* Row 1 */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                SENDER ACCOUNT NAME
              </p>
              <p className="text-base font-bold text-gray-900">
                Mekdes Tesfaye Gebre
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                BENEFICIARY ACCOUNT
              </p>
              <p className="text-base font-bold text-gray-900">
                HOB International Academy PLC
              </p>
              <p className="text-base font-bold text-gray-900">
                (10002938472)
              </p>
            </div>
            
            {/* Row 2 */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                TRANSFER AMOUNT
              </p>
              <p className="text-2xl font-extrabold text-[#2d7a46]">
                ETB 25,000.00
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                BANK TRANSACTION ID / REF
              </p>
              <p className="text-base font-bold text-gray-900">
                TXN - CBE - 9940182746
              </p>
            </div>

            {/* Row 3 */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                TRANSACTION TIMESTAMP
              </p>
              <p className="text-sm font-medium text-gray-700">
                07 Sep 2026, 09:14:22 AM
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                STUDENT REMARK NOTE
              </p>
              <p className="text-sm font-medium text-gray-700">
                "Tuition Installment 1 - PMA Fall 2026"
              </p>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center text-[#2d7a46] text-sm font-semibold gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2d7a46]" />
              <span>Digital Signature Verified by Payment Gateway</span>
            </div>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="flex items-center text-[#2d7a46] text-sm font-semibold hover:underline gap-1.5 self-start sm:self-auto"
            >
              <span>Expand Original Image</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

