import { RegisterationForm, LoginForm, LoginOTPForm } from './authSlice';
import { hieqService, visitor, browser, clearTokens, storeToken, storeRefreshToken } from 'utils';

export const handShake = async () => {
  clearTokens();
  const { visitorId: deviceID } = await visitor();
  const [deviceName, deviceOS] = [`${browser!.name}-${browser!.type}`, browser!.os];
  return hieqService.post('/auth/handshake', { deviceName, deviceOS, deviceID });
};

export const register = async (formData: RegisterationForm) => {
  return hieqService.post('/auth/register', formData);
};

export const login = async (formData: LoginForm | LoginOTPForm) => {
  return hieqService.post('/auth/login', formData);
};

export const refreshToken = async () => {
  const { data } = await hieqService.post('/auth/refreshToken');
  storeToken(data.accessToken);
  storeRefreshToken(data.refreshToken);
  return data.accessToken;
};

export const requestOTP = async (phone: string) => {
  return hieqService.post('/auth/requestOTP', { phone, type: 'request-otp' });
};
