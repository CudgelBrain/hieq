import { hieqService } from 'utils';
import { DesignationForm } from './designationSlice';

export const AddDesignation = async (formData: DesignationForm | Record<string, string[]>) => {
  return hieqService.post('/designation', formData);
};

export const EditDesignation = async (designationID: string, formData: DesignationForm) => {
  return hieqService.put(`/designation/${designationID}`, formData);
};

export const DeleteDesignation = async (designationID: string) => {
  return hieqService.delete(`/designation/${designationID}`);
};

export const ListDesignations = async () => {
  return hieqService.get('/designation/list');
};
