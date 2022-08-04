import React from 'react';
import ListItems from 'features/admin/college/ListItems';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListColleges = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='College' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListColleges;
