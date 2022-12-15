import React, { lazy, Suspense } from 'react';
import { isEmpty } from 'lodash'; 
import { Router, Switch } from 'react-router-dom';

// Imported from project
import { history } from 'utils';
import { RootState } from 'app/store';
import Spinner from 'assets/images/spinner.gif';
import { GetProfile } from 'features/user/userSlice';
import { useAppDispatch, useAppProfile, useAppSelector } from 'app/hooks';

// Public Pages
import LogIn from 'pages/public/Login';
import Register from 'pages/public/Register';
import JoinHieq from 'pages/public/JoinHieq';
import VerifyOtp from 'pages/public/VerifyOtp';
import ForgotPassword from 'pages/public/ForgotPassword';

// Admin Pages
import Dashboard from 'pages/admin/Dashboard';
import ListUsers from 'pages/admin/ListUsers';
import ListSkills from 'pages/admin/ListSkills';
import ListBanners from 'pages/admin/ListBanners';
import ListResumes from 'pages/admin/ListResumes';
import FooterPages from 'pages/admin/FooterPages';
import ListDomains from 'pages/admin/ListDomains';
import ListColleges from 'pages/admin/ListColleges';
import ListJobTitles from 'pages/admin/ListJobTitle';
import ListLocation from 'pages/admin/ListLocation';
import ListCompanies from 'pages/admin/ListCompanies';
import ListFaqSubjects from 'pages/admin/ListSubjects';
import ListInstitutes from 'pages/admin/ListInstitutes';
import ListCreateTests from 'pages/admin/ListCreateTests';
import ListQuestionBank from 'pages/admin/ListQuestionBank';
import ListFaqQuestions from 'pages/admin/ListFaqQuestions';
import ListDescriptions from 'pages/admin/ListDescriptions';
import ListDesignations from 'pages/admin/ListDesignations';
import ListRoleInstitute from 'pages/admin/ListRoleInstitute';
import ListCertifications from 'pages/admin/ListCertifications';
import ListSuccessStories from 'pages/admin/ListSuccessStories';
import ListInstituteCohort from 'pages/admin/ListInstituteCohort';
import ListSpecializations from 'pages/admin/ListSpecializations';
import ListQuestionCategories from 'pages/admin/ListQuestionCategories';
import ListRoleHiringProcess from 'pages/admin/ListRoleHiringProcesses';

// Employer Pages
import Applicant from 'pages/employer/Applicant';
import Applicants from 'pages/employer/Applicants';
import Search from 'pages/employer/Search';
import OpportunityConfirmantion from 'pages/employer/OpportunityConfirmation';
import EmployerProfile from 'pages/employer/Profile';
import EmployerDashboard from 'pages/employer/Dashboard';
import PostOpportunity from 'pages/employer/PostOpportunity';
import Opportunity from 'pages/employer/Opportunity';
import NotFound from 'pages/employer/NotFound';

const MainRoute = lazy(() => import('./MainRoute'));
const AdminRoute = lazy(() => import('./AdminRoute'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const LoadProfile = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppProfile();
  const { status } = useAppSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (isEmpty(profile)) dispatch(GetProfile());
  }, [dispatch, profile]);

  return (
    <>
      {status === 'loading' && (
        <div className='hieq-Spinner'>
          <img src={Spinner} width='160' height='100' alt='' />
        </div>
      )}
    </>
  );
};

const AppRouter = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<LoadProfile />}>
        <Switch>
          <PublicRoute exact path={['/', '/join']} component={JoinHieq} />
          <PublicRoute exact path='/login/:type' component={LogIn} />
          <PublicRoute exact path={['/register', '/register/:type']} component={Register} />
          <PublicRoute exact path='/forgotPassword' component={ForgotPassword} />
          <PublicRoute exact path='/verifyOtp' component={VerifyOtp} />

          <AdminRoute exact path='/controlGear' component={Dashboard} />
          <AdminRoute exact path='/controlGear/users' component={ListUsers} />
          <AdminRoute exact path='/controlGear/companies' component={ListCompanies} />
          <AdminRoute exact path='/controlGear/colleges' component={ListColleges} />
          <AdminRoute exact path='/controlGear/designations' component={ListDesignations} />
          <AdminRoute exact path='/controlGear/skills' component={ListSkills} />
          <AdminRoute exact path='/controlGear/certifications' component={ListCertifications} />
          <AdminRoute exact path='/controlGear/roleWithInstitute' component={ListRoleInstitute} />
          <AdminRoute
            exact
            path='/controlGear/certificationInstitutes'
            component={ListInstitutes}
          />
          <AdminRoute exact path='/controlGear/specializations' component={ListSpecializations} />
          <AdminRoute
            exact
            path='/controlGear/roleHiringProcess'
            component={ListRoleHiringProcess}
          />
          <AdminRoute
            exact
            path='/controlGear/instituteCohortGroup'
            component={ListInstituteCohort}
          />
          <AdminRoute exact path='/controlGear/bannerGraphic' component={ListBanners} />
          <AdminRoute exact path='/controlGear/sampleResume' component={ListResumes} />
          <AdminRoute exact path='/controlGear/sampleDescription' component={ListDescriptions} />
          <AdminRoute exact path='/controlGear/faqSubject' component={ListFaqSubjects} />
          <AdminRoute exact path='/controlGear/faqQuestion' component={ListFaqQuestions} />
          <AdminRoute exact path='/controlGear/successStories' component={ListSuccessStories} />
          <AdminRoute exact path='/controlGear/multipleDomains' component={ListDomains} />
          <AdminRoute
            exact
            path='/controlGear/questionCategory'
            component={ListQuestionCategories}
          />
          <AdminRoute exact path='/controlGear/questionBank' component={ListQuestionBank} />
          <AdminRoute exact path='/controlGear/jobTitle' component={ListJobTitles} />
          <AdminRoute exact path='/controlGear/location' component={ListLocation} />
          <AdminRoute
            exact
            path={['/controlGear/createTest/:ID/edit', '/controlGear/createTest']}
            component={ListCreateTests}
          />
          <AdminRoute exact path='/controlGear/footerpages/:type' component={FooterPages} />

          <MainRoute exact path='/employer/profile' component={EmployerProfile} />
          <MainRoute exact path='/employer/dashboard' component={EmployerDashboard} />
          <MainRoute exact path='/employer' component={EmployerDashboard} />
          <MainRoute exact path='/employer/applicants' component={Applicants} />
          <MainRoute exact path='/employer/search' component={Search} />
          <MainRoute exact path='/employer/applicant/:applicantID' component={Applicant} />
          <MainRoute exact path='/employer/confirmation/:ID' component={OpportunityConfirmantion} />
          <MainRoute exact path='/employer/postOpportunity' component={Opportunity} />
          <MainRoute
            exact
            path={[
              '/employer/postOpportunity/:category',
              '/employer/postOpportunity/:category/:ID',
            ]}
            component={PostOpportunity}
          />
          <MainRoute path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
