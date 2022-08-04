import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListRoleInstitute from 'features/admin/roleInstitute/ListRoleInstitute';

const ListRoleInstitutes = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Role with the Institute' />
      <ListRoleInstitute />
    </React.Fragment>
  );
};

export default ListRoleInstitutes;
