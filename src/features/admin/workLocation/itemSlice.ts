import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import {
    addWorkLocation,
    editWorkLocation,
    deleteWorkLocation,
    listWorkLocations,
} from './itemApi';

export interface WorkLocationForm {
    location: string;
    country: string;
    items: string[];
}
export interface WorkLocation extends WorkLocationForm {
    ID: string;
    createdAt: string;
}

export const WorkLocationSchema = yup
    .object({
        location: yup.string().min(2).max(100).required(),
        country: yup.string().min(2).max(100).required(),
    })
    .required();

interface managerState {
    worklocations: Record<string, WorkLocation>;
    status: string | number;
    message: string;
}

const initialState: managerState = {
    worklocations: {},
    status: 'idle',
    message: '',
};

export const worklocationSlice = createSlice({
    name: 'worklocation',
    initialState,
    reducers: {
        onStart(state) {
            state.status = 'loading';
        },
        setWorkLocations: (state, { payload }: PayloadAction<Record<string, any>>) => {
            payload?.items.forEach((worklocation: WorkLocation) => {
                state.worklocations[worklocation.ID] = worklocation;
            });
        },
        resetWorkLocations: (state) => {
            state.worklocations = {};
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

export const { setWorkLocations, resetWorkLocations, setStatus, setMessage, onStart, onStop } =
    worklocationSlice.actions;

export default worklocationSlice.reducer;

export const AddWorkLocation =
    (formData: WorkLocationForm | string[], onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data, status } = Array.isArray(formData)
                    ? await addWorkLocation({ names: formData })
                    : await addWorkLocation(formData);
                dispatch(setStatus(status));
                dispatch(resetWorkLocations());
                dispatch(setWorkLocations(data));
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

export const EditWorkLocation =
    ({ ID }: WorkLocation, formData: WorkLocationForm, onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await editWorkLocation(formData, ID);
                dispatch(resetWorkLocations());
                dispatch(setWorkLocations(data));
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

export const DeleteWorkLocation =
    ({ ID }: WorkLocation, onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await deleteWorkLocation(ID);
                dispatch(resetWorkLocations());
                dispatch(setWorkLocations(data));
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

export const ListWorkLocations =
    (onComplete: () => void): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(onStart());
                const { data } = await listWorkLocations();
                dispatch(resetWorkLocations());
                dispatch(setWorkLocations(data));
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
