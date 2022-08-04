import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { addCompany, editCompany, deleteCompany, listCompanies, removeCompany } from './itemAPI';

export interface CompanyForm {
  name: string;
  showOnHomepage: boolean;
  file: Record<string, any>;
}
export interface Company {
  ID: string;
  name: string;
  fileName: string;
  isActive: boolean;
  createdAt: string;
  showOnHomepage: boolean;
}

export const CompanySchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
    showOnHomepage: yup.boolean().notRequired(),
    file: yup
      .mixed()
      .test('name', 'You need to provide an accepted file format', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 5000000;
      })
      .test('type', "We only support JPEG, PNG & GIF's", (value) => {
        return (
          value[0] &&
          ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(value[0].type)
        );
      }),
  })
  .notRequired();

interface managerState {
  companies: Record<string, Company>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  companies: {},
  status: 'idle',
  message: '',
};

export const companySlice = createSlice({
  name: 'comapany',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setCompanies: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((company: Company) => {
        state.companies[company.ID] = company;
      });
    },
    resetCompanies: (state) => {
      state.companies = {};
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

export const { setCompanies, resetCompanies, setStatus, setMessage, onStart, onStop } =
  companySlice.actions;

export default companySlice.reducer;

export const AddCompany =
  (formData: FormData | Record<string, string>[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await addCompany({ names: formData })
        : await addCompany(formData);
      dispatch(setStatus(status));
      dispatch(resetCompanies());
      dispatch(setCompanies(data));
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

export const EditCompany =
  ({ ID }: Company, formData: FormData | Company, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await editCompany(ID, formData);
      dispatch(resetCompanies());
      dispatch(setCompanies(data));
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

export const RemoveCompany =
  ({ ID }: Company): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await removeCompany(ID);
      dispatch(resetCompanies());
      dispatch(setCompanies(data));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 800);
    }
  };

export const DeleteCompany =
  ({ ID }: Company, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await deleteCompany(ID);
      dispatch(resetCompanies());
      dispatch(setCompanies(data));
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

export const ListCompanies =
  (onComplete?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await listCompanies();
      dispatch(resetCompanies());
      dispatch(setCompanies(data));
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
