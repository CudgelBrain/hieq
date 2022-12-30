import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
    AddIndustry,
    EditIndustry,
    DeleteIndustry,
    ListIndustrys,
} from './industryAPI';

export interface IndustryForm {
    name: string;
}
export interface Industry {
    ID: string;
    name: string;
    createdAt: string;
}

export const IndustrySchema = yup
    .object({
        name: yup.string().min(2).max(100).required(),
    })
    .required();

interface managerState {
    industrys: Record<string, Industry>;
    status: string | number;
    message: string;
}

const initialState: managerState = {
    industrys: {},
    status: 'idle',
    message: '',
};

export const industrySlice = createSlice({
    name: 'industry',
    initialState,
    reducers: {
        onStart(state) {
            state.status = 'loading';
        },
        setIndustrys: (state, { payload }: PayloadAction<Record<string, any>>) => {
            payload?.items.forEach((industry: Industry) => {
                state.industrys[industry.ID] = industry;
            });
        },
        resetIndustrys: (state) => {
            state.industrys = {};
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

export const { setIndustrys, resetIndustrys, setStatus, setMessage, onStart, onStop } =
    industrySlice.actions;

export default industrySlice.reducer;

export const addIndustry =
    (formData: IndustryForm | string[], onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data, status } = Array.isArray(formData)
                    ? await AddIndustry({ names: formData, items: [] })
                    : await AddIndustry({ ...formData, items: [] });
                dispatch(setStatus(status));
                dispatch(resetIndustrys());
                dispatch(setIndustrys(data));
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

export const editIndustry =
    ({ ID }: Industry, formData: IndustryForm, onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await EditIndustry(ID, formData);
                dispatch(resetIndustrys());
                dispatch(setIndustrys(data));
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

export const deleteIndustry =
    ({ ID }: Industry, onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await DeleteIndustry(ID);
                dispatch(resetIndustrys());
                dispatch(setIndustrys(data));
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

export const listIndustrys =
    (onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await ListIndustrys();
                dispatch(resetIndustrys());
                dispatch(setIndustrys(data));
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
