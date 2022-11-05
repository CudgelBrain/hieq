import * as yup from 'yup';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from 'app/store';
// // import { addDomain, editDomain, deleteDomain, listDomains, removeDomainLogo } from './itemAPI';



// interface managerState {
//   category:string[];
//   experience:string[];
//   employType:string[];
//   domain:string[];
//   salary: number;
// }

// const initialState: managerState = {
//   category:[],
//   experience:[],
//   employType:[],
//   domain:[],
//   salary: 0
// }

// export const multipleSearchFilterSlice = createSlice({
//   name: 'searchFilter',
//   initialState,
//   reducers: {
//     setCategory(state,{payload}:PayloadAction<<string[]>) {
//       state.category = payload;
//     },
//     setBanners: (state, { payload }: PayloadAction<Record<string, any>>) => {
//       payload?.items.forEach((banner: managerState) => {
//         state[banner.ID] = banner;
//       });
//     },
//     setExperience(state,{payload}:string[]) {
//       state.experience = payload;
//     },
//     setEmployType(state,{payload}:string[]) {
//       state.employType = payload;
//     },
//     setDomain(state,{payload}:string[]) {
//       state.domain = payload;
//     },
//     setSalary(state,{payload}:number) {
//       state.salary = payload;
//     },
//     // setDomains: (state, { payload }: PayloadAction<Record<string, any>>) => {
//     //   payload?.items.forEach((domain: MultipleDomain) => {
//     //     state.domains[domain.ID] = domain;
//     //   });
//     // },
//     resetFilter: (state) => {
//       state=initialState
//     },
//     // setStatus: (state, { payload }: PayloadAction<string | number>) => {
//     //   state.status = payload;
//     // },
//     // setMessage: (state, { payload }: PayloadAction<string>) => {
//     //   state.message = payload;
//     // },
//     // onStop(state) {
//     //   state.status = initialState.status;
//     //   state.message = initialState.message;
//     // },
//   },
// });

// export const { setDomain, resetFilter,setSalary,setEmployType ,setExperience,setCategory} =
// multipleSearchFilterSlice.actions;

// export default multipleSearchFilterSlice.reducer;

// // export const AddDomain =
// //   (formData: FormData, onComplete: () => void): AppThunk =>
// //     async (dispatch) => {
// //       try {
// //         dispatch(onStart());
// //         // const { data, status } = await addDomain(formData);
// //         dispatch(setStatus(status));
// //         dispatch(resetDomains());
// //         // dispatch(setDomains(data));
// //       } catch (error: any) {
// //         dispatch(setStatus(error?.response?.data?.status));
// //         dispatch(setMessage(error?.response?.data?.error));
// //       } finally {
// //         setTimeout(() => {
// //           dispatch(onStop());
// //           onComplete();
// //         }, 800);
// //       }
// //     };

// // export const EditDomain =
// //   ({ ID }: MultipleDomain, formData: FormData, onComplete: () => void): AppThunk =>
// //     async (dispatch) => {
// //       try {
// //         dispatch(onStart());
// //         // const { data } = await editDomain(ID, formData);
// //         dispatch(resetDomains());
// //         // dispatch(setDomains(data));
// //       } catch (error: any) {
// //         dispatch(setStatus(error?.response?.data?.status));
// //         dispatch(setMessage(error?.response?.data?.error));
// //       } finally {
// //         setTimeout(() => {
// //           dispatch(onStop());
// //           onComplete();
// //         }, 800);
// //       }
// //     };

// // export const RemoveDomainLogo =
// //   ({ ID }: MultipleDomain): AppThunk =>
// //     async (dispatch) => {
// //       try {
// //         dispatch(onStart());
// //         // const { data } = await removeDomainLogo(ID);
// //         dispatch(resetDomains());
// //         // dispatch(setDomains(data));
// //       } catch (error: any) {
// //         dispatch(setStatus(error?.response?.data?.status));
// //         dispatch(setMessage(error?.response?.data?.error));
// //       } finally {
// //         setTimeout(() => {
// //           dispatch(onStop());
// //         }, 800);
// //       }
// //     };

// // export const DeleteDomain =
// //   ({ ID }: MultipleDomain, onComplete: () => void): AppThunk =>
// //     async (dispatch) => {
// //       try {
// //         dispatch(onStart());
// //         // const { data } = await deleteDomain(ID);
// //         dispatch(resetDomains());
// //         // dispatch(setDomains(data));
// //       } catch (error: any) {
// //         dispatch(setStatus(error?.response?.data?.status));
// //         dispatch(setMessage(error?.response?.data?.error));
// //       } finally {
// //         setTimeout(() => {
// //           dispatch(onStop());
// //           onComplete();
// //         }, 800);
// //       }
// //     };

// // export const ListDomains =
// //   (onComplete?: () => void): AppThunk =>
// //     async (dispatch) => {
// //       try {
// //         dispatch(onStart());
// //         // const { data } = await listDomains();
// //         dispatch(resetDomains());
// //         // dispatch(setDomains(data));
// //       } catch (error: any) {
// //         dispatch(setStatus(error?.response?.data?.status));
// //         dispatch(setMessage(error?.response?.data?.error));
// //       } finally {
// //         setTimeout(() => {
// //           dispatch(onStop());
// //           onComplete && onComplete();
// //         }, 800);
// //       }
// //     };
