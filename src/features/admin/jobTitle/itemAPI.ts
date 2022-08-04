import { hieqService } from 'utils';
import { JobTitleForm } from './itemSlice';

export const addJobTitle = async (formData: JobTitleForm | Record<string, string[]>) => {
  return hieqService.post('/jobTitle', formData);
};

export const editJobTitle = async (formData: JobTitleForm, jobTitleID: string) => {
  return await hieqService.put(`/jobTitle/${jobTitleID}`, formData);
};

export const deleteJobTitle = async (jobTitleID: string) => {
  return await hieqService.delete(`/jobTitle/${jobTitleID}`);
};

export const listJobTitles = async () => {
  return await hieqService.get('/jobTitle/list');
};
