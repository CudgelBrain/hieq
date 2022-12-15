import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import userReducer from 'features/user/userSlice';

import skillReducer from 'features/admin/skill/skillSlice';
import domainReducer from 'features/admin/domain/itemSlice';
import collegeReducer from 'features/admin/college/itemSlice';
import bannerReducer from 'features/admin/banner/bannerSlice';
import resumeReducer from 'features/admin/resume/resumeSlice';
import companyReducer from 'features/admin/company/itemSlice';
import jobTitleReducer from 'features/admin/jobTitle/itemSlice';
import workLocationReducer from 'features/admin/workLocation/itemSlice';
import instituteReducer from 'features/admin/Institute/itemSlice';
import createTestReducer from 'features/admin/createTest/CreateTestSlice';
import faqSubjectReducer from 'features/admin/faqSubject/faqSubjectSlice';
import instituteGroupReducer from 'features/admin/instituteGroup/itemSlice';
import specializationReducer from 'features/admin/specialization/itemSlice';
import employerProfileReducer from 'features/employer/profile/profileSlice';
import designationReducer from 'features/admin/designation/designationSlice';
import faqQuestionReducer from 'features/admin/faqQuestion/faqQuestionSlice';
import footerContentReducer from 'features/admin/footerContent/contentSlice';
import successStoryReducer from 'features/admin/successStory/successStorySlice';
import questionBankReducer from 'features/admin/questionBank/questionBankSlice';
import certificationReducer from 'features/admin/certification/certificationSlice';
import roleInstituteReducer from 'features/admin/roleInstitute/roleInstituteSlice';
import questionCategoryReducer from 'features/admin/questionCategory/questionCategorySlice';
import roleHiringProcessReducer from 'features/admin/roleHiringProcess/roleHiringProcessSlice';
import sampleDescriptionReducer from 'features/admin/sampleDescription/sampleDescriptionSlice';
import searchFilter from 'features/employer/search/searchFilterSlice';

import postOpportunityReducer from 'features/employer/postOpportunity/postOpportunitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    skill: skillReducer,
    banner: bannerReducer,
    resume: resumeReducer,
    domain: domainReducer,
    college: collegeReducer,
    company: companyReducer,
    jobTitle: jobTitleReducer,
    workLocation: workLocationReducer,
    institute: instituteReducer,
    createTest: createTestReducer,
    faqSubject: faqSubjectReducer,
    faqQuestion: faqQuestionReducer,
    designation: designationReducer,
    successStory: successStoryReducer,
    questionBank: questionBankReducer,
    footerContent: footerContentReducer,
    roleInstitute: roleInstituteReducer,
    certification: certificationReducer,
    instituteGroup: instituteGroupReducer,
    specialization: specializationReducer,
    employerProfile: employerProfileReducer,
    postOpportunity: postOpportunityReducer,
    questionCategory: questionCategoryReducer,
    roleHiringProcess: roleHiringProcessReducer,
    sampleDescription: sampleDescriptionReducer,
    searchFilter: searchFilter,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
