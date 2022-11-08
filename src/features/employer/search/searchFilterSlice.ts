import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
// import { addDomain, editDomain, deleteDomain, listDomains, removeDomainLogo } from './itemAPI';



interface managerState {
    category: string[];
    experience: number;
    employType: string[];
    domain: string[];
    salary: number;
    status: string[];
    pageNo: number
}

const initialState: managerState = {
    category: [],
    experience: 0,
    employType: [],
    domain: [],
    salary: 0,
    status: [],
    pageNo: 0
}

export const multipleSearchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState,
    reducers: {
        setCategory(state, { payload }: PayloadAction<string[]>) {
            state.category = payload;
        },
        setExperience: (state, { payload }: PayloadAction<number>) => {
            state.experience = payload
        },
        setPageNo: (state, { payload }: PayloadAction<number>) => {
            state.pageNo = payload
        },
        setSalary: (state, { payload }: PayloadAction<number>) => {
            state.salary = payload
        },
        setEmployType(state, { payload }: PayloadAction<string[]>) {
            state.employType = payload;
        },
        setDomain(state, { payload }: PayloadAction<string[]>) {
            state.domain = payload;
        },
        setStatus(state, { payload }: PayloadAction<string[]>) {
            state.status = payload;
        },
        resetFilter: (state) => {
            state = initialState
        },
    },
});

export const { setDomain, resetFilter, setSalary, setEmployType, setExperience, setCategory, setPageNo, setStatus } =
    multipleSearchFilterSlice.actions;

export default multipleSearchFilterSlice.reducer;

// export const AddDomain =
//   (formData: FormData, onComplete: () => void): AppThunk =>
//     async (dispatch) => {
//       try {
//         dispatch(onStart());
//         // const { data, status } = await addDomain(formData);
//         dispatch(setStatus(status));
//         dispatch(resetDomains());
//         // dispatch(setDomains(data));
//       } catch (error: any) {
//         dispatch(setStatus(error?.response?.data?.status));
//         dispatch(setMessage(error?.response?.data?.error));
//       } finally {
//         setTimeout(() => {
//           dispatch(onStop());
//           onComplete();
//         }, 800);
//       }
//     };

// export const EditDomain =
//   ({ ID }: MultipleDomain, formData: FormData, onComplete: () => void): AppThunk =>
//     async (dispatch) => {
//       try {
//         dispatch(onStart());
//         // const { data } = await editDomain(ID, formData);
//         dispatch(resetDomains());
//         // dispatch(setDomains(data));
//       } catch (error: any) {
//         dispatch(setStatus(error?.response?.data?.status));
//         dispatch(setMessage(error?.response?.data?.error));
//       } finally {
//         setTimeout(() => {
//           dispatch(onStop());
//           onComplete();
//         }, 800);
//       }
//     };

// export const RemoveDomainLogo =
//   ({ ID }: MultipleDomain): AppThunk =>
//     async (dispatch) => {
//       try {
//         dispatch(onStart());
//         // const { data } = await removeDomainLogo(ID);
//         dispatch(resetDomains());
//         // dispatch(setDomains(data));
//       } catch (error: any) {
//         dispatch(setStatus(error?.response?.data?.status));
//         dispatch(setMessage(error?.response?.data?.error));
//       } finally {
//         setTimeout(() => {
//           dispatch(onStop());
//         }, 800);
//       }
//     };

// export const DeleteDomain =
//   ({ ID }: MultipleDomain, onComplete: () => void): AppThunk =>
//     async (dispatch) => {
//       try {
//         dispatch(onStart());
//         // const { data } = await deleteDomain(ID);
//         dispatch(resetDomains());
//         // dispatch(setDomains(data));
//       } catch (error: any) {
//         dispatch(setStatus(error?.response?.data?.status));
//         dispatch(setMessage(error?.response?.data?.error));
//       } finally {
//         setTimeout(() => {
//           dispatch(onStop());
//           onComplete();
//         }, 800);
//       }
//     };

// export const ListDomains =
//   (onComplete?: () => void): AppThunk =>
//     async (dispatch) => {
//       try {
//         dispatch(onStart());
//         // const { data } = await listDomains();
//         dispatch(resetDomains());
//         // dispatch(setDomains(data));
//       } catch (error: any) {
//         dispatch(setStatus(error?.response?.data?.status));
//         dispatch(setMessage(error?.response?.data?.error));
//       } finally {
//         setTimeout(() => {
//           dispatch(onStop());
//           onComplete && onComplete();
//         }, 800);
//       }
//     };
