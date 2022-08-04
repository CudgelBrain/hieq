import { hieqService } from 'utils';
import { InstituteGroupForm } from './itemSlice';

export const addInstituteGroup = async (
  formData: InstituteGroupForm | Record<string, string[]>,
) => {
  return hieqService.post('/instituteGroup', formData);
};

export const editInstituteGroup = async (
  instituteGroupID: string,
  formData: InstituteGroupForm,
) => {
  return hieqService.put(`/instituteGroup/${instituteGroupID}`, formData);
};

export const deleteInstituteGroup = async (instituteGroupID: string) => {
  return hieqService.delete(`/instituteGroup/${instituteGroupID}`);
};

export const listInstituteGroups = async () => {
  return hieqService.get('/instituteGroup/list');
};
