import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
  DeleteDescription,
  EditDescription,
  ListDescriptions,
  AddDescription,
} from './sampleDescriptionAPI';

export interface DescriptionForm {
  type: string;
  file: Record<string, any>;
}
export interface Description {
  ID: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export const DescriptionSchema = yup
  .object({
    type: yup.string().required().min(3).max(20),
    file: yup
      .mixed()
      .test('name', 'You need to provide an accepted file format', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 5000000;
      })
      .test('type', "We only support JPEG, PNG & GIF's", (value) => {
        return value[0] && ['application/pdf'].includes(value[0].type);
      }),
  })
  .required();

interface managerState {
  descriptions: Record<string, Description>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  descriptions: {},
  status: 'idle',
  message: '',
};

export const descriptionSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setDescriptions: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((description: Description) => {
        state.descriptions[description.ID] = description;
      });
    },
    resetDescriptions: (state) => {
      state.descriptions = {};
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

export const { setDescriptions, resetDescriptions, setStatus, setMessage, onStart, onStop } =
  descriptionSlice.actions;

export default descriptionSlice.reducer;

export const addDescription =
  (formData: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await AddDescription(formData);
      dispatch(resetDescriptions());
      dispatch(setDescriptions(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const editDescription =
  ({ ID, isActive }: Description, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditDescription(ID, !isActive);
      dispatch(resetDescriptions());
      dispatch(setDescriptions(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const deleteDescription =
  ({ ID }: Description, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteDescription(ID);
      dispatch(resetDescriptions());
      dispatch(setDescriptions(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };

export const listDescriptions =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListDescriptions();
      dispatch(resetDescriptions());
      dispatch(setDescriptions(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
        onComplete();
      }, 1000);
    }
  };
