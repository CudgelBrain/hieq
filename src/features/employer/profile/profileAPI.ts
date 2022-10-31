import { hieqService } from 'utils';

export const addEmployerProfile = async (formData: FormData) => {
  return await hieqService.post('/employerProfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const editEmployerProfile = async (formData: FormData) => {
  return await hieqService.put('/employerProfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEmployerProfile = async () => {
  return await hieqService.get(`/employerProfile`);
};
