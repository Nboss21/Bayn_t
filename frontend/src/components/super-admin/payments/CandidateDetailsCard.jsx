import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CandidateDetailsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Candidate Details</h2>
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()}
          className="text-sm font-medium text-[#2d7a46] hover:underline flex items-center gap-0.5"
        >
          <span>View Profile</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Candidate Profile Info */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-14 h-14 rounded-full bg-[#d7e5d5] text-[#28492b] flex items-center justify-center font-bold text-base border border-[#c6d7c4] shrink-0">
          MT
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-tight">Mekdes Tesfaye</h3>
          <p className="text-sm text-gray-400 font-normal">mekdes.tesfaye@example.com</p>
          <p className="text-xs text-gray-400 font-normal mt-0.5">+251 91 148 2901 • Addis Ababa</p>
        </div>
      </div>

      {/* Details Rounded Gray Box */}
      <div className="bg-[#f6f8f5] border border-[#e1e6e0] rounded-2xl p-5 space-y-3.5">
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-gray-400 font-normal">Program</span>
          <span className="text-sm font-bold text-gray-900 text-right">Professional Makeup Artistry</span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-gray-400 font-normal">Assigned Cohort</span>
          <span className="text-sm font-medium text-gray-800 text-right">Fall 2026 (Intake Alpha)</span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-gray-400 font-normal">Lead Instructor</span>
          <span className="text-sm font-medium text-gray-800 text-right">Charlotte Dupont</span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-gray-400 font-normal">Studio Location</span>
          <span className="text-sm font-medium text-gray-800 text-right">Studio 101 — Vanity Station 8</span>
        </div>
      </div>

    </div>
  );
}

