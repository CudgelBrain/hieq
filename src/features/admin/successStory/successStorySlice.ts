import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddSuccessStory,
  EditSuccessStory,
  DeleteSuccessStory,
  ListSuccessStories,
} from './successStoryAPI';

export interface SuccessStoryForm {
  name: string;
  quote: string;
  isActive: boolean;
  youtubeUrl: string;
  linkedInUrl: string;
  companyName: string;
  collegeName: string;
  logoOne: Record<string, any>;
  logoTwo: Record<string, any>;
  featuredImage: Record<string, any>;
}
export interface SuccessStory {
  ID: string;
  name: string;
  quote: string;
  isActive: boolean;
  createdAt: string;
  youtubeUrl: string;
  logoOneName: string;
  logoTwoName: string;
  linkedInUrl: string;
  companyName: string;
  collegeName: string;
  featuredImageName: string;
}

/* const requiredFileSchema = yup
  .mixed()
  .test('name', 'You need to provide an accepted file format', (value) => {
    return value[0] && value[0].name !== '';
  })
  .test('fileSize', 'The uploaded file is too large', (value) => {
    return value[0] && value[0].size <= 5000000;
  })
  .test('type', "We only support JPEG, PNG & GIF's", (value) => {
    return value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
  }); */

const optionalFileSchema = yup
  .mixed()
  .test('fileSize', 'The uploaded file is too large', (value) => {
    if (value[0]) return value[0].size <= 5000000;
    else return true;
  })
  .test('type', "We only support JPEG, PNG & GIF's", (value) => {
    if (value[0])
      return ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(value[0].type);
    else return true;
  });

export const SuccessStorySchema = yup
  .object({
    isActive: yup.boolean().required(),
    youtubeUrl: yup.string().url().required(),
    linkedInUrl: yup.string().url().required(),
    name: yup.string().min(2).max(100).required(),
    quote: yup.string().min(2).max(500).required(),
    companyName: yup.string().min(2).max(100).required(),
    collegeName: yup.string().min(2).max(100).required(),
    logoOne: optionalFileSchema,
    logoTwo: optionalFileSchema,
    featuredImage: optionalFileSchema,
  })
  .required();

interface managerState {
  stories: Record<string, SuccessStory>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  stories: {},
  status: 'idle',
  message: '',
};

export const companyLogoSlice = createSlice({
  name: 'ComapanyLogo',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setStories: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((story: SuccessStory) => {
        state.stories[story.ID] = story;
      });
    },
    resetStories: (state) => {
      state.stories = {};
    },
    setStatus: (state, { payload }: PayloadAction<string | number>) => {
      state.status = payload;
    },
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    onStop(state) {
      state.status = initialState.status;
      state.message = initialState.message;
    },
  },
});

export const { setStories, resetStories, setStatus, setMessage, onStart, onStop } =
  companyLogoSlice.actions;

export default companyLogoSlice.reducer;

export const addSuccessStory =
  (formData: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddSuccessStory(formData);
      dispatch(setStatus(status));
      dispatch(resetStories());
      dispatch(setStories(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 800);
    }
  };

export const editSuccessStory =
  ({ ID }: SuccessStory, formData: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditSuccessStory(ID, formData);
      dispatch(resetStories());
      dispatch(setStories(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 800);
    }
  };

export const deleteSuccessStory =
  ({ ID }: SuccessStory, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteSuccessStory(ID);
      dispatch(resetStories());
      dispatch(setStories(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 800);
    }
  };

export const listSuccessStories =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListSuccessStories();
      dispatch(resetStories());
      dispatch(setStories(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 800);
    }
  };
