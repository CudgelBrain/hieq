import * as yup from 'yup';
import { lowerCase } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { getProfile } from 'features/user/userAPI';
import { setProfile } from 'features/user/userSlice';
import { handShake, register, login, requestOTP } from './authAPI';
import {
  history,
  storeToken,
  storeRefreshToken,
  getItemFromStorage,
  removeItemFromStorage,
} from 'utils';

export interface OptionType {
  readonly value: string;
  readonly label: string;
}

export enum UserEnum {
  Admin = 'Admin',
  Employer = 'Employer',
  Employee = 'Employee',
}

export enum EmployerEnum {
  Company = 'Company',
  Organizer = 'Event Organizer',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Others = 'Others',
}

export interface Device {
  deviceID: string;
  deviceName: string;
  deviceOS: string;
}

export interface RegisterationForm {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  userType?: UserEnum;
  otherName?: string;
  gender?: GenderEnum;
  employerName?: string;
  employerType?: EmployerEnum;
}

export interface LoginForm {
  email: string;
  password: string;
  type: string;
}

export interface LoginOTPForm {
  phone: string;
  otp: string;
  type: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export const RegistrationSchema = yup
  .object({
    name: yup
      .string()
      .required('Full Name is required')
      .min(3, 'Fullname must be at least 3 characters')
      .max(100, 'Fullname must be at most 100 characters')
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Name must be alphabets only'),
    email: yup.string().email().required('Email is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^([0]|\+91)?\d{10}/, 'Phone number must be valid'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase and one number',
      ),
    userType: yup.mixed<UserEnum>().oneOf(Object.values(UserEnum)).required(),
    gender: yup.mixed<GenderEnum>().when('userType', {
      is: (val: UserEnum) => val !== undefined && val === UserEnum.Employee,
      then: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)).required('Gender is required'),
      otherwise: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)).notRequired(),
    }),
    employerType: yup.mixed<EmployerEnum>().when('userType', {
      is: (val: UserEnum) => val !== undefined && val === UserEnum.Employer,
      then: yup
        .mixed<EmployerEnum>()
        .oneOf(Object.values(EmployerEnum))
        .required('Employer type is required'),
      otherwise: yup.mixed<EmployerEnum>().oneOf(Object.values(EmployerEnum)).notRequired(),
    }),
    employerName: yup.string().when(['userType', 'employerType'], {
      is: (userType: UserEnum, employerType: EmployerEnum) =>
        userType !== undefined && employerType !== undefined && userType === UserEnum.Employer,
      then: yup.string().min(3).max(100).required('Employer name is required'),
      otherwise: yup.string().min(3).max(100).notRequired(),
    }),
    otherName: yup.string().when('employerName', {
      is: (val: string) => val !== undefined && val === 'others',
      then: yup.string().min(3).max(100).required('Other name is required'),
      otherwise: yup.string().min(3).max(100).notRequired(),
    }),
  })
  .required();

export const LogInSchema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const LogInOTPSchema = yup
  .object({
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^([0]|\+91)?\d{10}/, 'Phone number must be valid'),
    otp: yup
      .string()
      .min(6, 'OTP must be exactly 6 digits')
      .max(6, 'OTP must be exactly 6 digits')
      .required('OTP is required'),
  })
  .required();

export const ForgotPasswordSchema = yup
  .object({
    email: yup.string().email().required('Email is required'),
  })
  .required();

interface managerState {
  status: string | number;
  message: string;
}

const initialState: managerState = {
  status: 'idle',
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
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
    onStop(state) {
      state.status = initialState.status;
      state.message = initialState.message;
    },
  },
});

export const { setStatus, setMessage, onStart, onStop } = authSlice.actions;

export default authSlice.reducer;

const handleRedirection = async () => {
  const { data: profile } = await getProfile();
  const prevURL = getItemFromStorage('prevURL', 'session');
  removeItemFromStorage('prevURL', 'session');
  if (prevURL) return [profile, prevURL];
  return [
    profile,
    profile.userType === UserEnum.Admin
      ? '/controlGear'
      : `/${lowerCase(profile.userType)}/dashboard`,
  ];
};

export const Register =
  (formData: RegisterationForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data: token } = await handShake();
      storeToken(token.deviceToken);
      const { data } = await register(formData);
      storeToken(data.accessToken);
      storeRefreshToken(data.refreshToken);
      const [profile, redirectTo] = await handleRedirection();
      dispatch(setProfile(profile));
      history.push(redirectTo);
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 1200);
    }
  };

export const Login =
  (formData: LoginForm | LoginOTPForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data: token } = await handShake();
      storeToken(token.deviceToken);
      const { data } = await login(formData);
      storeToken(data.accessToken);
      storeRefreshToken(data.refreshToken);
      const [profile, redirectTo] = await handleRedirection();
      dispatch(setProfile(profile));
      history.push(redirectTo);
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 1200);
    }
  };

export const RequestOTP =
  (phone: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data: token } = await handShake();
      storeToken(token.deviceToken);
      const { status } = await requestOTP(phone);
      dispatch(setStatus(status));
      dispatch(setMessage('OTP sent successfully'));
    } catch (error: any) {
      dispatch(setStatus(error?.response?.data?.status));
      dispatch(setMessage(error?.response?.data?.error));
    } finally {
      setTimeout(() => {
        dispatch(onStop());
      }, 1200);
    }
  };
