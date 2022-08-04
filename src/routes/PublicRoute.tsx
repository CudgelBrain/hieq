import React from 'react';
import { isEmpty, lowerCase } from 'lodash';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Header from 'components/Header/Public';
import { UserEnum } from 'features/auth/authSlice';
import { isAuthenticated } from 'utils';
import { useAppProfile } from 'app/hooks';

import 'assets/styles/public.css';

interface Props extends RouteProps {
  component: React.FC;
}

const PublicRoute: React.FC<Props> = (props) => {
  const { profile } = useAppProfile();

  if (isAuthenticated() && !isEmpty(profile)) {
    const { userType } = profile;
    const redirectTo =
      userType === UserEnum.Admin ? '/controlGear' : `/${lowerCase(userType)}/dashboard`;
    return <Redirect to={redirectTo} />;
  }
  return (
    <>
      <Header />
      <main>
        <Route {...props} />
      </main>
    </>
  );
};

export default PublicRoute;
