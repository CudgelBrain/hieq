import { hieqService } from 'utils';
import { RoleInstituteForm } from './roleInstituteSlice';

export const AddRoleInstitute = async (formData: RoleInstituteForm | Record<string, string[]>) => {
  return hieqService.post('/roleInstitute', formData);
};

export const EditRoleInstitute = async (roleInstituteID: string, formData: RoleInstituteForm) => {
  return hieqService.put(`/roleInstitute/${roleInstituteID}`, formData);
};

export const DeleteRoleInstitute = async (roleInstituteID: string) => {
  return hieqService.delete(`/roleInstitute/${roleInstituteID}`);
};

export const ListRoleInstitutes = async () => {
  return hieqService.get('/roleInstitute/list');
};
