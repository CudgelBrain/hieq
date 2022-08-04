import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { addCollege, editCollege, deleteCollege, listColleges } from './itemAPI';

export interface CollegeForm {
  name: string;
  group?: string;
}
export interface College extends CollegeForm {
  ID: string;
  createdAt: string;
}

export const CollegeSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  colleges: Record<string, College>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  colleges: {},
  status: 'idle',
  message: '',
};

export const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setColleges: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((college: College) => {
        state.colleges[college.ID] = college;
      });
    },
    resetColleges: (state) => {
      state.colleges = {};
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

export const { setColleges, resetColleges, setStatus, setMessage, onStart, onStop } =
  collegeSlice.actions;

export default collegeSlice.reducer;

export const AddCollege =
  (formData: CollegeForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await addCollege({ names: formData })
        : await addCollege(formData);
      dispatch(setStatus(status));
      dispatch(resetColleges());
      dispatch(setColleges(data));
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

export const EditCollege =
  ({ ID }: College, formData: CollegeForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editCollege(ID, formData);
      dispatch(resetColleges());
      dispatch(setColleges(data));
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

export const DeleteCollege =
  ({ ID }: College, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteCollege(ID);
      dispatch(resetColleges());
      dispatch(setColleges(data));
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

export const ListColleges =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listColleges();
      dispatch(resetColleges());
      dispatch(setColleges(data));
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
