import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListItems from 'features/admin/Institute/ListItems';

const ListInstitutes = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Certification Institute' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListInstitutes;
