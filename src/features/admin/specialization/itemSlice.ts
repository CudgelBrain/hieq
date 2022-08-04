import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  addSpecialization,
  editSpecialization,
  deleteSpecialization,
  listSpecializations,
} from './itemAPI';

export interface SpecializationForm {
  name: string;
  degree: string;
}
export interface Specialization extends SpecializationForm {
  ID: string;
  createdAt: string;
}

export const SpecializationSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
    degree: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  specializations: Record<string, Specialization>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  specializations: {},
  status: 'idle',
  message: '',
};

export const specializationSlice = createSlice({
  name: 'specialization',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setSpecializations: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((specialization: Specialization) => {
        state.specializations[specialization.ID] = specialization;
      });
    },
    resetSpecializations: (state) => {
      state.specializations = {};
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

export const { setSpecializations, resetSpecializations, setStatus, setMessage, onStart, onStop } =
  specializationSlice.actions;

export default specializationSlice.reducer;

export const AddSpecialization =
  (formData: SpecializationForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await addSpecialization({ names: formData })
        : await addSpecialization(formData);
      dispatch(setStatus(status));
      dispatch(resetSpecializations());
      dispatch(setSpecializations(data));
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

export const EditSpecialization =
  ({ ID }: Specialization, formData: SpecializationForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editSpecialization(ID, formData);
      dispatch(resetSpecializations());
      dispatch(setSpecializations(data));
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

export const DeleteSpecialization =
  ({ ID }: Specialization, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteSpecialization(ID);
      dispatch(resetSpecializations());
      dispatch(setSpecializations(data));
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

export const ListSpecializations =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listSpecializations();
      dispatch(resetSpecializations());
      dispatch(setSpecializations(data));
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
