import React from 'react';
import { NavLink } from 'react-router-dom';
import { history } from 'utils';
import { debounce, forEach, map, orderBy, isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector, useAppQuery, useAppProfile } from 'app/hooks';
import { RootState } from 'app/store';
import { EmployerProfileForm } from 'features/employer/profile/profileSlice';
import Filter from 'components/Filter';
import EmployerSearchFilter from 'components/Filter/employerSearch';
import viewIMg from 'assets/images/view.svg';
import editIMg from 'assets/images/edit.svg';
import homeImg from 'assets/images/home.svg';
import jobsImg from 'assets/images/jobs.svg';
import searchImg from 'assets/images/search.svg'
import helpImg from 'assets/images/help-dark.svg';
import messageImg from 'assets/images/message.svg';
import supportImg from 'assets/images/support.svg';
import plusFillImg from 'assets/images/plus-fill.svg';
import StarImg from 'assets/images/employee/star_11.svg'
import resumeImg from 'assets/images/pdf-ico.svg'
import passwordImg from 'assets/images/employee/ri_lock-password-line.svg'
import { useSelector } from 'react-redux';
import profilePic from 'assets/images/person-fill.svg'
import userProfileImg from 'assets/images/profile.png'

interface Props {
  isOpen: boolean;
  showFilter: boolean;
  searchFilter: boolean;
}

