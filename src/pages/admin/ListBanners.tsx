import React from 'react';
import ListBanner from 'features/admin/banner/ListBanner';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListBanners = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Sample' page='Banner' />
      <ListBanner />
    </React.Fragment>
  );
};

export default ListBanners;
