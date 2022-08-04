import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListCreateTests from 'features/admin/createTest/ListCreateTests';

const ListCreateTest = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Asssessments' page='Create Test' />
      <ListCreateTests />
    </React.Fragment>
  );
};

export default ListCreateTest;
