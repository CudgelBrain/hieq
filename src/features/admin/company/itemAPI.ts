import { hieqService } from 'utils';
import { Company } from './itemSlice';

export const addCompany = async (formData: FormData | Record<string, Record<string, string>[]>) => {
  return hieqService.post('/company', formData);
};

export const editCompany = async (companyID: string, formData: FormData | Company) => {
  return hieqService.put(`/company/${companyID}`, formData);
};

export const removeCompany = async (companyID: string) => {
  return hieqService.patch(`/company/${companyID}/removeLogo`);
};

export const deleteCompany = async (companyID: string) => {
  return hieqService.delete(`/company/${companyID}`);
};

export const listCompanies = async () => {
  return hieqService.get('/company/list');
};
