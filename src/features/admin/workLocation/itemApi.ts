import { hieqService } from 'utils';

export const addWorkLocation = async (formData: FormData) => {
    return hieqService.post('/workLocation', formData);
};

export const editWorkLocation = async (domainID: string, formData: FormData) => {
    return hieqService.put(`/workLocation/${domainID}`, formData);
};

export const removeWorkLocationLogo = async (domainID: string) => {
    return hieqService.patch(`/workLocation/${domainID}/removeLogo`);
};

export const deleteWorkLocation = async (domainID: string) => {
    return hieqService.delete(`/workLocation/${domainID}`);
};

export const listWorkLocations = async () => {
    return await hieqService.get('/workLocation');

};
