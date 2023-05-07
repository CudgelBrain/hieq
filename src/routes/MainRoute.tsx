import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import Header from 'components/Header/Main';
import Sidebar from 'components/Navigation/Sidebar/Main';
import 'assets/styles/main.css';
import 'assets/styles/employee/style.css'

interface Props extends RouteProps {
  component: React.FC;
}

const parsePath = (path: string) => {
  switch (path) {
    case '/employer/applicants':
      return [false, true, false];
    case '/employer/search':
      return [false, false, true];
    case '/employer/applicant/:applicantID':
      return [false, false, false];
    default:
      return [true, false, false];
  }
};

const MainRoute: React.FC<Props> = (props) => {
  const { path } = props;
  const [mode, setMode] = React.useState<string>('light');
  const [defaultSidebarState, defaultFilterState, searchFilterState] = parsePath(path as string);
  const [sidebarState, setSidebarState] = React.useState(defaultSidebarState);
  const [closeSideBar, setCloseSideBar] = React.useState(true)
  const userType = localStorage.getItem('userType')
  console.log('UserType ', userType)
  React.useEffect(() => {
    if (defaultSidebarState || defaultFilterState || searchFilterState) {
      setCloseSideBar(true)
    } else {
      setCloseSideBar(false)
    }
  }, [defaultSidebarState, defaultFilterState, searchFilterState])
  console.log(path)
  if (isAuthenticated()) {
    return (
      <div className={`${userType ==="Employee" ? "dash-wrapper empl-panel" : "dash-wrapper emp-panel"} ${mode === 'dark' ? 'dark-mode' : ''}`}>
        <Header
          themeMode={mode}
          setThemeMode={setMode}
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
        />
        <main>
          <section className='main-wrapper'>
            <div className='container-fluid'>
              <div className='row position-relative'>
                <Sidebar isOpen={sidebarState} showFilter={defaultFilterState} searchFilter={searchFilterState} />
                <div className={(searchFilterState || defaultFilterState) || sidebarState ? 'col-md-12 lt-sec-pd' : 'col-md-12 rha'}>
                  <Route {...props} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  return <Redirect to='/login/password' />;
};

export default MainRoute;
