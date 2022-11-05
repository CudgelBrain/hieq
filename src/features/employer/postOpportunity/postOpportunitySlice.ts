import * as yup from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { history } from 'utils';
import {
  addOpportunity,
  getOpportunity,
  editOpportunity,
  finishOpportunity,
  listOpportunities,
  listFilteredOpportunities,
  deleteOpportunity,
  listSearchFilteredOpportunities
} from './postOpportunityAPI';

// Step One - Opportunity Schema Validation
export interface OpportunityStepOne {
  category: string;
  opportunityTitle: string;
  opportunityDomain: string;
  opportunityType?: string;
  locationType?: string;
  locations: string[];
  openings: string;
  opportunityStartDate: any;
  opportunityEndDate: any;
  participation?: string;
  teamComposition?: string;
}
export const OpportunityStepOneSchema = yup
  .object({
    opportunityTitle: yup.string().min(2).max(100).required('Title is required'),
    opportunityDomain: yup.string().min(2).max(100).required('Domain is required'),
    opportunityType: yup.string().when('category', {
      is: (category: string) => ['internship', 'job'].includes(category),
      then: yup.string().required('Type is required'),
      otherwise: yup.string().notRequired(),
    }),
    locationType: yup.string().when('category', {
      is: (category: string) => ['internship', 'job'].includes(category),
      then: yup.string().required('Location type is required'),
      otherwise: yup.string().notRequired(),
    }),
    locations: yup
      .array()
      .of(yup.string().required('Location is required'))
      .min(1)
      .max(10)
      .required(),
    openings: yup.number().typeError('Opening is not valid').required('Opening is required'),
    opportunityStartDate: yup.string().min(2).max(100).required('Start date is required'),
    opportunityEndDate: yup.string().min(2).max(100).required('End date is required'),
    participation: yup.string().when('category', {
      is: 'competition',
      then: yup.string().required('Participation is required'),
      otherwise: yup.string().notRequired(),
    }),
    teamComposition: yup.string().when('category', {
      is: 'competition',
      then: yup.string().required('Team composition is required'),
      otherwise: yup.string().notRequired(),
    }),
  })
  .required();

