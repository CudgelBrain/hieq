import { hieqService } from 'utils';
import { FooterContentForm } from './contentSlice';

export const AddFooterContent = async (formData: FooterContentForm) => {
  return hieqService.post('/footerContent', formData);
};

export const EditFooterContent = async (contentType: string, formData: FooterContentForm) => {
  return hieqService.put(`/footerContent/${contentType}`, formData);
};

export const GetFooterContent = async (contentType: string) => {
  return hieqService.get(`/footerContent/${contentType}`);
};
