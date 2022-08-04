import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AddFooterContent, EditFooterContent, GetFooterContent } from './contentAPI';

export interface FooterContentForm {
  type?: string;
  content?: string;
}

export interface FooterContent extends FooterContentForm {
  ID?: string;
  createdAt?: string;
}

export const FooterContentSchema = yup
  .object({
    content: yup.string().min(2).required(),
  })
  .required();

interface managerState {
  footerContent: FooterContent;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  footerContent: { content: '' },
  status: 'idle',
  message: '',
};

export const footerContentSlice = createSlice({
  name: 'footerContent',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setFooterContent: (state, { payload }: PayloadAction<Record<string, any>>) => {
      state.footerContent = payload;
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

export const { setFooterContent, setStatus, setMessage, onStart, onStop } =
  footerContentSlice.actions;

export default footerContentSlice.reducer;

export const addFooterContent =
  (type: string, formData: FooterContentForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await AddFooterContent({ ...formData, type });
      dispatch(setStatus(status));
      dispatch(setFooterContent(data));
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

export const editFooterContent =
  (type: string, formData: FooterContentForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditFooterContent(type, { ...formData, type });
      dispatch(setFooterContent(data));
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

export const getFooterContent =
  (type: string, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await GetFooterContent(type);
      dispatch(setFooterContent(data));
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
