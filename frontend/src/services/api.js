import axios from 'axios';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
export const TOKEN_KEY = 'bayn_access_token';

export class ApiError extends Error {
  constructor(message, { status, errors, response } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors || {};
    this.response = response;
  }
}

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 15000),
  headers: { Accept: 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (!(config.data instanceof FormData)) config.headers['Content-Type'] = 'application/json';
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if (!response) throw new ApiError('Unable to connect to the academy server. Please try again.', {});
    if (response.status === 401) { localStorage.removeItem(TOKEN_KEY); window.dispatchEvent(new Event('bayn:unauthorized')); }
    const message = response.data?.message || (response.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : response.status >= 500 ? 'The academy server is temporarily unavailable.' : 'Request could not be completed.');
    throw new ApiError(message, { status: response.status, errors: response.data?.errors, response });
  },
);

export const api = {
  request: (config) => client.request(config),
  get: (url, params) => client.get(url, { params }),
  post: (url, data, config) => client.post(url, data, config),
  patch: (url, data) => client.patch(url, data),
  put: (url, data) => client.put(url, data),
  delete: (url) => client.delete(url),
};

export function unwrap(response) {
  return response?.data?.data ?? response?.data;
}

export function toUserMessage(error) {
  if (error?.status === 401) return 'Your session has expired. Please sign in again.';
  if (error?.status === 403) return 'You do not have permission to perform this action.';
  if (error?.status === 404) return 'The requested item could not be found.';
  if (error?.status === 409) return error.message || 'This action conflicts with the current status.';
  return error?.message || 'Something went wrong. Please try again.';
}
