import { hieqService } from 'utils';
import { SpecializationForm } from './itemSlice';

export const addSpecialization = async (
  formData: SpecializationForm | Record<string, string[]>,
) => {
  return hieqService.post('/specialization', formData);
};

export const editSpecialization = async (
  specializationID: string,
  formData: SpecializationForm,
) => {
  return hieqService.put(`/specialization/${specializationID}`, formData);
};

export const deleteSpecialization = async (specializationID: string) => {
  return hieqService.delete(`/specialization/${specializationID}`);
};

export const listSpecializations = async () => {
  return hieqService.get('/specialization/list');
};
