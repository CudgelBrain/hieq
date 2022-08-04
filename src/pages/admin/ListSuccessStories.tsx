import React from 'react';
import ListSuccessStory from 'features/admin/successStory/ListSuccessStory';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListCompanyLogos = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Homepage' page='Sucess Stories' />
      <ListSuccessStory />
    </React.Fragment>
  );
};

export default ListCompanyLogos;
