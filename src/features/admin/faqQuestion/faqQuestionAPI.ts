import { hieqService } from 'utils';
import { FaqQuestionForm } from './faqQuestionSlice';

export const AddFaqQuestion = async (formData: FaqQuestionForm) => {
  return hieqService.post('/faqQuestion', formData);
};

export const EditFaqQuestion = async (questionID: string, formData: FaqQuestionForm) => {
  return hieqService.put(`/faqQuestion/${questionID}`, formData);
};

export const DeleteFaqQuestion = async (questionID: string) => {
  return hieqService.delete(`/faqQuestion/${questionID}`);
};

export const ListFaqQuestions = async () => {
  return hieqService.get('/faqQuestion/list');
};

export const AddMedia = async (formData: FormData) => {
  return hieqService.post('/media', formData);
};
