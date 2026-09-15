
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/registrar/overview');
  };

  return (
    <div className="flex flex-col justify-center px-12 py-10 w-1/2">
      <h2 className="text-3xl font-bold mb-8 text-black tracking-widest text-center">LOGIN</h2>

      <div className="mb-4">
        <label className="block text-[11px] font-bold text-black mb-1 ml-4" htmlFor="username">
          USER NAME
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-[11px] font-bold text-black mb-1 ml-4" htmlFor="password">
          PASSWORD
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-sm pr-12"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <Link to="/forgot-password" className="text-[12px] text-[#355E67] hover:underline mr-4">
          Forgot password?
        </Link>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          type="button"
          className="bg-[#B0C4A4] text-[#355E67] font-bold text-sm px-12 py-2.5 rounded-full hover:bg-[#a0b494] transition-colors shadow-sm"
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
