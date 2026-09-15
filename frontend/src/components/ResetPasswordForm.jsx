import { Link } from 'react-router-dom';
import { Eye, ChevronLeft } from 'lucide-react';

export default function ResetPasswordForm() {
  return (
    <div className="flex flex-col justify-center px-12 py-10 w-1/2 h-full">
      <div className="mb-8 mt-4">
        <h2 className="text-[26px] font-bold text-[#1C1F1E] mb-2 tracking-tight">Reset your password</h2>
        <p className="text-[13px] text-gray-500">Create a new password</p>
      </div>

      <form className="w-full">
        <div className="mb-5">
          <label className="block text-[12px] font-bold text-[#1C1F1E] mb-2">
            New password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full pl-4 pr-10 py-3 rounded-[12px] bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-[13px] text-gray-700 placeholder-gray-400 shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-[12px] font-bold text-[#1C1F1E] mb-2">
            Confirm password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Re-enter your new password"
              className="w-full pl-4 pr-10 py-3 rounded-[12px] bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-[13px] text-gray-700 placeholder-gray-400 shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-start">
          <span className="text-[12px] text-gray-500 mr-1.5 leading-none mt-[2px]">•</span>
          <p className="text-[12px] text-gray-500">Password must be at least 8 characters.</p>
        </div>

        <button
          type="button"
          className="w-full bg-[#B3C9A6] text-[#1C1F1E] font-medium text-[13.5px] px-6 py-3 rounded-[12px] hover:bg-[#a3ba96] transition-colors mb-8 shadow-sm"
        >
          Reset Password
        </button>
      </form>

      <div className="flex justify-center mt-2">
        <Link to="/" className="flex items-center text-[13px] text-gray-500 hover:text-black transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
