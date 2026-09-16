import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Info } from 'lucide-react';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Simulate sending email, then navigate to reset password page for demo purposes
    navigate('/auth/reset-password'); 
  };

  return (
    <div className="flex flex-col justify-center px-10 py-10 w-1/2 relative h-full">
      {/* Back link */}
      <div className="absolute top-8 left-10">
        <Link to="/auth/login" className="flex items-center text-[13px] text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </div>

      <div className="mt-6">
        <h2 className="text-[28px] font-bold mb-3 text-[#1C1F1E] tracking-tight">Reset Your Password</h2>
        <p className="text-[13px] text-gray-500 mb-8 leading-relaxed pr-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleReset} className="w-full">
          <div className="mb-6">
            <label className="block text-[12px] font-bold text-[#1C1F1E] mb-2" htmlFor="email">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full pl-11 pr-5 py-3 rounded-[12px] bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-[13px] text-gray-700 placeholder-gray-400 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B3C9A6] text-[#1C1F1E] font-medium text-[13.5px] px-6 py-3 rounded-[12px] hover:bg-[#a3ba96] transition-colors shadow-sm flex items-center justify-center mb-6"
          >
            Send Reset Link <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="flex items-center justify-center mb-6">
          <div className="flex-grow h-px bg-gray-300 opacity-50"></div>
          <span className="px-4 text-[12px] text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 opacity-50"></div>
        </div>

        <div className="bg-[#EAF5F8] rounded-[12px] p-4 flex items-start border border-[#d2e8ef]">
          <div className="bg-[#78C4DF] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
            <Info className="w-3 h-3" />
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#1C1F1E] mb-0.5">Need help?</h4>
            <p className="text-[12px] text-gray-500">
              If you're still having trouble, <Link to="/contact" className="text-[#355E67] hover:underline font-medium">contact your administrator</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
