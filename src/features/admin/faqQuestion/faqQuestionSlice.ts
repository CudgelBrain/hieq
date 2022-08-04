import * as yup from 'yup';
import { AppThunk } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddFaqQuestion,
  DeleteFaqQuestion,
  EditFaqQuestion,
  ListFaqQuestions,
} from './faqQuestionAPI';

export interface OptionType {
  readonly value: string;
  readonly label: string;
}

export interface FaqQuestionForm {
  for: string;
  subject: string;
  topic: string;
  question: string;
  answer: string;
  tags: string[];
  isActive: boolean;
}

export interface FaqQuestion extends FaqQuestionForm {
  ID: string;
  createdAt: string;
}

export const FaqQuestionSchema = yup
  .object({
    for: yup.string().min(2).max(100).required(),
    subject: yup.string().min(2).max(100).required(),
    topic: yup.string().min(2).max(100).required(),
    question: yup.string().min(2).max(100).required(),
    answer: yup.string().min(2).required(),
    tags: yup.array().of(yup.string().min(2).max(100)),
    isActive: yup.boolean().required(),
  })
  .required();

interface managerState {
  questions: Record<string, FaqQuestion>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  questions: {},
  status: 'idle',
  message: '',
};

export const faqQuestionSlice = createSlice({
  name: 'faqQuestion',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setQuestions: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((question: FaqQuestion) => {
        state.questions[question.ID] = question;
      });
    },
    resetQuestions: (state) => {
      state.questions = {};
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

export const { setQuestions, resetQuestions, setStatus, setMessage, onStart, onStop } =
  faqQuestionSlice.actions;

export default faqQuestionSlice.reducer;

export const addFaqQuestion =
  (formData: FaqQuestionForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddFaqQuestion(formData);
      dispatch(setStatus(status));
      dispatch(resetQuestions());
      dispatch(setQuestions(data));
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

export const editFaqQuestion =
  ({ ID }: FaqQuestion, formData: FaqQuestionForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditFaqQuestion(ID, formData);
      dispatch(resetQuestions());
      dispatch(setQuestions(data));
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

export const deleteFaqQuestion =
  ({ ID }: FaqQuestion, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteFaqQuestion(ID);
      dispatch(resetQuestions());
      dispatch(setQuestions(data));
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

export const listFaqQuestions =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListFaqQuestions();
      dispatch(resetQuestions());
      dispatch(setQuestions(data));
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
