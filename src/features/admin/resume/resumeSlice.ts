import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { DeleteResume, EditResume, ListResumes, AddResume } from './resumeAPI';

export interface ResumeForm {
  file: Record<string, any>;
}
export interface Resume {
  ID: string;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export const ResumeSchema = yup
  .object({
    file: yup
      .mixed()
      .test('name', 'You need to provide an accepted file format', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 5000000;
      })
      .test('type', 'We only support PDF', (value) => {
        return value[0] && ['application/pdf'].includes(value[0].type);
      }),
  })
  .required();

interface managerState {
  resumes: Record<string, Resume>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  resumes: {},
  status: 'idle',
  message: '',
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setResumes: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((resume: Resume) => {
        state.resumes[resume.ID] = resume;
      });
    },
    resetResumes: (state) => {
      state.resumes = {};
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

export const { setResumes, resetResumes, setStatus, setMessage, onStart, onStop } =
  resumeSlice.actions;

export default resumeSlice.reducer;

export const addResume =
  (file: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await AddResume(file);
      dispatch(resetResumes());
      dispatch(setResumes(data));
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

export const editResume =
  ({ ID, isActive }: Resume, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditResume(ID, !isActive);
      dispatch(resetResumes());
      dispatch(setResumes(data));
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

export const deleteResume =
  ({ ID }: Resume, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteResume(ID);
      dispatch(resetResumes());
      dispatch(setResumes(data));
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

export const listResumes =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListResumes();
      dispatch(resetResumes());
      dispatch(setResumes(data));
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
