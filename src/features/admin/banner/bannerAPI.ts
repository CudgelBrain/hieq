import { hieqService } from 'utils';

export const AddBanner = async (file: FormData) => {
  return await hieqService.post('/banner', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const EditBanner = async (bannerID: string, isActive: boolean) => {
  return await hieqService.put(`/banner/${bannerID}`, { isActive });
};

export const DeleteBanner = async (bannerID: string) => {
  return await hieqService.delete(`/banner/${bannerID}`);
};

export const ListBanners = async () => {
  return await hieqService.get('/banner/list');
};
