import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListItems from 'features/admin/specialization/ListItems';

const ListSpecializations = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Specialization' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListSpecializations;
