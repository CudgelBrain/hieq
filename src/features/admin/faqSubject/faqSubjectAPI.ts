import { hieqService } from 'utils';
import { FaqSubjectForm } from './faqSubjectSlice';

export const AddFaqSubject = async (formData: FaqSubjectForm) => {
  return hieqService.post('/faqSubject', formData);
};

export const EditFaqSubject = async (subjectID: string, formData: FaqSubjectForm) => {
  return hieqService.put(`/faqSubject/${subjectID}`, formData);
};

export const DeleteFaqSubject = async (subjectID: string) => {
  return hieqService.delete(`/faqSubject/${subjectID}`);
};

export const ListFaqSubjects = async () => {
  return hieqService.get('/faqSubject/list');
};
