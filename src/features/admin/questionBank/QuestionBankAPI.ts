import { hieqService } from 'utils';
import { QuestionBankForm } from './questionBankSlice';

export const AddQuestion = async (formData: QuestionBankForm) => {
  return hieqService.post('/questionBank', formData);
};

export const EditQuestion = async (questionID: string, formData: QuestionBankForm) => {
  return hieqService.put(`/questionBank/${questionID}`, formData);
};

export const DeleteQuestion = async (questionID: string) => {
  return hieqService.delete(`/questionBank/${questionID}`);
};

export const ListQuestions = async () => {
  return hieqService.get('/questionBank/list');
};
