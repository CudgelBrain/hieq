import axios from 'axios';
import { HIEQ_SERVICE_URL } from 'constant';
import { refreshToken } from 'features/auth/authAPI';
import { clearTokens, getRefreshToken, getToken, history, setItemToStorage } from 'utils';

const publicURLS = ['/auth/login', '/auth/requestOTP'];

export const hieqService = axios.create({
  baseURL: HIEQ_SERVICE_URL,
});

// Request interceptor for API calls
hieqService.interceptors.request.use(
  (request) => {
    request.timeout = 10000;
    request.headers = {
      Authorization: `Bearer ${
        request.url === '/auth/refreshToken' ? getRefreshToken() : getToken()
      }`,
    };
    return request;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for API calls
hieqService.interceptors.response.use(
  ({ data, headers }) => ({ ...data, headers }),
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === '/auth/refreshToken') {
      clearTokens();
      setItemToStorage('prevURL', history.location.pathname, 'session');
      history.push('/login/password');
    } else if (
      error.response.status === 401 &&
      !publicURLS.includes(originalRequest.url) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const token = await refreshToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return hieqService(originalRequest);
    }
    return Promise.reject(error);
  },
);
