import { hieqService } from 'utils';
import { CertificationForm } from './certificationSlice';

export const AddCertification = async (formData: CertificationForm | Record<string, string[]>) => {
  return hieqService.post('/certification', formData);
};

export const EditCertification = async (certificationID: string, formData: CertificationForm) => {
  return hieqService.put(`/certification/${certificationID}`, formData);
};

export const DeleteCertification = async (certificationID: string) => {
  return hieqService.delete(`/certification/${certificationID}`);
};

export const ListCertifications = async () => {
  return hieqService.get('/certification/list');
};
