import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import Header from 'components/Header/Main';
import Sidebar from 'components/Navigation/Sidebar/Main';
import 'assets/styles/main.css';

interface Props extends RouteProps {
  component: React.FC;
}

const parsePath = (path: string) => {
  switch (path) {
    case '/employer/applicants':
      return [false, true];
    case '/employer/applicant/:applicantID':
      return [false, false];
    default:
      return [true, false];
  }
};

const MainRoute: React.FC<Props> = (props) => {
  const { path } = props;
  const [mode, setMode] = React.useState<string>('light');
  const [defaultSidebarState, defaultFilterState] = parsePath(path as string);
  const [sidebarState, setSidebarState] = React.useState(defaultSidebarState);

  if (isAuthenticated()) {
    return (
      <div className={`dash-wrapper emp-panel ${mode === 'dark' ? 'dark-mode' : ''}`}>
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
                <Sidebar isOpen={sidebarState} showFilter={defaultFilterState} />
                <Route {...props} />
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
