import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { AddSkill, EditSkill, DeleteSkill, ListSkills } from './skillAPI';

export interface SkillForm {
  name: string;
}
export interface Skill {
  ID: string;
  name: string;
  createdAt: string;
}

export const SkillSchema = yup
  .object({
    name: yup.string().min(2).max(100).required(),
  })
  .required();

interface managerState {
  skills: Record<string, Skill>;
  status: string | number;
  message: string;
}

const initialState: managerState = {
  skills: {},
  status: 'idle',
  message: '',
};

export const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    onStart(state) {
      state.status = 'loading';
    },
    setSkills: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach((skill: Skill) => {
        state.skills[skill.ID] = skill;
      });
    },
    resetSkills: (state) => {
      state.skills = {};
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

export const { setSkills, resetSkills, setStatus, setMessage, onStart, onStop } =
  skillSlice.actions;

export default skillSlice.reducer;

export const addSkill =
  (formData: SkillForm | string[], onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data, status } = Array.isArray(formData)
        ? await AddSkill({ names: formData })
        : await AddSkill(formData);
      dispatch(setStatus(status));
      dispatch(resetSkills());
      dispatch(setSkills(data));
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

export const editSkill =
  ({ ID }: Skill, formData: SkillForm, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await EditSkill(ID, formData);
      dispatch(resetSkills());
      dispatch(setSkills(data));
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

export const deleteSkill =
  ({ ID }: Skill, onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await DeleteSkill(ID);
      dispatch(resetSkills());
      dispatch(setSkills(data));
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

export const listSkills =
  (onComplete: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(onStart());
      const { data } = await ListSkills();
      dispatch(resetSkills());
      dispatch(setSkills(data));
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
