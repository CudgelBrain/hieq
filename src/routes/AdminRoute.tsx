import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import AdminSidebar from 'components/Navigation/Sidebar/Admin';
import 'assets/styles/admin.css';

interface Props extends RouteProps {
  component: React.FC;
}

const AdminRoute: React.FC<Props> = (props) => {
  if (isAuthenticated()) {
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
  }
  return <Redirect to='/login/password' />;
};

export default AdminRoute;
