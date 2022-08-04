import React from 'react';
import ListItems from 'features/admin/domain/ListItems';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListDomains = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Homepage' page='Multiple Domain' />
      <ListItems />
    </React.Fragment>
  );
};

export default ListDomains;
