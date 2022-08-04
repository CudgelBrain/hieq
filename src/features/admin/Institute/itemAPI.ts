import { hieqService } from 'utils';
import { InstituteForm } from './itemSlice';

export const addInstitute = async (formData: InstituteForm | Record<string, string[]>) => {
  return hieqService.post('/institute', formData);
};

export const editInstitute = async (instituteID: string, formData: InstituteForm) => {
  return hieqService.put(`/institute/${instituteID}`, formData);
};

export const deleteInstitute = async (instituteID: string) => {
  return hieqService.delete(`/institute/${instituteID}`);
};

export const listInstitutes = async () => {
  return hieqService.get('/institute/list');
};
