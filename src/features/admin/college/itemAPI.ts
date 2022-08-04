import { hieqService } from 'utils';
import { CollegeForm } from './itemSlice';

export const addCollege = async (formData: CollegeForm | Record<string, string[]>) => {
  return hieqService.post('/college', formData);
};

export const editCollege = async (collegeID: string, formData: CollegeForm) => {
  return hieqService.put(`/college/${collegeID}`, formData);
};

export const deleteCollege = async (collegeID: string) => {
  return hieqService.delete(`/college/${collegeID}`);
};

export const listColleges = async () => {
  return hieqService.get('/college/list');
};
