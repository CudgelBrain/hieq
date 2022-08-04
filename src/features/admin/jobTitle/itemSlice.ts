import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { deleteJobTitle, editJobTitle, listJobTitles, addJobTitle } from './itemAPI';
import { isArray } from 'lodash';

export interface JobTitleForm {
  title: string;
  isActive: boolean;
}

export interface JobTitle extends JobTitleForm {
  ID: string;
  createdBy: string;
  createdAt: string;
}

export const JobTitleSchema = yup
  .object({
    title: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  jobTitles: Record<string, JobTitle>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  jobTitles: {},
  status: 'idle',
  message: '',
};

export const JobTitleSlice = createSlice({
  name: 'jobTitle',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setJobTitles: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((jobTitle: JobTitle) => {
        state.jobTitles[jobTitle.ID] = jobTitle;
      });
    },
    resetJobTitles: (state) => {
      state.jobTitles = {};
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

export const { setJobTitles, resetJobTitles, setStatus, setMessage, onStart, onStop } =
  JobTitleSlice.actions;

export default JobTitleSlice.reducer;

export const AddJobTitle =
  (formData: JobTitleForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await addJobTitle(
        isArray(formData) ? { items: formData } : formData,
      );
      dispatch(setStatus(status));
      dispatch(resetJobTitles());
      dispatch(setJobTitles(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const EditJobTitle =
  ({ ID }: JobTitle, formData: JobTitleForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editJobTitle(formData, ID);
      dispatch(resetJobTitles());
      dispatch(setJobTitles(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const DeleteJobTitle =
  ({ ID }: JobTitle, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteJobTitle(ID);
      dispatch(resetJobTitles());
      dispatch(setJobTitles(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const ListJobTitles =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listJobTitles();
      dispatch(resetJobTitles());
      dispatch(setJobTitles(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete && onComplete();
      }, 1000);
    }
  };
