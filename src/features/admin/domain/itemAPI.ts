import { hieqService } from 'utils';

export const addDomain = async (formData: FormData) => {
  return hieqService.post('/multipleDomain', formData);
};

export const editDomain = async (domainID: string, formData: FormData) => {
  return hieqService.put(`/multipleDomain/${domainID}`, formData);
};

export const removeDomainLogo = async (domainID: string) => {
  return hieqService.patch(`/multipleDomain/${domainID}/removeLogo`);
};

export const deleteDomain = async (domainID: string) => {
  return hieqService.delete(`/multipleDomain/${domainID}`);
};

export const listDomains = async () => {
  return hieqService.get('/multipleDomain/list');
};
