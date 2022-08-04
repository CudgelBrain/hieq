import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListDesignation from 'features/admin/designation/ListDesignation';

const ListDesignations = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Designation' />
      <ListDesignation />
    </React.Fragment>
  );
};

export default ListDesignations;
