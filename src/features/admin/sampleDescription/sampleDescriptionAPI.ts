import { hieqService } from 'utils';

export const AddDescription = async (formData: FormData) => {
  return await hieqService.post('/sampleDescription', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const EditDescription = async (descriptionID: string, isActive: boolean) => {
  return await hieqService.put(`/sampleDescription/${descriptionID}`, { isActive });
};

export const DeleteDescription = async (descriptionID: string) => {
  return await hieqService.delete(`/sampleDescription/${descriptionID}`);
};

export const ListDescriptions = async () => {
  return await hieqService.get('/sampleDescription/list');
};
