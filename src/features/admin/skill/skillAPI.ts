import { hieqService } from 'utils';
import { SkillForm } from './skillSlice';

export const AddSkill = async (formData: SkillForm | Record<string, string[]>) => {
  return hieqService.post('/skill', formData);
};

export const EditSkill = async (skillID: string, formData: SkillForm) => {
  return hieqService.put(`/skill/${skillID}`, formData);
};

export const DeleteSkill = async (skillID: string) => {
  return hieqService.delete(`/skill/${skillID}`);
};

export const ListSkills = async () => {
  return hieqService.get('/skill/list');
};
