import { api, TOKEN_KEY, unwrap } from './api';

export const authService = {
  async login(credentials) {
    const result = await api.post('/auth/login', credentials);
    localStorage.setItem(TOKEN_KEY, result.data.access_token);
    return result.data.user;
  },
  async logout() {
    try { await api.post('/auth/logout'); } finally { localStorage.removeItem(TOKEN_KEY); }
  },
  async me() { return unwrap(await api.get('/auth/me')); },
  async refresh(device_name) {
    const result = await api.post('/auth/refresh', { device_name });
    localStorage.setItem(TOKEN_KEY, result.data.access_token);
    return result.data;
  },
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (payload) => api.post('/auth/reset-password', payload),
  hasToken: () => Boolean(localStorage.getItem(TOKEN_KEY)),
};