const Sidebar: React.FC<Props> = ({ isOpen = false, showFilter = false, searchFilter = false }) => {
  const dispatch = useAppDispatch();
  const userData = useSelector(state => state)
  const userType = localStorage.getItem('userType')
  const [viewer, setViewer] = React.useState<boolean>(true)
  const {
    profile: { name, email, phone },
  } = useAppProfile();
  let { status, profile } = useAppSelector((state: RootState) => state.employerProfile);
  let localProfile = localStorage.getItem("profile")

  const profileDetails: EmployerProfileForm = React.useMemo(
    () => ({
      fullName: !isEmpty(profile) && !isEmpty(profile.fullName) ? profile.fullName : name,
      companyName: !isEmpty(profile) && !isEmpty(profile.companyName) ? profile.companyName : '',
      phone: !isEmpty(profile) && !isEmpty(profile.phone) ? profile.phone : phone,
      email: !isEmpty(profile) && !isEmpty(profile.email) ? profile.email : email,
      roleInHiring: !isEmpty(profile) && !isEmpty(profile.roleInHiring) ? profile.roleInHiring : '',
      yearOfIncorporation:
        !isEmpty(profile) && !isEmpty(profile.yearOfIncorporation)
          ? profile.yearOfIncorporation
          : '',
      description: !isEmpty(profile) && !isEmpty(profile.description) ? profile.description : '',
      headOffice: !isEmpty(profile) && !isEmpty(profile.headOffice) ? profile.headOffice : '',
      branchOffices:
        !isEmpty(profile) && !isEmpty(profile.branchOffices) ? profile.branchOffices : [''],
      numberOfEmployees:
        !isEmpty(profile) && !isEmpty(profile.numberOfEmployees) ? profile.numberOfEmployees : '',
      companyType: !isEmpty(profile) && !isEmpty(profile.companyType) ? profile.companyType : '',
      industryType: !isEmpty(profile) && !isEmpty(profile.industryType) ? profile.industryType : '',
      documents:
        !isEmpty(profile) && !isEmpty(profile.documents)
          ? profile.documents
          : [{ name: '', file: '', toBeValidated: true }],
      profilePic:
        !isEmpty(profile) && !isEmpty(profile.profilePic)
          ? typeof profile.profilePic == "string" ? JSON.parse(profile.profilePic) : profile.profilePic
          : { name: '', file: '', url: "" },
      coverPic:
        !isEmpty(profile) && !isEmpty(profile.coverPic)
          ? typeof profile.coverPic == "string" ? JSON.parse(profile.coverPic) : profile.coverPic
          : { name: '', file: '', url: "" },
      socials:
        !isEmpty(profile) && !isEmpty(profile.socials) ? profile.socials : [{ name: '', url: '' }],
    }),
    [profile],
  );
  React.useEffect(() => { setViewer(!viewer) }, [searchFilter, isOpen])

  return (
    <div className={`d-flex align-items-start ${(searchFilter || showFilter) || !isOpen ? 'lt-wrapper' : ''}`}>
      <div className={`lt-sec ${(searchFilter || showFilter) || !isOpen ? 'lt-sec-short' : ''}`}>
        {(!searchFilter && !showFilter) && isOpen && (
          <>
          {userType ==='Employee' ?  <div style={{
              marginTop:'30px'
            }}>
              <div className="comp-img mt-5">
                <div className="profile-img">
                  <img src={userProfileImg} alt="" height={235} width={280} />
                  </div>
              </div>
              <div style={{
                textAlign:'center',
                paddingTop:'20px'
              }}>
                <div className="hd-16 fw-500 cl-dark">Samar Dhiman</div>
                <div className='cl-dark'>Web Designer</div>
              </div>
            </div> :
            <div className='comp-img mb-5'>
              <div className='cover-img'>
                <img src={profileDetails.coverPic.url} height={235} width={280} alt='' />
              </div>
              <img src={profilePic} className='profile-img' alt='' />
            </div>}
            <div className='text-center pt-4'>
              <div className='hd-16 fw-500 cl-dark mb-1'>{profileDetails.companyName}</div>
              {profileDetails.yearOfIncorporation ? <div>Since {profileDetails.yearOfIncorporation}</div> : ""}
            </div>
            <div className='text-center mb-3'>
              <button
                type='button'
                className={userType?.includes('Employer') ? 'btn btn-wt img-reflect' : 'btn btn-wt btn-md img-reflect'}
                onClick={() => {
                  if (userType?.includes('Employer')) {
                    history.push('/employer/profile')
                  } else {
                    history.push('/employee/profile')
                  }
                }
                }
              >
                <img className='mr-2' src={viewIMg} alt='' />
                View
              </button>
              <button
                type='button'
                className={userType?.includes('Employer') ? 'btn btn-yl ml-2' : 'btn btn-yl btn-md ml-2'}

                onClick={() => {
                  if (userType?.includes('Employer'))
                    history.push('/employer/profile?mode=edit')
                  else {
                    history.push('/employee/profile?mode=edit')
                  }
                }
                }
              >
                <img className='mr-2 ' src={editIMg} alt='' />
                Edit
              </button>
            </div>
          </>
        )}
        {userType?.includes('Employer') ? <div className='lt-navigation mb-5'>
          <ul className='nav pb-5'>
            <li>
              <NavLink className='img-reflect' to={'/employer/dashboard'}>
                <img className='mr-2' src={homeImg} alt='' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect selected' to={'/employer/postopportunity'}>
                <img className='mr-2' src={plusFillImg} alt='' />
                <span>Post Opportunity/Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/jobs'}>
                <img className='mr-2' src={jobsImg} alt='' />
                <span>Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/messaging'}>
                <img className='mr-2' src={messageImg} alt='' />
                <span>Messaging</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/supportDesk'}>
                <img className='mr-2' src={supportImg} alt='' />
                <span>Support Desk</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/help'}>
                <img className='mr-2' src={helpImg} alt='' />
                <span>Help</span>
              </NavLink>
            </li>
          </ul>
        </div> :
          <div className='employee-navigation mb-5'>
            <ul className='nav pb-5'>
              <li>
                <NavLink className='img-reflect' to={'/employee/dashboard'}>
                  <img className='mr-2' src={homeImg} alt='' />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect selected' to={'/employee/searchForJobsAndInternships'}>
                  <img className='mr-2' src={searchImg} alt='' />
                  <span>Search Jobs, internships</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employee/saved_oppotunities'}>
                  <img className='mr-2' src={StarImg} alt='' />
                  <span>Saved opportunites</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employer/messaging'}>
                  <img className='mr-2' src={messageImg} alt='' />
                  <span>My resumes</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employer/supportDesk'}>
                  <img className='mr-2' src={plusFillImg} alt='' />
                  <span>Assessment</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employer/supportDesk'}>
                  <img className='mr-2' src={supportImg} alt='' />
                  <span>Support Desk</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employer/supportDesk'}>
                  <img className='mr-2' src={passwordImg} alt='' />
                  <span>Change Password</span>
                </NavLink>
              </li>
              <li>
                <NavLink className='img-reflect' to={'/employer/help'}>
                  <img className='mr-2' src={helpImg} alt='' />
                  <span>Help</span>
                </NavLink>
              </li>
            </ul>
          </div>
        }
        <div className='ft-rel'>
          <div className='ft-fixed hd-14 cl-dark'>
            <div className='fw-500 mb-1'>Need Help ?</div>
            <div>+91 9821948334, +91 9821948335</div>
          </div>
        </div>
      </div>
      {showFilter && <Filter />}
      {searchFilter && <EmployerSearchFilter />}
    </div>
  );
};

export default Sidebar;

