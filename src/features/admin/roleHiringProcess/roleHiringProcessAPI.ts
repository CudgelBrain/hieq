import { hieqService } from 'utils';
import { RoleHiringProcessForm } from './roleHiringProcessSlice';

export const AddRoleHiringProcess = async (
  formData: RoleHiringProcessForm | Record<string, string[]>,
) => {
  return hieqService.post('/roleHiringProcess', formData);
};

export const EditRoleHiringProcess = async (
  roleHiringProcessID: string,
  formData: RoleHiringProcessForm,
) => {
  return hieqService.put(`/roleHiringProcess/${roleHiringProcessID}`, formData);
};

export const DeleteRoleHiringProcess = async (roleHiringProcessID: string) => {
  return hieqService.delete(`/roleHiringProcess/${roleHiringProcessID}`);
};

export const ListRoleHiringProcesses = async () => {
  return hieqService.get('/roleHiringProcess/list');
};
