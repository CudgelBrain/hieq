import React from 'react';
import ListUser from 'features/user/ListUsers';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListUsers = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Users' page='Registered Users' />
      <ListUser />
    </React.Fragment>
  );
};

export default ListUsers;
