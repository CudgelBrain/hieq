import { detect } from 'detect-browser';
import { createBrowserHistory } from 'history';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const history = createBrowserHistory();

export const browser = detect();

const fpPromise = FingerprintJS.load();

export const visitor = async () => {
  const fingerPrint = await fpPromise;
  return fingerPrint.get();
};

export const fileExtension = (mimeType: string) => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/bmp':
      return 'bmp';
    case 'image/webp':
      return 'webp';
    case 'application/pdf':
      return 'pdf';
    default:
      return 'jpg';
  }
};

export * from './axios.util';
export * from './storage.util';
export * from './dateTime.util';
