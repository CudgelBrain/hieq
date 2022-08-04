import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddDesignation,
  EditDesignation,
  DeleteDesignation,
  ListDesignations,
} from './designationAPI';

export interface DesignationForm {
  name: string;
}
export interface Designation {
  ID: string;
  name: string;
  createdAt: string;
}

export const DesignationSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  designations: Record<string, Designation>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  designations: {},
  status: 'idle',
  message: '',
};

export const designationSlice = createSlice({
  name: 'designation',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setDesignations: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((designation: Designation) => {
        state.designations[designation.ID] = designation;
      });
    },
    resetDesignations: (state) => {
      state.designations = {};
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

export const { setDesignations, resetDesignations, setStatus, setMessage, onStart, onStop } =
  designationSlice.actions;

export default designationSlice.reducer;

export const addDesignation =
  (formData: DesignationForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await AddDesignation({ names: formData })
        : await AddDesignation(formData);
      dispatch(setStatus(status));
      dispatch(resetDesignations());
      dispatch(setDesignations(data));
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

export const editDesignation =
  ({ ID }: Designation, formData: DesignationForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditDesignation(ID, formData);
      dispatch(resetDesignations());
      dispatch(setDesignations(data));
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

export const deleteDesignation =
  ({ ID }: Designation, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteDesignation(ID);
      dispatch(resetDesignations());
      dispatch(setDesignations(data));
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

export const listDesignations =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListDesignations();
      dispatch(resetDesignations());
      dispatch(setDesignations(data));
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
