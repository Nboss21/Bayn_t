import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { TOKEN_KEY } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(authService.hasToken());

  useEffect(() => {
    if (!authService.hasToken()) return;
    authService.me().then(setUser).catch(() => localStorage.removeItem(TOKEN_KEY)).finally(() => setLoading(false));
  }, []);
  useEffect(() => { const clear = () => setUser(null); window.addEventListener('bayn:unauthorized', clear); return () => window.removeEventListener('bayn:unauthorized', clear); }, []);

  const login = useCallback(async (credentials) => { const next = await authService.login(credentials); setUser(next); return next; }, []);
  const logout = useCallback(async () => { await authService.logout(); setUser(null); }, []);
  const value = { user, loading, isAuthenticated: Boolean(user), role: user?.role, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
