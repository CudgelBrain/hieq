import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListItems from 'features/admin/instituteGroup/ListItems';

const ListInstituteGroups = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Institute Cohort / Group' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListInstituteGroups;
