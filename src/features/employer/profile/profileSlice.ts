import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { addEmployerProfile, getEmployerProfile } from './profileAPI';
export interface social {
  name: string;
  url: string;
}
export interface document {
  file: any;
  name: string;
  toBeValidated: boolean;
}
export interface EmployerProfileForm {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  roleInHiring: string;
  yearOfIncorporation: string;
  description: string;
  headOffice: string;
  branchOffices: string[];
  numberOfEmployees: string;
  companyType: string;
  otherName?: string;
  industryType: string;
  documents: document[];
  socials: social[];
}
export interface EmployerProfile extends EmployerProfileForm {
  ID: string;
  isActive: boolean;
  createdAt: string;
}

const documentSchema = {
  name: yup.string().required('Document name is required'),
  file: yup.mixed().when('toBeValidated', {
    is: true,
    then: yup
      .mixed()
      .test('name', 'Document is required', (value) => {
        return value && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value && value[0].size <= 5000000;
      })
      .test('type', 'We only support JPEG & PDF', (value) => {
        return value && ['application/pdf', 'image/jpeg'].includes(value[0].type);
      }),
    otherwise: yup.mixed().notRequired(),
  }),
};

const socialMediaSchema = {
  name: yup.string().required('Social media name is required'),
  url: yup.string().url().required('Social media url is required'),
};

export const EmployerProfileSchema = yup
  .object({
    fullName: yup.string().min(2).max(100).required(),
    companyName: yup.string().min(2).max(100).required(),
    phone: yup
      .string()
      .required('Contact number is required')
      .matches(/^([0]|\+91)?\d{10}/, 'Contact number must be valid'),
    email: yup.string().min(2).max(100).required(),
    roleInHiring: yup.string().min(2).max(100).required(),
    yearOfIncorporation: yup.string().min(2).max(100).required(),
    description: yup.string().min(2).max(250).required(),
    headOffice: yup.string().min(2).max(100).required(),
    branchOffices: yup.array().of(yup.string().required('Branch office is required')),
    numberOfEmployees: yup.string().min(2).max(100).required(),
    companyType: yup.string().min(2).max(100).required(),
    otherName: yup.string().when('companyType', {
      is: (val: string) => val !== undefined && val === 'others',
      then: yup.string().min(3).max(100).required('Other name is required'),
      otherwise: yup.string().min(3).max(100).notRequired(),
    }),
    industryType: yup.string().min(2).max(100).required(),
    documents: yup.array().of(yup.object().shape(documentSchema)).min(1).max(6).required(),
    socials: yup.array().of(yup.object().shape(socialMediaSchema)).min(1).max(4).required(),
  })
  .required();
interface managerState {
  profile: Record<string, any>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  profile: {},
  status: 'idle',
  message: '',
};

export const profileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setStatus: (state, { payload }: PayloadAction<string | number>) => {
      state.status = payload;
    },
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    setEmployerProfile: (state, { payload }: PayloadAction<EmployerProfile>) => {
      state.profile = payload;
    },
    onStop(state) {
      state.status = initialState.status;
      state.message = initialState.message;
    },
  },
});

export const { setStatus, setMessage, onStart, setEmployerProfile, onStop } = profileSlice.actions;

export default profileSlice.reducer;

export const AddEmployerProfile =
  (formData: FormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      await addEmployerProfile(formData);
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 1000);
    }
  };

export const GetEmployerProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(onStart());
    const { data } = await getEmployerProfile();
    dispatch(setEmployerProfile(data));
  } catch (error: any) {
    dispatch(setStatus(error?.response?.data?.status));
    dispatch(setMessage(error?.response?.data?.error));
  } finally {
    setTimeout(() => {
      dispatch(onStop());
    }, 1000);
  }
};
