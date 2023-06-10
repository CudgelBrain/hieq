import React, { useEffect, useState } from 'react';
import { startCase } from 'lodash';
import { useAppDispatch } from 'app/hooks';
import barImg from 'assets/images/bar.svg';
import { clearTokens, history } from 'utils';
import helpImg from 'assets/images/help.svg';
import hieqImg from 'assets/images/hieq.svg';
import logoutImg from 'assets/images/logout.svg';
import { setProfile } from 'features/user/userSlice';
import darkModeImg from 'assets/images/dark-mode.svg';
import lightModeImg from 'assets/images/light-mode.svg';
import notificationImg from 'assets/images/notifications.svg';
import searchImg from 'assets/images/employee/search.svg'
import { useLocation } from 'react-router-dom';
interface Props {
  themeMode: string;
  sidebarState: boolean;
  setThemeMode: (mode: string) => void;
  setSidebarState: (state: boolean) => void;
}

const Header: React.FC<Props> = ({ sidebarState, themeMode, setSidebarState, setThemeMode }) => {
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState<string>("");
  useEffect(() => {
    const type = localStorage.getItem("userType");
    setUserType(JSON.stringify(type));
  }, [])
  console.log(userType)
  const logout = () => {
    clearTokens();
    dispatch(setProfile({}));
    history.push('/login/password');
  };

  console.log(sidebarState, 'state')
  const location = useLocation()
  console.log(location.pathname === "/employee/searchForJobsAndInternships")

  useEffect(() =>{

  if(sidebarState ===true && location.pathname === "/employee/searchForJobsAndInternships"){
    console.log("working")
    setSidebarState(false)
  }
  }, [location.pathname])

  function handleSideBarToggle(){

    if(location.pathname === "/employee/searchForJobsAndInternships"){
      console.log('working')
      return
    }else 
    {
      setSidebarState(!sidebarState)
    }
  }

  return (
    <React.Fragment>
      <header className='header'>
        {userType.includes('Employer') ?
          (<div className='container-fluid'>
            <div className='row position-relative'>
              <div className='lt-sec'>
                <img src={hieqImg} alt='' width={"125px"} height={"56px"} />
                <div
                  className='nav-bar'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSideBarToggle()}
                >
                  <img src={barImg} height='20' alt='' />
                </div>
              </div>
              <div className='col-6 pt-3 pb-3 lt-sec-pd'>
                <button
                  type='submit'
                  className='btn btn-yl'
                  onClick={() => history.push('/employer/postOpportunity')}
                >
                  + Post Opportunity
                </button>
              </div>
              <div className='col-6 pt-3 pb-3 text-right'>
                <div className='tprt-link'>
                  <button
                    type='button'
                    className='text-link'
                    onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                  >
                    <img
                      src={themeMode === 'light' ? darkModeImg : lightModeImg}
                      height='18'
                      alt=''
                    />
                    <span>{`${startCase(themeMode)} Mode`}</span>
                  </button>
                  <button type='button' className='text-link'>
                    <img src={helpImg} height='18' alt='' />
                    <span>Help</span>
                  </button>
                  <button type='button' className='text-link'>
                    <img src={notificationImg} height='18' alt='' />
                    <span>Notifications</span>
                  </button>
                  <button type='button' className='text-link' onClick={() => logout()}>
                    <img src={logoutImg} height='18' alt='' />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>) :
          (<div className="container-fluid">
            <div className="row position-relative">
              <div className='lt-sec' >
                <img src={hieqImg} alt=''
                width={"89px"}
                height={"40px"}
                />
                <div
                  className='nav-bar'
                  style={{ cursor: 'pointer' }}
                  onClick={() =>handleSideBarToggle()}
                >
                  <img src={barImg} height='20' alt='' />
                </div>
              </div>
              <div className="col-6 pt-3 pb-3 lt-sec-pd">
                <button type="submit" className="btn btn-yl">
                  <img className="mr-3" src={searchImg} height="20"
                    alt="" /> Jobs, internships</button>
              </div>
              <div className="col-6 pt-3 pb-3 text-right">
                <div className="tprt-link">
                  <button type="button" className="text-link" title="Dark Mode" onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
                    <img
                      src={themeMode === 'light' ? darkModeImg : lightModeImg}
                      height="28" alt="" />
                  </button>
                  <button type="button"
                    className="text-link" title="Notifications">
                    <img src={notificationImg} height="28"
                      alt="" /></button>
                  <button type="button" className="text-link" title="Help"><img
                    src={helpImg} height="23" alt="" /></button>
                  <button type="button" className="text-link" onClick={() => logout()}
                    title="Logout"><img src={logoutImg} height="21" alt="" /></button> </div>
              </div>
            </div>
          </div>)}
      </header>
    </React.Fragment>
  );
};

export default Header;