// Step Two - Opportunity Schema Validation
interface contact {
  name: string;
  email: string;
  number: string;
}
const contactSchema = {
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  number: yup.string().matches(/^([0]|\+91)?\d{10}/, 'Contact number must be valid'),
};
interface externalLink {
  title: string;
  url: string;
}
const externalLinkSchema = {
  title: yup.string().required('Title is required'),
  url: yup.string().url().required('URL is required'),
};
export interface attachment {
  file: any;
  title: string;
  toBeValidated: boolean;
  url: string;
}
export interface JobDescription {
  name: string;
  desc: string;
  url: string;
}
const attachmentSchema = {
  title: yup.string().required('Title is required'),
  file: yup.mixed().when('toBeValidated', {
    is: true,
    then: yup
      .mixed()
      .test('name', 'Attachment is required', (value) => {
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
interface salaryDetail {
  salaryType: string;
  fixedAmount?: number;
  maxAmount?: number;
  minAmount?: number;
  variable: boolean;
  variablePercentage?: number;
  additionalDetail: string;
  visibleToCandidate: boolean;
  showSalary: boolean;
  cycle: string;
  currency: string;
}
const salaryDetailSchema = {
  salaryType: yup.string().required('Type is required'),
  fixedAmount: yup.number().when('salaryType', {
    is: 'fixed',
    then: yup.number().typeError('Fixed amount is not valid').required('Fixed amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  maxAmount: yup.number().when('salaryType', {
    is: 'range',
    then: yup.number().typeError('Max amount is not valid').required('Max amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  minAmount: yup.number().when('salaryType', {
    is: 'range',
    then: yup.number().typeError('Min amount is not valid').required('Min amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  variable: yup.boolean().required('Variable is required'),
  variablePercentage: yup.number().when('variable', {
    is: true,
    then: yup
      .number()
      .typeError('Variable percentage is not valid')
      .required('Variable percentage is required'),
    otherwise: yup.number().notRequired(),
  }),
  additionalDetail: yup.string().required('Additional detail is required'),
  visibleToCandidate: yup.boolean().required('Visible to candidate is required'),
  showSalary: yup.boolean().required('show salary is required'),
  cycle: yup.string().required('Cycle is required'),
  currency: yup.string().required('Currency is required'),
};
interface stipendDetail {
  stipendType: string;
  fixedAmount?: number;
  maxAmount?: number;
  minAmount?: number;
  minAssuredAmount?: number;
  maxAssuredAmount?: number;
  cycle?: string;
  scale?: string;
  currency: string;
  showSalary?: boolean;
}
const stipendDetailSchema = {
  stipendType: yup.string().required('Type is required'),
  fixedAmount: yup.number().when('stipendType', {
    is: 'fixed',
    then: yup.number().typeError('Fixed amount is not valid').required('Fixed amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  maxAmount: yup.number().when('stipendType', {
    is: 'negotiable',
    then: yup.number().typeError('Max amount is not valid').required('Max amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  minAmount: yup.number().when('stipendType', {
    is: 'negotiable',
    then: yup.number().typeError('Min amount is not valid').required('Min amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  minAssuredAmount: yup.number().when('stipendType', {
    is: 'performanceBased',
    then: yup
      .number()
      .typeError('Min assured amount is not valid')
      .required('Min assured amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  maxAssuredAmount: yup.number().when('stipendType', {
    is: 'performanceBased',
    then: yup
      .number()
      .typeError('Max assured amount is not valid')
      .required('Max assured amount is required'),
    otherwise: yup.number().notRequired(),
  }),
  cycle: yup.string().required('Cycle is required'),
  scale: yup.string().when('stipendType', {
    is: 'performanceBased',
    then: yup.string().required('Scale is required'),
    otherwise: yup.string().notRequired(),
  }),
  showSalary: yup.boolean().required('show salary is required'),
  currency: yup.string().required('Currency is required'),
};
export interface OpportunityStepTwo {
  category: string;
  descFileName?: string;
  description: string;
  salaryDetail: salaryDetail;
  stipendDetail: stipendDetail;
  contacts: contact[];
  externalLinks?: externalLink[];
  attachments?: attachment[];
}
export const OpportunityStepTwoSchema = yup
  .object({
    description: yup.string().required('Description is required'),
    salaryDetail: yup.object().when('category', {
      is: 'job',
      then: yup.object(salaryDetailSchema).required(),
      otherwise: yup.object().notRequired(),
    }),
    stipendDetail: yup.object().when('category', {
      is: 'internship',
      then: yup.object(stipendDetailSchema).required(),
      otherwise: yup.object().notRequired(),
    }),
    contacts: yup.array().of(yup.object().shape(contactSchema)).min(1).max(3).required(),
    externalLinks: yup.array().when('category', {
      is: 'job',
      then: yup.array().of(yup.object().shape(externalLinkSchema)).min(1).max(3).required(),
      otherwise: yup.array().notRequired(),
    }),
    attachments: yup.array().when('category', {
      is: 'job',
      then: yup.array().of(yup.object().shape(attachmentSchema)).min(1).max(3).required(),
      otherwise: yup.array().notRequired(),
    }),
  })
  .required();

// Step Three - Opportunity Schema Validation
interface workExperience {
  min: { year: string; month: string };
  max: { year: string; month: string };
}
const workExperienceSchema = {
  min: yup
    .object()
    .shape({
      year: yup.string().required('Min year is required'),
      month: yup.string().required('Min month is required'),
    })
    .required('Min is required'),
  max: yup
    .object()
    .shape({
      year: yup.string().required('Max year is required'),
      month: yup.string().required('Max month is required'),
    })
    .required('Max is required'),
};
interface skill {
  title: string;
  level: string;
}
interface skillObject {
  personal_skills: skill[];
  technical_skills: skill[];
  public_skills: skill[];
}
const skillSchema = {
  skill: yup
    .object()
    .shape({
      title: yup.string().required('Name is required'),
      level: yup.string().required('Proficiency level is required'),
    })
    .required('skill is required'),

};
interface assessmentScore {
  behavioural: { min?: number; max?: number };
  cognitive: { min?: number; max?: number };
  functional: { min?: number; max?: number };
}
const assessmentScoreSchema = {
  behavioural: yup
    .object()
    .shape({
      min: yup.number().typeError('Min is not valid').required('Min is required'),
      max: yup.number().typeError('Max is not valid').required('Max is required'),
    })
    .required('Behavioural is required'),
  cognitive: yup
    .object()
    .shape({
      min: yup.number().typeError('Min is not valid').required('Min is required'),
      max: yup.number().typeError('Max is not valid').required('Max is required'),
    })
    .required('Cognitive is required'),
  functional: yup
    .object()
    .shape({
      min: yup.number().typeError('Min is not valid').required('Min is required'),
      max: yup.number().typeError('Max is not valid').required('Max is required'),
    })
    .required('Functional is required'),
};
export interface OpportunityStepThree {
  category: string;
  workExperience: workExperience;
  qualifications: string[];
  skills: skillObject;
  videoResume?: boolean;
  coverLetter?: boolean;
  institutes: string[];
  assessmentScore: assessmentScore;
  experiences: string[];
  gender?: string;
  openFor?: string;
}
export const OpportunityStepThreeSchema = yup
  .object({
    workExperience: yup.object().when('category', {
      is: (category: string) => ['internship', 'job'].includes(category),
      then: yup.object(workExperienceSchema).required(),
      otherwise: yup.object().notRequired(),
    }),
    qualifications: yup.array().when('category', {
      is: (category: string) => ['internship', 'job'].includes(category),
      then: yup
        .array()
        .of(yup.string().required('Qualification is required'))
        .min(1)
        .max(10)
        .required(),
      otherwise: yup.array().notRequired(),
    }),
    skills: yup.object({
      personal_skills: yup.array().of(yup
        .object({
          title: yup.string().required('Name is required'),
          level: yup.string().required('Proficiency level is required'),
        })
        .required('skill is required'),).min(1).max(5).required(),
      technical_skills: yup.array().of(yup
        .object({
          title: yup.string().required('Name is required'),
          level: yup.string().required('Proficiency level is required'),
        })
        .required('skill is required'),).min(1).max(5).required(),
      public_skills: yup.array().of(yup
        .object({
          title: yup.string().required('Name is required'),
          level: yup.string().required('Proficiency level is required'),
        })
        .required('skill is required'),).min(1).max(5).required()
    }).required(),
    videoResume: yup.boolean().when('category', {
      is: (category: string) => ['internship', 'job'].includes(category),
      then: yup.boolean().required(),
      otherwise: yup.boolean().notRequired(),
    }),
    coverLetter: yup.boolean().when('category', {
      is: 'job',
      then: yup.boolean().required(),
      otherwise: yup.boolean().notRequired(),
    }),
    institutes: yup.array().when('category', {
      is: 'job',
      then: yup
        .array()
        .of(yup.string().required('Institute is required'))
        .min(1)
        .max(10)
        .required(),
      otherwise: yup.array().notRequired(),
    }),
    assessmentScore: yup.object().when('category', {
      is: 'job',
      then: yup.object(assessmentScoreSchema).required(),
      otherwise: yup.object().notRequired(),
    }),
    experiences: yup.array().when('category', {
      is: 'job',
      then: yup
        .array()
        .of(yup.string().required('Experience is required'))
        .min(1)
        .max(10)
        .required(),
      otherwise: yup.array().notRequired(),
    }),
    gender: yup.string().when('category', {
      is: 'competition',
      then: yup.string().required('Gender is required'),
      otherwise: yup.string().notRequired(),
    }),
    openFor: yup.string().when('category', {
      is: 'competition',
      then: yup.string().required('Opportunity open for is required'),
      otherwise: yup.string().notRequired(),
    }),
  })
  .required();

// Step Four - Opportunity Schema Validation
export interface interviewRounds {
  roundType: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
const interviewRoundsSchema = {
  roundType: yup.string().required('Type is required'),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
};
export interface OpportunityStepFour {
  category: string;
  rounds: interviewRounds[];
}
export const OpportunityStepFourSchema = yup
  .object({
    rounds: yup.array().of(yup.object().shape(interviewRoundsSchema)).min(1).max(10).required(),
  })
  .required();

export interface OpportunityStepFive {
  image: string;
  banner: string;
}
export const OpportunityStepFiveSchema = yup.object({}).required();
export interface Opportunity {
  ID: string;
  stepOne: OpportunityStepOne;
  stepTwo: OpportunityStepTwo;
  stepThree: OpportunityStepThree;
  stepFour: OpportunityStepFour;
  stepFive: OpportunityStepFive;
  status: string;
  views: number;
  isActive: boolean;
  createdAt: string;
  category: string;
  opportunityStartDate: any;
  opportunityEndDate: any;
  jobDescriptionFile: JobDescription;
}

interface managerState {
  message: string;
  category: string;
  currentAction: string;
  status: string | number;
  opportunity: Record<string, any>;
  pagination: Record<string, number>;
  opportunities: Record<string, any>;
}

const initialState: managerState = {
  message: '',
  category: '',
  pagination: {},
  status: 'idle',
  opportunity: {},
  currentAction: '',
  opportunities: {},
};

export const postOpportunitySlice = createSlice({
  name: 'postOpportunity',
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
    setAction: (state, { payload }: PayloadAction<string>) => {
      state.currentAction = payload;
    },
    onStop(state) {
      state.status = initialState.status;
      state.message = initialState.message;
      state.currentAction = initialState.currentAction;
    },
    setOpportunities: (state, { payload }: PayloadAction<Record<string, any>>) => {
      payload?.items.forEach(
        (opportunity: Opportunity) => (state.opportunities[opportunity.ID] = opportunity),
      );
      state.category = payload?.category;
      state.pagination = payload?.pagination;
    },
    resetOpportunities: (state) => {
      state.opportunities = {};
    },
    setOpportunity: (state, { payload }: PayloadAction<Record<string, any>>) => {
      state.opportunity = payload;
    },
    resetOpportunity: (state) => {
      state.opportunity = {};
    },
  },
});

export const {
  onStop,
  onStart,
  setAction,
  setStatus,
  setMessage,
  setOpportunity,
  resetOpportunity,
  setOpportunities,
  resetOpportunities,
} = postOpportunitySlice.actions;

export default postOpportunitySlice.reducer;

export const AddOpportunity =
  (formData: FormData): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(onStart());
        const { data, status } = await addOpportunity(formData);
        dispatch(setStatus(status));
        dispatch(resetOpportunity());
        dispatch(setOpportunity(data));
        const { category, ID } = data;
        history.push(`/employer/postOpportunity/${category}/${ID}`);
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };

export const EditOpportunity =
  (formData: FormData, opportunityID: string, step: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(onStart());
        const { data, status } = await editOpportunity(formData, opportunityID);
        dispatch(setStatus(status));
        dispatch(resetOpportunity());
        dispatch(setOpportunity(data));
        dispatch(setAction(`editOpportunity-${step}`));
        if (step == "stepThree") history.push(`/employer/confirmation/${opportunityID}`)
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };
export const FinishOpportunity =
  (opportunityID: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(onStart());
        const { data, status } = await finishOpportunity(opportunityID);
        dispatch(setStatus(status));
        dispatch(resetOpportunity());
        dispatch(setOpportunity(data));
        history.push("/employer/dashboard")
        // dispatch(setAction(`editOpportunity-${step}`));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };

export const DeleteOpportunity =
  (category: string, opportunityID: string): AppThunk =>
    async (dispatch, getState) => {
      try {
        dispatch(onStart());
        const categoryInStore = getState().postOpportunity.category;
        const { data, status } = await deleteOpportunity(category, opportunityID);
        dispatch(setStatus(status));
        if (categoryInStore !== category) dispatch(resetOpportunities());
        dispatch(setOpportunities({ ...data, category }));
        dispatch(setAction('deleteOpportunity'));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };

export const GetOpportunity =
  (opportunityID: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(onStart());
        const { data, status } = await getOpportunity(opportunityID);
        dispatch(setStatus(status));
        dispatch(resetOpportunity());
        dispatch(setOpportunity(data));
        dispatch(setAction('getOpportunity'));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };

export const ListOpportunities =
  (category: string, page: number, perPage: number): AppThunk =>
    async (dispatch, getState) => {
      try {
        dispatch(onStart());
        const categoryInStore = getState().postOpportunity.category;
        const { data, status } = await listOpportunities(category, page, perPage);
        dispatch(setStatus(status));
        if (categoryInStore !== category) dispatch(resetOpportunities());
        dispatch(setOpportunities({ ...data, category }));
        dispatch(setAction('listOpportunities'));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };
export const ListFilteredOpportunities =
  (category: string, page: number, perPage: number, statusType: string, startDate: string, endDate: string): AppThunk =>
    async (dispatch, getState) => {
      try {
        dispatch(onStart());
        const categoryInStore = getState().postOpportunity.category;
        const { data, status } = await listFilteredOpportunities(category, page, perPage, statusType, startDate, endDate);
        dispatch(setStatus(status));
        dispatch(resetOpportunities());
        // dispatch(resetOpportunities()));
        dispatch(setOpportunities({ ...data, category }));
        dispatch(setAction('listOpportunities'));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };
export const ListSearchFilteredOpportunities =
  (category: string[], domain: string[], statuss: string[], employType: string[], salary: number, experience: number): AppThunk =>
    async (dispatch, getState) => {
      try {
        dispatch(onStart());
        const categoryInStore = getState().postOpportunity.category;
        console.log();

        const { data, status } = await listSearchFilteredOpportunities(category, domain, statuss, employType, salary, experience);
        dispatch(setStatus(status));
        dispatch(resetOpportunities());
        // dispatch(resetOpportunities()));
        dispatch(setOpportunities({ ...data, category }));
        dispatch(setAction('listOpportunities'));
      } catch (error: any) {
        dispatch(setStatus(error?.response?.data?.status));
        dispatch(setMessage(error?.response?.data?.error));
      } finally {
        setTimeout(() => {
          dispatch(onStop());
        }, 1000);
      }
    };
