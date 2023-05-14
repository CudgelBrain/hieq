import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated, getUserType } from 'utils';
import AdminSidebar from 'components/Navigation/Sidebar/Admin';
import 'assets/styles/admin.css';

interface Props extends RouteProps {
  component: React.FC;
}

const AdminRoute: React.FC<Props> = (props) => {
  if (isAuthenticated()) {
    if (getUserType() === "Admin") {
      return (
        <div className='root'>
          <div className='app'>
            <AdminSidebar />
            <main>
              <Route {...props} />
            </main>
          </div>
        </div>
      );
    } else {
      <Redirect to='/employer' />
    }
  }
  return <Redirect to='/login/password' />;
};

export default AdminRoute;
