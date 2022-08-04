import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddRoleHiringProcess,
  EditRoleHiringProcess,
  DeleteRoleHiringProcess,
  ListRoleHiringProcesses,
} from './roleHiringProcessAPI';

export interface RoleHiringProcessForm {
  name: string;
}
export interface RoleHiringProcess {
  ID: string;
  name: string;
  createdAt: string;
}

export const RoleHiringProcessSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  roleHiringProcesses: Record<string, RoleHiringProcess>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  roleHiringProcesses: {},
  status: 'idle',
  message: '',
};

export const roleHiringProcessSlice = createSlice({
  name: 'roleHiringProcess',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setRoleHiringProcesses: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((roleHiringProcess: RoleHiringProcess) => {
        state.roleHiringProcesses[roleHiringProcess.ID] = roleHiringProcess;
      });
    },
    resetRoleHiringProcesses: (state) => {
      state.roleHiringProcesses = {};
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

export const {
  setRoleHiringProcesses,
  resetRoleHiringProcesses,
  setStatus,
  setMessage,
  onStart,
  onStop,
} = roleHiringProcessSlice.actions;

export default roleHiringProcessSlice.reducer;

export const addRoleHiringProcess =
  (formData: RoleHiringProcessForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await AddRoleHiringProcess({ names: formData })
        : await AddRoleHiringProcess(formData);
      dispatch(setStatus(status));
      dispatch(resetRoleHiringProcesses());
      dispatch(setRoleHiringProcesses(data));
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

export const editRoleHiringProcess =
  ({ ID }: RoleHiringProcess, formData: RoleHiringProcessForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditRoleHiringProcess(ID, formData);
      dispatch(resetRoleHiringProcesses());
      dispatch(setRoleHiringProcesses(data));
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

export const deleteRoleHiringProcess =
  ({ ID }: RoleHiringProcess, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteRoleHiringProcess(ID);
      dispatch(resetRoleHiringProcesses());
      dispatch(setRoleHiringProcesses(data));
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

export const listRoleHiringProcesses =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListRoleHiringProcesses();
      dispatch(resetRoleHiringProcesses());
      dispatch(setRoleHiringProcesses(data));
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
