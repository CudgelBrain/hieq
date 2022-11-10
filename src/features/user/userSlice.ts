import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { getProfile, listUsers } from './userAPI';

export interface Profile {
  ID: string;
  name: string;
  phone: string;
  email: string;
  verified: boolean;
  isActive: boolean;
  createdAt: string;
  userType: string;
  userMeta: Record<string, string>;
}

interface managerState {
  message: string;
  status: string | number;
  profile: Record<string, any>;
  profiles: Record<string, Profile>;
}

const initialState: managerState = {
  message: '',
  profile: {},
  profiles: {},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setProfile: (state, { payload }: PayloadAction<Record<string, any>>) => {
      state.profile = payload;
    },
    setProfiles: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((profile: Profile) => {
        state.profiles[profile.ID] = profile;
      });
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

export const { setProfile, setProfiles, setStatus, setMessage, onStart, onStop } =
  userSlice.actions;

export default userSlice.reducer;

export const GetProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(onStart());
    const { data } = await getProfile();
    dispatch(setProfile(data));
    localStorage.setItem("userType", data.userType);
  } catch (error: any) {
    dispatch(setStatus(error?.response?.data?.status));
    dispatch(setMessage(error?.response?.data?.error));
  } finally {
    setTimeout(() => {
      dispatch(onStop());
    }, 1200);
  }
};

export const ListUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(onStart());
    const { data } = await listUsers();
    dispatch(setProfiles(data));
  } catch (error: any) {
    dispatch(setStatus(error?.response?.data?.status));
    dispatch(setMessage(error?.response?.data?.error));
  } finally {
    setTimeout(() => {
      dispatch(onStop());
    }, 1200);
  }
};
