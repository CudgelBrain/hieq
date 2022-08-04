import React from 'react';
import ListItems from 'features/admin/jobTitle/ListItems';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListJobTitles = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Sample' page='Job Title' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListJobTitles;
