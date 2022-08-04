import { hieqService } from 'utils';

export const AddResume = async (file: FormData) => {
  return await hieqService.post('/resume', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const EditResume = async (resumeID: string, isActive: boolean) => {
  return await hieqService.put(`/resume/${resumeID}`, { isActive });
};

export const DeleteResume = async (resumeID: string) => {
  return await hieqService.delete(`/resume/${resumeID}`);
};

export const ListResumes = async () => {
  return await hieqService.get('/resume/list');
};
