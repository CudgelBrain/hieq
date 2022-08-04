import { hieqService } from 'utils';

export const AddSuccessStory = async (formData: FormData) => {
  return hieqService.post('/successStory', formData);
};

export const EditSuccessStory = async (storyID: string, formData: FormData) => {
  return hieqService.put('/successStory', formData, {
    params: {
      storyID,
    },
  });
};

export const DeleteSuccessStory = async (storyID: string) => {
  return hieqService.delete(`/successStory/${storyID}`);
};

export const ListSuccessStories = async () => {
  return hieqService.get('/successStory/list');
};
