import { hieqService } from 'utils';
import { WorkLocationForm } from './itemSlice';

export const addWorkLocation = async (formData: WorkLocationForm | Record<string, string[]>) => {
    return hieqService.post('/workLocation/add', formData);
};

export const editWorkLocation = async (formData: WorkLocationForm, workLocationID: string) => {
    return await hieqService.put(`/workLocation/${workLocationID}`, formData);
};

export const deleteWorkLocation = async (workLocationID: string) => {
    return await hieqService.delete(`/workLocation/${workLocationID}`);
};


export const listWorkLocations = async () => {
    return await hieqService.get('/workLocation');

};
