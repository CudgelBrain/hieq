import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListSampleDescription from 'features/admin/sampleDescription/ListSampleDescription';

const ListBanners = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Sample' page='Sample Description' />
      <ListSampleDescription />
    </React.Fragment>
  );
};

export default ListBanners;
