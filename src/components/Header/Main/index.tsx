import React from 'react';
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

interface Props {
  themeMode: string;
  sidebarState: boolean;
  setThemeMode: (mode: string) => void;
  setSidebarState: (state: boolean) => void;
}

const Header: React.FC<Props> = ({ sidebarState, themeMode, setSidebarState, setThemeMode }) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    clearTokens();
    dispatch(setProfile({}));
    history.push('/login/password');
  };

  return (
    <React.Fragment>
      <header className='header'>
        <div className='container-fluid'>
          <div className='row position-relative'>
            <div className='lt-sec'>
              <img src={hieqImg} height='40' alt='' />
              <div
                className='nav-bar'
                style={{ cursor: 'pointer' }}
                onClick={() => setSidebarState(!sidebarState)}
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
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
