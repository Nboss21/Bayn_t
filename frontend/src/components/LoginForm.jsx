import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toUserMessage } from '../services/api';
import { roleHome } from '../utils/roleHome';

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    login({ email: username.trim(), password })
      .then((user) =>
        navigate(roleHome(user.role), { replace: true })
      )
      .catch((err) => setError(toUserMessage(err)))
      .finally(() => setBusy(false));
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center px-12 py-10 w-1/2">
      <h2 className="text-3xl font-bold mb-8 text-black tracking-widest text-center">LOGIN</h2>

      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

      <div className="mb-4">
        <label className="block text-[11px] font-bold text-black mb-1 ml-4" htmlFor="username">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-[11px] font-bold text-black mb-1 ml-4" htmlFor="password">
          PASSWORD
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#78C4DF] text-sm pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Link to="/auth/forgot-password" className="text-[12px] text-[#355E67] hover:underline mr-4">
          Forgot password?
        </Link>
      </div>

      <div className="flex justify-center mb-5">
        <button
          type="submit"
          disabled={busy}
          className="bg-[#B0C4A4] text-[#355E67] font-bold text-sm px-12 py-2.5 rounded-full hover:bg-[#a0b494] transition-colors shadow-sm disabled:opacity-50"
        >
          {busy ? 'SIGNING IN…' : 'LOG IN'}
        </button>
      </div>

    </form>
  );
}
