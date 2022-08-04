import { hieqService } from 'utils';
import { QuestionCategoryForm } from './questionCategorySlice';

export const AddQuestionCategory = async (formData: QuestionCategoryForm) => {
  return hieqService.post('/questionCategory', formData);
};

export const EditQuestionCategory = async (categoryID: string, formData: QuestionCategoryForm) => {
  return hieqService.put(`/questionCategory/${categoryID}`, formData);
};

export const DeleteQuestionCategory = async (categoryID: string) => {
  return hieqService.delete(`/questionCategory/${categoryID}`);
};

export const ListQuestionCategories = async () => {
  return hieqService.get('/questionCategory/list');
};
