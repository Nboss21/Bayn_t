import { Search, Bell } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="h-[64px] px-8 flex items-center justify-between border-b border-[#e5e7eb] bg-white shrink-0">
      <div className="flex items-center text-[13px] text-gray-500">
        <span>Registrar Workspace</span>
        <span className="mx-2 text-gray-300">/</span>
        <span>Applications</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-[#1a1a1a]">HOB-2026-0142</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search applicants, ID, or program" 
            className="pl-9 pr-4 py-1.5 w-[320px] bg-[#f9fafb] border border-[#e5e7eb] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <button className="relative p-1 text-gray-500 hover:text-[#1a1a1a] transition-colors">
          <Bell className="w-5 h-5" strokeWidth={2} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 bg-[#f5f6f1] pl-3 pr-1 py-1 rounded-full border border-[#e5e7eb]">
          <span className="text-[13px] font-medium text-[#1a1a1a]">Sandra Alemu</span>
          <div className="w-7 h-7 rounded-full bg-[#e3e6d8] flex items-center justify-center text-[11px] font-medium text-[#1a1a1a]">
            SA
          </div>
        </div>
      </div>
    </header>
  );
}
