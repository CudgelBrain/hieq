import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddQuestionCategory,
  EditQuestionCategory,
  DeleteQuestionCategory,
  ListQuestionCategories,
} from './questionCategoryAPI';

export interface QuestionCategoryForm {
  name: string;
  moduleType: string;
  functionalType: string;
}
export interface QuestionCategory extends QuestionCategoryForm {
  ID: string;
  isActive: boolean;
  createdAt: string;
}

export const QuestionCategorySchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
    moduleType: yup.string().min(2).max(100).required(),
    /* functionalType: yup.string().when('moduleType', {
      is: (val: string) => val !== undefined && val === 'functional',
      then: yup.string().min(3).max(100).required(),
      otherwise: yup.string().min(3).max(100).notRequired(),
    }),*/
  })
  .required();

interface managerState {
  categories: Record<string, QuestionCategory>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  categories: {},
  status: 'idle',
  message: '',
};

export const questionCategorySlice = createSlice({
  name: 'QuestionCategory',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setCategories: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((category: QuestionCategory) => {
        state.categories[category.ID] = category;
      });
    },
    resetCategories: (state) => {
      state.categories = {};
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

export const { setCategories, resetCategories, setStatus, setMessage, onStart, onStop } =
  questionCategorySlice.actions;

export default questionCategorySlice.reducer;

export const addQuestionCategory =
  (formData: QuestionCategoryForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddQuestionCategory(formData);
      dispatch(setStatus(status));
      dispatch(resetCategories());
      dispatch(setCategories(data));
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

export const editQuestionCategory =
  ({ ID }: QuestionCategory, formData: QuestionCategoryForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditQuestionCategory(ID, formData);
      dispatch(resetCategories());
      dispatch(setCategories(data));
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

export const deleteQuestionCategory =
  ({ ID }: QuestionCategory, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteQuestionCategory(ID);
      dispatch(resetCategories());
      dispatch(setCategories(data));
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

export const listQuestionCategories =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListQuestionCategories();
      dispatch(resetCategories());
      dispatch(setCategories(data));
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
