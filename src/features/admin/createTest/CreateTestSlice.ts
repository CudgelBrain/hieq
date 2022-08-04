import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AddCreateTest, DeleteCreateTest, EditCreateTest, ListCreateTests } from './CreateTestAPI';

interface Category {
  name: string;
  type: string;
  easy: string;
  medium: string;
  tough: string;
}

interface Section {
  name: string;
  time: string;
  category: Category[];
}

export interface CreateTestForm {
  moduleType: string;
  functionalType: string;
  section: Section[];
  isActive: boolean;
}

export interface CreateTest extends CreateTestForm {
  ID: string;
  createdAt: string;
}

interface managerState {
  tests: Record<string, CreateTest>;
  status: string | number;
  message: string;
}

export const DefaultFormValue: CreateTestForm = {
  moduleType: '',
  functionalType: '',
  section: [
    { name: '', time: '', category: [{ name: '', type: '', easy: '', medium: '', tough: '' }] },
  ],
  isActive: false,
};

export const CreateTestSchema = yup
  .object()
  .shape({
    moduleType: yup.string().required('Module type is a required field'),
    /* functionalType: yup.string().when('moduleType', {
      is: (val: string) => val !== undefined && val === 'functional',
      then: yup.string().min(3).max(100).required(),
      otherwise: yup.string().min(3).max(100).notRequired(),
    }),*/
    section: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required('Section name is a required field'),
          time: yup.string().required('Section time is a required field'),
          category: yup
            .array()
            .of(
              yup.object().shape({
                name: yup.string().required('Question category is a required field'),
                type: yup.string().required('Question type is a required field'),
                easy: yup.string().required('Easy question level is a required field'),
                medium: yup.string().required('Medium question level is a required field'),
                tough: yup.string().required('Tough question level is a required field'),
              }),
            )
            .required(),
        }),
      )
      .required(),
  })
  .required();

const initialState: managerState = {
  tests: {},
  status: 'idle',
  message: '',
};

export const createTestSlice = createSlice({
  name: 'createTest',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setTests: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((test: CreateTest) => {
        state.tests[test.ID] = test;
      });
    },
    resetTests: (state) => {
      state.tests = {};
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

export const { setTests, resetTests, setStatus, setMessage, onStart, onStop } =
  createTestSlice.actions;

export default createTestSlice.reducer;

export const addTestType =
  (formData: CreateTestForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddCreateTest(formData);
      dispatch(setStatus(status));
      dispatch(resetTests());
      dispatch(setTests(data));
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

export const editTestType =
  ({ ID }: CreateTest, formData: CreateTestForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditCreateTest(ID, formData);
      dispatch(resetTests());
      dispatch(setTests(data));
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

export const deleteTestType =
  ({ ID }: CreateTest, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteCreateTest(ID);
      dispatch(resetTests());
      dispatch(setTests(data));
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

export const listTestType =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListCreateTests();
      dispatch(resetTests());
      dispatch(setTests(data));
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
