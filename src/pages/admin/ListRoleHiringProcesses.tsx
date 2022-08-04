import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListRoleHiringProcess from 'features/admin/roleHiringProcess/ListRoleHiringProcess';

const ListRoleHiringProcesses = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Role in the Hiring Process' />
      <ListRoleHiringProcess />
    </React.Fragment>
  );
};

export default ListRoleHiringProcesses;
