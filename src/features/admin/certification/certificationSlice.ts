import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddCertification,
  EditCertification,
  DeleteCertification,
  ListCertifications,
} from './certificationAPI';

export interface CertificationForm {
  name: string;
}
export interface Certification {
  ID: string;
  name: string;
  createdAt: string;
}

export const CertificationSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  certifications: Record<string, Certification>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  certifications: {},
  status: 'idle',
  message: '',
};

export const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setCertifications: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((certification: Certification) => {
        state.certifications[certification.ID] = certification;
      });
    },
    resetCertifications: (state) => {
      state.certifications = {};
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

export const { setCertifications, resetCertifications, setStatus, setMessage, onStart, onStop } =
  certificationSlice.actions;

export default certificationSlice.reducer;

export const addCertification =
  (formData: CertificationForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await AddCertification({ names: formData })
        : await AddCertification(formData);
      dispatch(setStatus(status));
      dispatch(resetCertifications());
      dispatch(setCertifications(data));
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

export const editCertification =
  ({ ID }: Certification, formData: CertificationForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditCertification(ID, formData);
      dispatch(resetCertifications());
      dispatch(setCertifications(data));
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

export const deleteCertification =
  ({ ID }: Certification, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteCertification(ID);
      dispatch(resetCertifications());
      dispatch(setCertifications(data));
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

export const listCertifications =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListCertifications();
      dispatch(resetCertifications());
      dispatch(setCertifications(data));
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
