import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft, Check, X } from 'lucide-react';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const requirements = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'One number', test: (p) => /\d/.test(p) },
    { label: 'One special character (@$!%*?&)', test: (p) => /[@$!%*?&]/.test(p) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!newPassword) {
      nextErrors.newPassword = 'Please enter a new password.';
    } else if (!strongPasswordRegex.test(newPassword)) {
      nextErrors.newPassword = 'Password must include uppercase, lowercase, number, and special character (min 8 chars).';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate('/auth/login');
    }
  };

  const inputClass = (field) =>
    `w-full pl-4 pr-10 py-3 rounded-[12px] bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-[13px] text-gray-700 placeholder-gray-400 shadow-sm${errors[field] ? ' ring-2 ring-red-400' : ''}`;

  const requirementText = newPassword || !errors.newPassword;

  return (
    <div className="flex flex-col justify-center px-12 py-10 w-1/2 h-full">
      <div className="mb-8 mt-4">
        <h2 className="text-[26px] font-bold text-[#1C1F1E] mb-2 tracking-tight">Reset your password</h2>
        <p className="text-[13px] text-gray-500">Create a new password</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-5">
          <label className="block text-[12px] font-bold text-[#1C1F1E] mb-2">
            New password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, newPassword: undefined }));
              }}
              className={inputClass('newPassword')}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[11px] text-red-500 mt-1.5 ml-1">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-[12px] font-bold text-[#1C1F1E] mb-2">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              className={inputClass('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-red-500 mt-1.5 ml-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-8">
          {requirementText && requirements.map((req) => (
            <div key={req.label} className="flex items-center mb-1">
              {req.test(newPassword) ? (
                <Check className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-gray-300 mr-2 shrink-0" />
              )}
              <span className={`text-[12px] ${req.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                {req.label}
              </span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#B3C9A6] text-[#1C1F1E] font-medium text-[13.5px] px-6 py-3 rounded-[12px] hover:bg-[#a3ba96] transition-colors mb-8 shadow-sm"
        >
          Reset Password
        </button>
      </form>

      <div className="flex justify-center mt-2">
        <Link to="/auth/login" className="flex items-center text-[13px] text-gray-500 hover:text-black transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
}