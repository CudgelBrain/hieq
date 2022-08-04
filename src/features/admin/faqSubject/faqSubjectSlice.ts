import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AddFaqSubject, EditFaqSubject, DeleteFaqSubject, ListFaqSubjects } from './faqSubjectAPI';

export interface FaqSubjectForm {
  name: string;
  topics: { name: string }[];
  isActive: boolean;
}
export interface FaqSubject extends FaqSubjectForm {
  ID: string;
  createdAt: string;
}

const nameSchema = {
  name: yup.string().min(2).max(100).required(),
};

export const FaqSubjectSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
    topics: yup.array().of(yup.object().shape(nameSchema)).min(1).max(20).required(),
    isActive: yup.boolean().required(),
  })
  .required();

interface managerState {
  subjects: Record<string, FaqSubject>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  subjects: {},
  status: 'idle',
  message: '',
};

export const faqSubjectSlice = createSlice({
  name: 'faqSubject',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setSubjects: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((subject: FaqSubject) => {
        state.subjects[subject.ID] = subject;
      });
    },
    resetSubjects: (state) => {
      state.subjects = {};
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

export const { setSubjects, resetSubjects, setStatus, setMessage, onStart, onStop } =
  faqSubjectSlice.actions;

export default faqSubjectSlice.reducer;

export const addFaqSubject =
  (formData: FaqSubjectForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddFaqSubject(formData);
      dispatch(setStatus(status));
      dispatch(resetSubjects());
      dispatch(setSubjects(data));
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

export const editFaqSubject =
  ({ ID }: FaqSubject, formData: FaqSubjectForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditFaqSubject(ID, formData);
      dispatch(resetSubjects());
      dispatch(setSubjects(data));
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

export const deleteFaqSubject =
  ({ ID }: FaqSubject, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteFaqSubject(ID);
      dispatch(resetSubjects());
      dispatch(setSubjects(data));
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

export const listFaqSubjects =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListFaqSubjects();
      dispatch(resetSubjects());
      dispatch(setSubjects(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete && onComplete();
      }, 800);
    }
  };
