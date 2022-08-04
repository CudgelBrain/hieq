import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { addInstitute, editInstitute, deleteInstitute, listInstitutes } from './itemAPI';

export interface InstituteForm {
  name: string;
}
export interface Institute {
  ID: string;
  name: string;
  createdAt: string;
}

export const InstituteSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  institutes: Record<string, Institute>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  institutes: {},
  status: 'idle',
  message: '',
};

export const certiInstituteSlice = createSlice({
  name: 'certiInstitute',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setInstitutes: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((institute: Institute) => {
        state.institutes[institute.ID] = institute;
      });
    },
    resetInstitutes: (state) => {
      state.institutes = {};
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

export const { setInstitutes, resetInstitutes, setStatus, setMessage, onStart, onStop } =
  certiInstituteSlice.actions;

export default certiInstituteSlice.reducer;

export const AddInstitute =
  (formData: InstituteForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await addInstitute({ names: formData })
        : await addInstitute(formData);
      dispatch(setStatus(status));
      dispatch(resetInstitutes());
      dispatch(setInstitutes(data));
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

export const EditInstitute =
  ({ ID }: Institute, formData: InstituteForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editInstitute(ID, formData);
      dispatch(resetInstitutes());
      dispatch(setInstitutes(data));
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

export const DeleteInstitute =
  ({ ID }: Institute, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteInstitute(ID);
      dispatch(resetInstitutes());
      dispatch(setInstitutes(data));
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

export const ListInstitutes =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listInstitutes();
      dispatch(resetInstitutes());
      dispatch(setInstitutes(data));
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
