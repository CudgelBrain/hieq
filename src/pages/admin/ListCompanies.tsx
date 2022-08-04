import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListItems from 'features/admin/company/ListItems';

const ListCompanies = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Homepage' page='Company' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListCompanies;
