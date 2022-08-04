import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN } from 'constant';

export const getItemFromStorage = (key: string, type?: string) => {
  return type === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
};

export const setItemToStorage = (key: string, value: string, type?: string) => {
  type === 'session' ? sessionStorage.setItem(key, value) : localStorage.setItem(key, value);
};

export const removeItemFromStorage = (key: string, type?: string) => {
  type === 'session' ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
};

export const storeToken = (token: string) => {
  setItemToStorage(LOCAL_STORAGE_TOKEN, token);
};

export const storeRefreshToken = (token: string) => {
  setItemToStorage(LOCAL_STORAGE_REFRESH_TOKEN, token);
};

export const getToken = () => {
  return getItemFromStorage(LOCAL_STORAGE_TOKEN);
};

export const getRefreshToken = () => {
  return getItemFromStorage(LOCAL_STORAGE_REFRESH_TOKEN);
};

export const clearTokens = () => {
  removeItemFromStorage(LOCAL_STORAGE_TOKEN);
  removeItemFromStorage(LOCAL_STORAGE_REFRESH_TOKEN);
};

export const isAuthenticated = () => {
  return !!getToken();
};
