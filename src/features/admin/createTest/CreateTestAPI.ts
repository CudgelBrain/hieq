import { hieqService } from 'utils';
import { CreateTestForm } from './CreateTestSlice';

export const AddCreateTest = async (formData: CreateTestForm) => {
  return hieqService.post('/testType', formData);
};

export const EditCreateTest = async (testTypeID: string, formData: CreateTestForm) => {
  return hieqService.put(`/testType/${testTypeID}`, formData);
};

export const DeleteCreateTest = async (testTypeID: string) => {
  return hieqService.delete(`/testType/${testTypeID}`);
};

export const ListCreateTests = async () => {
  return hieqService.get('/testType/list');
};
