import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { DeleteBanner, EditBanner, ListBanners, AddBanner } from './bannerAPI';

export interface BannerForm {
  desktopFile: Record<string, any>;
  mobileFile: Record<string, any>;
}

export interface Banner {
  ID: string;
  desktopFilename: string;
  mobileFilename: string;
  isActive: boolean;
  createdAt: string;
}

export const BannerSchema = yup
  .object({
    desktopFile: yup
      .mixed()
      .test('name', 'You need to provide an accepted file format', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 5000000;
      })
      .test('type', "We only support JPEG, PNG & GIF's", (value) => {
        return value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
      }),
    mobileFile: yup
      .mixed()
      .test('name', 'You need to provide an accepted file format', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 5000000;
      })
      .test('type', "We only support JPEG, PNG & GIF's", (value) => {
        return value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
      }),
  })
  .required();

interface managerState {
  banners: Record<string, Banner>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  banners: {},
  status: 'idle',
  message: '',
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setBanners: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((banner: Banner) => {
        state.banners[banner.ID] = banner;
      });
    },
    resetBanners: (state) => {
      state.banners = {};
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

export const { setBanners, resetBanners, setStatus, setMessage, onStart, onStop } =
  bannerSlice.actions;

export default bannerSlice.reducer;

export const addBanner =
  (file: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await AddBanner(file);
      dispatch(resetBanners());
      dispatch(setBanners(data));
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

export const editBanner =
  ({ ID, isActive }: Banner, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditBanner(ID, !isActive);
      dispatch(resetBanners());
      dispatch(setBanners(data));
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

export const deleteBanner =
  ({ ID }: Banner, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteBanner(ID);
      dispatch(resetBanners());
      dispatch(setBanners(data));
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

export const listBanners =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListBanners();
      dispatch(resetBanners());
      dispatch(setBanners(data));
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
