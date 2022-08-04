import React from 'react';
import ListCertification from 'features/admin/certification/ListCertification';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListCertifications = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Certification' />
      <ListCertification />
    </React.Fragment>
  );
};

export default ListCertifications;
