import React from 'react';
import ListIndustry from 'features/admin/industry/ListIndustry';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListCertifications = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Certification' />
      <ListIndustry />
    </React.Fragment>
  );
};

export default ListCertifications;
