import { hieqService } from 'utils';
import { IndustryForm } from './industrySlice';

export const AddIndustry = async (formData: IndustryForm | Record<string, string[]>) => {
    return hieqService.post('/industry/add', formData);
};

export const EditIndustry = async (industryID: string, formData: IndustryForm) => {
    return hieqService.put(`/industry/${industryID}`, formData);
};

export const DeleteIndustry = async (industryID: string) => {
    return hieqService.delete(`/industry/${industryID}`);
};

export const ListIndustrys = async () => {
    return hieqService.get('/industry');
};
