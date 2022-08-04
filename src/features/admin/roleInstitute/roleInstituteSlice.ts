import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  AddRoleInstitute,
  EditRoleInstitute,
  DeleteRoleInstitute,
  ListRoleInstitutes,
} from './roleInstituteAPI';

export interface RoleInstituteForm {
  name: string;
}
export interface RoleInstitute {
  ID: string;
  name: string;
  createdAt: string;
}

export const RoleInstituteSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  roleInstitutes: Record<string, RoleInstitute>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  roleInstitutes: {},
  status: 'idle',
  message: '',
};

export const roleInstituteSlice = createSlice({
  name: 'roleInstitute',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setRoleInstitutes: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((roleInstitute: RoleInstitute) => {
        state.roleInstitutes[roleInstitute.ID] = roleInstitute;
      });
    },
    resetRoleInstitutes: (state) => {
      state.roleInstitutes = {};
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

export const { setRoleInstitutes, resetRoleInstitutes, setStatus, setMessage, onStart, onStop } =
  roleInstituteSlice.actions;

export default roleInstituteSlice.reducer;

export const addRoleInstitute =
  (formData: RoleInstituteForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await AddRoleInstitute({ names: formData })
        : await AddRoleInstitute(formData);
      dispatch(setStatus(status));
      dispatch(resetRoleInstitutes());
      dispatch(setRoleInstitutes(data));
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

export const editRoleInstitute =
  ({ ID }: RoleInstitute, formData: RoleInstituteForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditRoleInstitute(ID, formData);
      dispatch(resetRoleInstitutes());
      dispatch(setRoleInstitutes(data));
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

export const deleteRoleInstitute =
  ({ ID }: RoleInstitute, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteRoleInstitute(ID);
      dispatch(resetRoleInstitutes());
      dispatch(setRoleInstitutes(data));
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

export const listRoleInstitutes =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListRoleInstitutes();
      dispatch(resetRoleInstitutes());
      dispatch(setRoleInstitutes(data));
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
