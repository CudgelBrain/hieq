import { hieqService } from 'utils';

export const addOpportunity = async (data: FormData) => {
  return hieqService.post('/opportunity', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editOpportunity = async (data: FormData, opportunityID: string) => {
  return await hieqService.put(`/opportunity/${opportunityID}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const finishOpportunity = async (opportunityID: string) => {
  return await hieqService.put(`/opportunity/finish/${opportunityID}/?status=active`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteOpportunity = async (category: string, opportunityID: string) => {
  return await hieqService.delete(`/opportunity/${opportunityID}`, { params: { category } });
};

export const getOpportunity = async (opportunityID: string) => {
  return await hieqService.get(`/opportunity/${opportunityID}`);
};

export const listOpportunities = async (category: string, page: number, perPage: number) => {
  return await hieqService.get('/opportunity/list', { params: { category, page, perPage } });
};
export const listFilteredOpportunities = async (category: string, page: number, perPage: number, status: string, startDate: string, endDate: string) => {
  return await hieqService.get('/opportunity/status', { params: { status, from_date: startDate, to_date: endDate, category } });
};

export const addOpportunityDetail = async (file: FormData) => {
  return hieqService.post('/opportunity/add/description', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
