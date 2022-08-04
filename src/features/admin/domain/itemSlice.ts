import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { addDomain, editDomain, deleteDomain, listDomains, removeDomainLogo } from './itemAPI';

export interface MultipleDomainForm {
  name: string;
  file: Record<string, any>;
}
export interface MultipleDomain {
  ID: string;
  name: string;
  fileName: string;
  isActive: boolean;
  createdAt: string;
}

export const MultipleDomainSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
    file: yup
      .mixed()
      .test('fileSize', 'The uploaded file is too large', (value) => {
        if (value[0]) return value[0].size <= 5000000;
        else return true;
      })
      .test('type', "We only support JPEG, PNG & GIF's", (value) => {
        if (value[0])
          return ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(value[0].type);
        else return true;
      }),
  })
  .required();

interface managerState {
  domains: Record<string, MultipleDomain>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  domains: {},
  status: 'idle',
  message: '',
};

export const multipleDomainSlice = createSlice({
  name: 'MultipleDomain',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setDomains: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((domain: MultipleDomain) => {
        state.domains[domain.ID] = domain;
      });
    },
    resetDomains: (state) => {
      state.domains = {};
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

export const { setDomains, resetDomains, setStatus, setMessage, onStart, onStop } =
  multipleDomainSlice.actions;

export default multipleDomainSlice.reducer;

export const AddDomain =
  (formData: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = await addDomain(formData);
      dispatch(setStatus(status));
      dispatch(resetDomains());
      dispatch(setDomains(data));
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

export const EditDomain =
  ({ ID }: MultipleDomain, formData: FormData, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editDomain(ID, formData);
      dispatch(resetDomains());
      dispatch(setDomains(data));
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

export const RemoveDomainLogo =
  ({ ID }: MultipleDomain): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await removeDomainLogo(ID);
      dispatch(resetDomains());
      dispatch(setDomains(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 800);
    }
  };

export const DeleteDomain =
  ({ ID }: MultipleDomain, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteDomain(ID);
      dispatch(resetDomains());
      dispatch(setDomains(data));
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

export const ListDomains =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listDomains();
      dispatch(resetDomains());
      dispatch(setDomains(data));
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
