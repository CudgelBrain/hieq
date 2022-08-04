import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  addInstituteGroup,
  editInstituteGroup,
  deleteInstituteGroup,
  listInstituteGroups,
} from './itemAPI';

export interface InstituteGroupForm {
  name: string;
}
export interface InstituteGroup {
  ID: string;
  name: string;
  createdAt: string;
}

export const InstituteGroupSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  instituteGroups: Record<string, InstituteGroup>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  instituteGroups: {},
  status: 'idle',
  message: '',
};

export const instituteGroupSlice = createSlice({
  name: 'instituteGroup',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setInstituteGroups: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((instituteGroup: InstituteGroup) => {
        state.instituteGroups[instituteGroup.ID] = instituteGroup;
      });
    },
    resetInstituteGroups: (state) => {
      state.instituteGroups = {};
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

export const { setInstituteGroups, resetInstituteGroups, setStatus, setMessage, onStart, onStop } =
  instituteGroupSlice.actions;

export default instituteGroupSlice.reducer;

export const AddInstituteGroup =
  (formData: InstituteGroupForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await addInstituteGroup({ names: formData })
        : await addInstituteGroup(formData);
      dispatch(setStatus(status));
      dispatch(resetInstituteGroups());
      dispatch(setInstituteGroups(data));
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

export const EditInstituteGroup =
  ({ ID }: InstituteGroup, formData: InstituteGroupForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editInstituteGroup(ID, formData);
      dispatch(resetInstituteGroups());
      dispatch(setInstituteGroups(data));
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

export const DeleteInstituteGroup =
  ({ ID }: InstituteGroup, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteInstituteGroup(ID);
      dispatch(resetInstituteGroups());
      dispatch(setInstituteGroups(data));
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

export const ListInstituteGroups =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listInstituteGroups();
      dispatch(resetInstituteGroups());
      dispatch(setInstituteGroups(data));
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
