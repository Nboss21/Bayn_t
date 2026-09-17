import React from 'react';
import { ArrowLeft, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentDetailsCard from '../../components/super-admin/payments/PaymentDetailsCard';
import PaymentVerificationChecklist from '../../components/super-admin/payments/PaymentVerificationChecklist';
import PaymentTimeline from '../../components/super-admin/payments/PaymentTimeline';
import CandidateDetailsCard from '../../components/super-admin/payments/CandidateDetailsCard';

export default function SuperAdminPaymentVerification() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1200px] mx-auto text-[#333333]">
      {/* Top Navigation */}
      <button 
        onClick={() => navigate('/super-admin/payments')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Payment Oversight
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <h1 className="text-3xl font-semibold text-[#1a1a1a]">Review Student Payment</h1>
          <span className="px-3 py-1 bg-[#ffedd5] text-[#c2410c] text-sm font-medium rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full"></span>
            Payment Pending Verification
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 bg-white hover:bg-red-50 font-medium rounded-lg transition-colors">
            <X className="w-4 h-4" />
            Reject
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#bce0bc] text-[#2c532c] hover:bg-[#a3cea3] font-medium rounded-lg transition-colors shadow-sm">
            <Check className="w-4 h-4" />
            Verify & Confirm Payment
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center border border-gray-200 bg-white rounded text-sm px-2 py-1 text-gray-600">
          <span className="text-gray-400 mr-2">REF :</span>
          <span className="font-medium text-gray-700">#PAY-8840</span>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mb-8">
        Verify bank deposit slip, cross-check student ledger entry, and approve official enrollment receipt.
      </p>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Payment Details, Checklist, Timeline) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PaymentDetailsCard />
          <PaymentVerificationChecklist />
          <PaymentTimeline />
        </div>

        {/* Right Column (Candidate Details) */}
        <div className="lg:col-span-1">
          <CandidateDetailsCard />
        </div>

      </div>
    </div>
  );
}
