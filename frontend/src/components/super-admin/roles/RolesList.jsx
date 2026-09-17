import React from 'react';
import { ShieldCheck, FileText, Monitor, Shield, ChevronRight } from 'lucide-react';

export default function RolesList() {
  return (
    <div className="w-[340px] shrink-0 flex flex-col">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">
          System Roles
        </h2>
        <span className="text-[10px] text-[#9ca3af]">3 Defined</span>
      </div>

      <div className="space-y-4">
        {/* Super Admin Card */}
        <div className="bg-white border-2 border-[#111827] rounded-xl p-5 shadow-sm relative">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#111827]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-bold text-[#111827]">Super Admin</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#ecfccb] text-[#4d7c0f] uppercase tracking-wider">
                  Full System
                </span>
              </div>
              <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                Manage system configuration, access, academic structure, payments, and content.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
              <span className="text-[12px] text-[#6b7280]">2 Assigned Users</span>
            </div>
            <button className="text-[13px] font-semibold text-[#111827] flex items-center hover:underline cursor-pointer">
              Active Scope
              <ChevronRight className="w-4 h-4 ml-0.5 text-[#9ca3af]" />
            </button>
          </div>
        </div>

        {/* Registrar Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm hover:border-[#d1d5db] transition-colors cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#ea580c]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-bold text-[#111827]">Registrar</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#ffedd5] text-[#c2410c] uppercase tracking-wider">
                  Admissions
                </span>
              </div>
              <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                Manage applications, students, classes, and enrollment.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></div>
              <span className="text-[12px] text-[#6b7280]">4 Assigned Users</span>
            </div>
            <button className="text-[13px] font-medium text-[#6b7280] flex items-center group-hover:text-[#111827] cursor-pointer">
              Configure
              <ChevronRight className="w-4 h-4 ml-0.5 text-[#9ca3af]" />
            </button>
          </div>
        </div>

        {/* Teacher Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm hover:border-[#d1d5db] transition-colors cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
              <Monitor className="w-5 h-5 text-[#2563eb]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-bold text-[#111827]">Teacher</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#dbeafe] text-[#1d4ed8] uppercase tracking-wider">
                  Faculty
                </span>
              </div>
              <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                Manage assigned classes, attendance, marks, and student progress.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
              <span className="text-[12px] text-[#6b7280]">18 Assigned Staff</span>
            </div>
            <button className="text-[13px] font-medium text-[#6b7280] flex items-center group-hover:text-[#111827] cursor-pointer">
              Configure
              <ChevronRight className="w-4 h-4 ml-0.5 text-[#9ca3af]" />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm mt-6">
          <div className="flex gap-3 mb-2">
            <Shield className="w-5 h-5 text-[#f97316] shrink-0" />
            <h4 className="text-[13px] font-bold text-[#111827]">Staff Role Assignment</h4>
          </div>
          <p className="text-[12px] text-[#6b7280] leading-relaxed">
            Individual accounts are assigned to these roles in <span className="underline cursor-pointer">Users (ADM-02)</span>. Role modifications propagate immediately across all authenticated sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
