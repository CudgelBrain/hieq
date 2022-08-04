import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AddQuestion, EditQuestion, DeleteQuestion, ListQuestions } from './QuestionBankAPI';
export interface QuestionOption {
  level?: string;
  type?: string;
  time?: string;
  absoluteMarking?: string;
  partialMarking?: string;
  negativeMarking?: string;
}
export interface Question extends QuestionOption {
  question: string;
  options: { option: ''; isCorrect: boolean }[];
}

export interface QuestionBankForm extends QuestionOption {
  moduleType: string;
  functionalType: string;
  category: string;
  instruction: string;
  questions: Question[];
  isActive: boolean;
}
export interface QuestionBank extends QuestionBankForm {
  ID: string;
  isActive: boolean;
  createdAt: string;
}

export const DefaultQuestionValue: Question = {
  level: '',
  type: '',
  time: '',
  absoluteMarking: '',
  partialMarking: '',
  negativeMarking: '',
  question: '',
  options: [
    { option: '', isCorrect: false },
    { option: '', isCorrect: false },
    { option: '', isCorrect: false },
    { option: '', isCorrect: false },
  ],
};

export const DefaultFormValue: QuestionBankForm = {
  moduleType: '',
  functionalType: '',
  level: '',
  type: '',
  time: '',
  absoluteMarking: '',
  partialMarking: '',
  negativeMarking: '',
  category: '',
  instruction: '',
  isActive: false,
  questions: [DefaultQuestionValue],
};

const optionSchema = {
  isCorrect: yup.boolean().required(),
  option: yup.string().required('Option is a required field'),
};

const questionSchema = {
  question: yup.string().required('Question is a required field'),
  options: yup.array(yup.object(optionSchema)).required('Options is a required field'),
};

export const QuestionBankSchema = yup
  .object({
    moduleType: yup.string().required(),
    functionalType: yup.string().when('moduleType', {
      is: (val: string) => val !== undefined && val === 'functional',
      then: yup.string().min(3).max(100).required(),
      otherwise: yup.string().notRequired(),
    }),
    category: yup.string().required(),
    time: yup.string().required(),
    absoluteMarking: yup.string().required(),
    partialMarking: yup.string().required(),
    negativeMarking: yup.string().required(),
    level: yup.string().required(),
    type: yup.string().required(),
    instruction: yup.string().min(2).max(250).required(),
    questions: yup.array(yup.object(questionSchema)).required(),
    isActive: yup.boolean().required(),
  })
  .required();

interface managerState {
  questions: Record<string, QuestionBank>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  questions: {},
  status: 'idle',
  message: '',
};

export const questionBankSlice = createSlice({
  name: 'createTest',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setQuestions: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((question: QuestionBank) => {
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
  questionBankSlice.actions;

export default questionBankSlice.reducer;

export const addQuestion =
  (formData: QuestionBankForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddQuestion(formData);
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

export const editQuestion =
  ({ ID }: QuestionBank, formData: QuestionBankForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditQuestion(ID, formData);
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

export const deleteQuestion =
  ({ ID }: QuestionBank, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteQuestion(ID);
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

export const listQuestions =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListQuestions();
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
